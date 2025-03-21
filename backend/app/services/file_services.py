""" backend\app\services\file_services.py """
import aiofiles
import tempfile
import os
import pandas as pd
import PyPDF2
import docx
import logging

logger = logging.getLogger(__name__)

async def save_file_to_tmp(file) -> str:
    """
    Save the uploaded file to a temporary file and return its path.
    """
    suffix = os.path.splitext(file.filename)[1]  # Get the file extension
    temp_file = tempfile.NamedTemporaryFile(delete=False, suffix=suffix)
    file_path = temp_file.name  # Get the full path of the temporary file
    
    # Save file content
    async with aiofiles.open(file_path, 'wb') as out_file:
        content = await file.read()
        await out_file.write(content)
    
    # Log the file path and size
    file_size = os.stat(file_path).st_size
    logger.info(f"File saved to {file_path}, size: {file_size} bytes")
    
    return file_path

async def read_file_with_fallback(file_path: str, encodings: list) -> str:
    """
    Attempt to read a file with a list of encodings, falling back if necessary.
    """
    for encoding in encodings:
        try:
            async with aiofiles.open(file_path, 'r', encoding=encoding) as file:
                return await file.read()
        except UnicodeDecodeError as e:
            logger.warning(f"Failed to decode with encoding {encoding}: {e}")
            continue
    return ""

async def read_csv(file_path: str) -> str:
    """
    Read a CSV file and return its contents as a string.
    """
    file_size = os.stat(file_path).st_size
    logger.info(f"CSV file size: {file_size} bytes")
    
    try:
        if file_size == 0:
            logger.warning("CSV file is empty")
            return ""
        df = pd.read_csv(file_path, encoding='utf-8')
    except UnicodeDecodeError:
        try:
            df = pd.read_csv(file_path, encoding='cp1251')
        except pd.errors.EmptyDataError:
            logger.warning("No columns to parse from file")
            return ""
    except pd.errors.EmptyDataError:
        logger.warning("No columns to parse from file")
        return ""
    return df.to_string(index=False)

async def read_pdf(file_path: str) -> str:
    """
    Read a PDF file and return its extracted text.
    """
    try:
        with open(file_path, 'rb') as file:
            reader = PyPDF2.PdfReader(file)
            text = ""
            for page in reader.pages:
                text += page.extract_text()
        return text
    except Exception as e:
        logger.warning(f"Error reading PDF file: {str(e)}")
        return ""

async def read_docx(file_path: str) -> str:
    """
    Read a DOCX file and return its extracted text.
    """
    try:
        doc = docx.Document(file_path)
        text = ""
        for para in doc.paragraphs:
            text += para.text + "\n"
        return text
    except Exception as e:
        logger.warning(f"Error reading DOCX file: {str(e)}")
        return ""