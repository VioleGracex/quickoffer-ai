import uuid
from fastapi import APIRouter, File, UploadFile, Form, HTTPException, BackgroundTasks
from fastapi.responses import JSONResponse, PlainTextResponse, StreamingResponse
import filetype
from app.services.ocr import read_pdf, read_excel, read_image
import fitz  # PyMuPDF
import io
import logging
from docx import Document
import threading
from queue import Queue

router = APIRouter()

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Dictionary to store ongoing tasks
tasks = {}

# Queue to store OCR tasks
max_queue_size = 5
ocr_queue = Queue(maxsize=max_queue_size)

# Semaphore to limit the number of concurrent OCR tasks
max_concurrent_tasks = 2
semaphore = threading.Semaphore(max_concurrent_tasks)

def read_image_task(file_contents: bytes, filename: str, ocr_service: str, task_id: str, cancel_event: threading.Event):
    try:
        print(f"Task {task_id} started with OCR service {ocr_service}")
        kind = filetype.guess(file_contents)
        print(f"File type detected: {kind}")

        if not kind:
            tasks[task_id]['status'] = 'failed'
            tasks[task_id]['error'] = 'Unsupported file type'
            print(f"Task {task_id} failed: Unsupported file type")
            return

        if cancel_event.is_set():
            tasks[task_id]['status'] = 'cancelled'
            print(f"Task {task_id} cancelled before processing")
            return

        if kind.mime.startswith('image/'):
            text = read_image(file_contents, ocr_service)
            print(f"start read image")
            if cancel_event.is_set():
                tasks[task_id]['status'] = 'cancelled'
                print(f"Task {task_id} cancelled during processing")
                return
            tasks[task_id]['result'] = text
            tasks[task_id]['status'] = 'completed'
            print(f"Task {task_id} completed successfully")
        else:
            tasks[task_id]['status'] = 'failed'
            tasks[task_id]['error'] = 'Unsupported file type for OCR'
            print(f"Task {task_id} failed: Unsupported file type for OCR")
    except Exception as e:
        tasks[task_id]['status'] = 'failed'
        tasks[task_id]['error'] = str(e)
        print(f"Task {task_id} failed with exception: {e}")
    finally:
        semaphore.release()  # Release the semaphore after task completion

def ocr_worker():
    while True:
        task = ocr_queue.get()
        if task is None:
            break
        semaphore.acquire()
        read_image_task(*task)
        ocr_queue.task_done()

# Start worker thread
worker_thread = threading.Thread(target=ocr_worker)
worker_thread.daemon = True
worker_thread.start()

@router.post("/upload/")
async def upload_file(file: UploadFile = File(...)):
    kind = filetype.guess(file.file)
    file.file.seek(0)  # Reset file pointer after detection

    if not kind:
        raise HTTPException(status_code=400, detail="Unsupported file type")

    try:
        if kind.mime == 'application/pdf':
            text = read_pdf(file)
        elif kind.mime == 'application/vnd.ms-excel' or kind.mime == 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
            text = read_excel(file)
        elif kind.mime.startswith('image/'):
            text = read_image(file, 'EasyOCR')
        else:
            raise HTTPException(status_code=400, detail="Unsupported file type")

        return JSONResponse(content={"text": text})
    except Exception as e:
        logger.error(f"Error processing file: {e}")
        raise HTTPException(status_code=500, detail=f"Internal server error: {e}")

@router.post("/upload-ocr/")
async def upload_ocr_file(
    background_tasks: BackgroundTasks,
    file: UploadFile = File(...),
    ocr_service: str = Form(...),
    output_format: str = Form(...),
):
    # Check if the queue is full
    if ocr_queue.full():
        raise HTTPException(status_code=503, detail="Сервер перегружен, попробуйте позже")

    # Generate a unique task ID
    task_id = str(uuid.uuid4())  # Ensures each request is treated as a new OCR order
    cancel_event = threading.Event()
    tasks[task_id] = {'status': 'processing', 'result': None, 'error': None, 'cancel_event': cancel_event}

    # Read file content into memory
    file_contents = await file.read()
    file.file.seek(0)

    # Add task to queue
    ocr_queue.put((file_contents, file.filename, ocr_service, task_id, cancel_event))

    return JSONResponse(content={"status": "queued", "task_id": task_id})

@router.get("/ocr-status/")
async def ocr_status(task_id: str):
    print(f"Checking status for task {task_id}")
    if task_id not in tasks:
        raise HTTPException(status_code=404, detail="Task not found")
    
    return JSONResponse(content=tasks[task_id])

@router.post("/cancel-ocr/")
async def cancel_ocr(task_id: str):
    print(f"Cancelling task {task_id}")
    if task_id not in tasks:
        raise HTTPException(status_code=404, detail="Task not found")

    cancel_event = tasks[task_id]['cancel_event']
    cancel_event.set()
    tasks[task_id]['status'] = 'cancelled'
    return JSONResponse(content={"status": "cancelled", "task_id": task_id})

@router.post("/convert/")
async def convert_text(
    text: str = Form(...),
    output_format: str = Form(...),
):
    try:
        if output_format == '.pdf':
            pdf_bytes = io.BytesIO()
            doc = fitz.open()
            page = doc.new_page()
            page.insert_text((100, 100), text)
            doc.save(pdf_bytes)
            doc.close()
            pdf_bytes.seek(0)
            if pdf_bytes.getbuffer().nbytes == 0:
                logger.error("Generated PDF is empty")
                raise HTTPException(status_code=500, detail="Generated PDF is empty")
            return StreamingResponse(pdf_bytes, media_type="application/pdf", headers={"Content-Disposition": "attachment; filename=ocr_result.pdf"})
        elif output_format == '.docx':
            doc = Document()
            doc.add_paragraph(text)
            file_stream = io.BytesIO()
            doc.save(file_stream)
            file_stream.seek(0)
            return StreamingResponse(file_stream, media_type="application/vnd.openxmlformats-officedocument.wordprocessingml.document", headers={"Content-Disposition": "attachment; filename=ocr_result.docx"})
        else:
            raise HTTPException(status_code=400, detail="Unsupported output format")
    except Exception as e:
        logger.error(f"Error converting text: {e}")
        raise HTTPException(status_code=500, detail=f"Internal server error: {e}")

@router.get("/get-ocr-json/")
async def get_ocr_json(file: UploadFile = File(...)):
    try:
        if file.content_type.startswith('image/'):
            text = read_image(file, 'EasyOCR')
            return JSONResponse(content={"text": text})
        else:
            raise HTTPException(status_code=400, detail="Unsupported file type for OCR")
    except Exception as e:
        logger.error(f"Error reading OCR JSON: {e}")
        raise HTTPException(status_code=500, detail=f"Internal server error: {e}")

@router.get("/get-ocr-text/")
async def get_ocr_text(file: UploadFile = File(...)):
    try:
        if file.content_type.startswith('image/'):
            text = read_image(file, 'EasyOCR')
            return PlainTextResponse(content=text)
        else:
            raise HTTPException(status_code=400, detail="Unsupported file type for OCR")
    except Exception as e:
        logger.error(f"Error reading OCR text: {e}")
        raise HTTPException(status_code=500, detail=f"Internal server error: {e}")

@router.get("/get-ocr-pdf/")
async def get_ocr_pdf(file: UploadFile = File(...)):
    try:
        if file.content_type.startswith('image/'):
            text = read_image(file, 'EasyOCR')
            pdf_bytes = io.BytesIO()
            doc = fitz.open()
            page = doc.new_page()
            page.insert_text((100, 100), text)
            doc.save(pdf_bytes)
            doc.close()
            pdf_bytes.seek(0)
            if pdf_bytes.getbuffer().nbytes == 0:
                logger.error("Generated PDF is empty")
                raise HTTPException(status_code=500, detail="Generated PDF is empty")
            return StreamingResponse(pdf_bytes, media_type="application/pdf", headers={"Content-Disposition": "attachment; filename=ocr_result.pdf"})
        else:
            raise HTTPException(status_code=400, detail="Unsupported file type for OCR")
    except Exception as e:
        logger.error(f"Error reading OCR PDF: {e}")
        raise HTTPException(status_code=500, detail=f"Internal server error: {e}")