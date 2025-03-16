from fastapi import APIRouter, File, UploadFile, Form, HTTPException
from fastapi.responses import JSONResponse
from app.services.task_manager import add_task, remove_task, is_task_cancelled, cancel_task
import filetype
from app.services.ocr import read_image
import fitz  # PyMuPDF
import io
import logging
from docx import Document
from collections import deque

router = APIRouter()

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Keep track of ongoing OCR tasks and a queue for incoming requests
ocr_queue = deque()
QUEUE_LIMIT = 5  # Set a limit for the number of concurrent OCR requests

@router.post("/upload-ocr/")
async def upload_ocr_file(
    file: UploadFile = File(...),
    ocr_service: str = Form(...),
    output_format: str = Form(...),
    request_id: str = Form(...)
):
    print(f"Received file: {file.filename}, OCR service: {ocr_service}, Output format: {output_format}, Request ID: {request_id}")

    # Check if the queue is full
    if len(ocr_queue) >= QUEUE_LIMIT:
        return JSONResponse(content={"status": "busy", "message": "Сервер занят. Пожалуйста, попробуйте позже.", "request_id": request_id})

    # Add the request to the queue and mark it as ongoing
    ocr_queue.append(request_id)
    add_task(request_id)

    try:
        kind = filetype.guess(file.file)
        file.file.seek(0)  # Reset file pointer after detection

        if not kind:
            raise HTTPException(status_code=400, detail="Unsupported file type")

        print(f"Detected file type: {kind.mime}")

        if kind.mime.startswith('image/'):
            text = read_image(file, ocr_service, request_id)  # Pass the request_id to track cancellation
            if is_task_cancelled(request_id):
                return JSONResponse(content={"status": "cancelled", "message": "This OCR request has been cancelled", "request_id": request_id})
            print(f"OCR result: {text}")
        else:
            raise HTTPException(status_code=400, detail="Unsupported file type for OCR")

        result = {"status": "success", "text": text, "request_id": request_id}

        if output_format == '.txt':
            print("Returning plain text response")
            return JSONResponse(content=result)
        elif output_format == '.pdf':
            print("Returning PDF response")
            pdf_bytes = io.BytesIO()
            doc = fitz.open()
            page = doc.new_page()
            page.insert_text((100, 100), text)
            doc.save(pdf_bytes)
            doc.close()
            pdf_bytes.seek(0)
            return JSONResponse(content={"status": "success", "message": "PDF created", "request_id": request_id})
        elif output_format == '.docx':
            print("Returning DOCX response")
            doc = Document()
            doc.add_paragraph(text)
            file_stream = io.BytesIO()
            doc.save(file_stream)
            file_stream.seek(0)
            return JSONResponse(content={"status": "success", "message": "DOCX created", "request_id": request_id})
        else:
            raise HTTPException(status_code=400, detail="Unsupported output format")

    except Exception as e:
        print(f"Error processing file: {e}")
        return JSONResponse(status_code=500, content={"status": "error", "message": f"Internal server error: {e}", "request_id": request_id})
    finally:
        # Remove the request from the queue and clean up ongoing task
        if request_id in ocr_queue:
            ocr_queue.remove(request_id)
        remove_task(request_id)

@router.post("/cancel-ocr/")
async def cancel_ocr_request(request_id: str = Form(...)):
    print(f"Cancesling OCR request with ID: {request_id}")
    if is_task_cancelled(request_id):  # Check if the task is already cancelled
        return JSONResponse(content={"status": "error", "message": "OCR request not found or already cancelled", "request_id": request_id})
    
    if cancel_task(request_id):  # Attempt to cancel the task
        return JSONResponse(content={"status": "success", "message": "OCR request cancelled", "request_id": request_id})
    else:
        return JSONResponse(content={"status": "error", "message": "OCR request not found", "request_id": request_id})