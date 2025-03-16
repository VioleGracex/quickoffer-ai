from fastapi import APIRouter, File, UploadFile, Form, HTTPException, BackgroundTasks
from fastapi.responses import JSONResponse, PlainTextResponse, StreamingResponse
import filetype
from uuid import uuid4
from app.services.ocr import read_pdf, read_excel, read_image
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
ongoing_tasks = {}
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

    # Add the request to the queue
    ocr_queue.append(request_id)
    ongoing_tasks[request_id] = {"cancelled": False}

    try:
        kind = filetype.guess(file.file)
        file.file.seek(0)  # Reset file pointer after detection

        if not kind:
            raise HTTPException(status_code=400, detail="Unsupported file type")

        print(f"Detected file type: {kind.mime}")

        if kind.mime.startswith('image/'):
            text = read_image(file, ocr_service)
            if ongoing_tasks[request_id].get('cancelled'):
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
        # Remove the request from the queue
        ocr_queue.remove(request_id)
        ongoing_tasks.pop(request_id, None)


@router.post("/cancel-ocr/")
async def cancel_ocr_request(request_id: str = Form(...)):
    if request_id in ongoing_tasks:
        ongoing_tasks[request_id]['cancelled'] = True
        return JSONResponse(content={"status": "success", "message": "OCR request cancelled"})
    else:
        return JSONResponse(content={"status": "error", "message": "OCR request not found"})