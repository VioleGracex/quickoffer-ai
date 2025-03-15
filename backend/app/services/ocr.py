import easyocr
import fitz  # PyMuPDF
import pandas as pd
from PIL import Image

from fastapi import UploadFile, HTTPException

# Initialize EasyOCR reader
reader = easyocr.Reader(['en', 'ru'], gpu=False)

def read_pdf(file: UploadFile):
    try:
        doc = fitz.open(stream=file.file.read(), filetype="pdf")
        text = ""
        for page in doc:
            text += page.get_text()
        return text
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error reading PDF: {e}")

def read_excel(file: UploadFile):
    try:
        df = pd.read_excel(file.file)
        text = df.to_string()
        return text
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error reading Excel: {e}")

def read_image(file: UploadFile):
    try:
        image = Image.open(file.file)
        result = reader.readtext(image)
        text = " ".join([text for _, text, _ in result])
        return text
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error reading image: {e}")