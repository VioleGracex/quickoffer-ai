import easyocr
import fitz  # PyMuPDF
import pandas as pd
from fastapi import UploadFile, HTTPException
import logging
from app.services.task_manager import is_task_cancelled

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Initialize EasyOCR reader
easyocr_reader = easyocr.Reader(['en', 'ru'], gpu=True)

def read_pdf(file: UploadFile):
    try:
        doc = fitz.open(stream=file.file.read(), filetype="pdf")
        text = ""
        for page in doc:
            text += page.get_text("text")
        return text
    except Exception as e:
        logger.error(f"Error reading PDF: {e}")
        raise HTTPException(status_code=500, detail=f"Error reading PDF: {e}")

def read_excel(file: UploadFile):
    try:
        df = pd.read_excel(file.file)
        text = df.to_string()
        return text
    except Exception as e:
        logger.error(f"Error reading Excel: {e}")
        raise HTTPException(status_code=500, detail=f"Error reading Excel: {e}")

def read_image_with_easyocr(file: UploadFile, request_id: str):
    try:
        image_bytes = file.file.read()  # Read file as bytes

        # Check if task was cancelled before starting OCR
        if is_task_cancelled(request_id):
            return "OCR request was cancelled"

        result = easyocr_reader.readtext(image_bytes)

        text_list = []
        for _, text, _ in result:
            # Periodically check for cancellation during processing
            if is_task_cancelled(request_id):
                return "OCR request was cancelled"
            text_list.append(text)

        return "\n".join(text_list)

    except Exception as e:
        logger.error(f"Error reading image with EasyOCR: {e}")
        raise HTTPException(status_code=500, detail=f"Error reading image with EasyOCR: {e}")

def read_image(file: UploadFile, ocr_service: str, request_id: str):
    if is_task_cancelled(request_id):
        return "OCR request was cancelled"
    print(f"Reading image with {ocr_service}")
    if ocr_service == 'EasyOCR':
        return read_image_with_easyocr(file, request_id)
    else:
        raise HTTPException(status_code=400, detail=f"OCR service {ocr_service} not supported.")