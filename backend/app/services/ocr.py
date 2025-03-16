import easyocr
import asyncio
import logging
from fastapi import UploadFile, HTTPException
from app.services.task_manager import is_task_cancelled

# Initialize EasyOCR reader
easyocr_reader = easyocr.Reader(['en', 'ru'], gpu=True)

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

async def ocr_task(file: UploadFile, request_id: str, result: list):
    try:
        image_bytes = file.file.read()  # Read file as bytes
        
        # Check if task was cancelled before starting OCR
        if is_task_cancelled(request_id):
            result.append("Запрос OCR был отменен")
            logger.info(f"OCR task for request ID {request_id} was cancelled before starting.")
            return

        # Perform OCR and check cancellation periodically
        result_data = easyocr_reader.readtext(image_bytes, detail=0, paragraph=True)
        
        # Check for task cancellation during the OCR processing loop
        for text in result_data:
            if is_task_cancelled(request_id):
                result.append("Запрос OCR был отменен")
                logger.info(f"OCR task for request ID {request_id} was cancelled during processing.")
                return
            result.append(text)

        # If the task reaches this point, it's too late to cancel
        logger.info(f"OCR task for request ID {request_id} completed. Too late to cancel.")

    except Exception as e:
        logger.error(f"Error reading image with EasyOCR: {e}")
        result.append(f"Error reading image with EasyOCR: {e}")

async def read_image_with_easyocr(file: UploadFile, request_id: str):
    result = []
    
    # Start the OCR process in an asyncio task
    await ocr_task(file, request_id, result)
    
    # Return the result collected by the task
    return result

def read_pdf(file: UploadFile):
    try:
        import fitz  # PyMuPDF
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
        import pandas as pd
        df = pd.read_excel(file.file)
        text = df.to_string()
        return text
    except Exception as e:
        logger.error(f"Error reading Excel: {e}")
        raise HTTPException(status_code=500, detail=f"Error reading Excel: {e}")

async def read_image(file: UploadFile, ocr_service: str, request_id: str):
    if is_task_cancelled(request_id):
        return "OCR request was cancelled"
    logger.info(f"Reading image with {ocr_service}")
    if ocr_service == 'EasyOCR':
        return await read_image_with_easyocr(file, request_id)
    else:
        raise HTTPException(status_code=400, detail=f"OCR service {ocr_service} not supported.")