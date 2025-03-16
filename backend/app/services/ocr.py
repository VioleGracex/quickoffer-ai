import easyocr
import fitz  # PyMuPDF
import pandas as pd
from PIL import Image
from fastapi import UploadFile, HTTPException
import logging
import numpy as np

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
            text += page.get_text()
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

def read_image_with_easyocr(file_contents: bytes):
    try:
        result = easyocr_reader.readtext(file_contents)
        text_blocks = sorted(result, key=lambda x: x[0][0][1])  # Sort by the y-coordinate of the bounding box
        text = "\n".join([text for _, text, _ in text_blocks])
        return text
    except Exception as e:
        logger.error(f"Error reading image with EasyOCR: {e}")
        raise HTTPException(status_code=500, detail=f"Error reading image with EasyOCR: {e}")

def read_image(file_contents: bytes, ocr_service: str):
    if ocr_service == 'EasyOCR':
        return read_image_with_easyocr(file_contents)
    else:
        raise HTTPException(status_code=400, detail=f"OCR service {ocr_service} not supported.")