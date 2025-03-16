from fastapi import APIRouter, UploadFile, File, Form, HTTPException, Request
from fastapi.responses import JSONResponse
from pydantic import BaseModel
import aiofiles
import json
import tempfile
import os
import pandas as pd
from app.services.ai import generate_proposal_text
from app.services.pdf import create_pdf
from app.services.email import send_email
from app.services.ocr import read_image, read_pdf, read_excel
import logging

router = APIRouter()

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class EmailRequest(BaseModel):
    email: str
    pdf_link: str

async def save_file_to_tmp(file: UploadFile) -> str:
    """
    Save the uploaded file to a temporary file and return its path.
    """
    temp_file = tempfile.NamedTemporaryFile(delete=False, suffix=".docx")
    file_path = temp_file.name  # Get the full path of the temporary file
    
    # Save file content
    async with aiofiles.open(file_path, 'wb') as out_file:
        content = await file.read()
        await out_file.write(content)

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
    raise HTTPException(status_code=400, detail=f"Unable to decode file with provided encodings: {encodings}")

async def read_csv(file: UploadFile) -> str:
    """
    Read a CSV file and return its contents as a string.
    """
    file_path = await save_file_to_tmp(file)
    df = pd.read_csv(file_path)
    return df.to_string()

@router.post("/generate")
async def generate_proposal(
    request: Request,
    templateFile: UploadFile = File(...),
    productDataFile: UploadFile = File(...),
    templateFileType: str = Form(...),
    productDataFileType: str = Form(...),
    model: str = Form(...),
    api: str = Form(...)
):
    try:
        # Extract all form data dynamically
        form_data = await request.form()
        form_dict = {key: form_data[key] for key in form_data}

        # Parse JSON fields if they exist
        client_info = json.loads(form_dict.get("clientInfo", "{}"))
        selected_products = json.loads(form_dict.get("selectedProducts", "[]"))

    except json.JSONDecodeError:
        raise HTTPException(status_code=400, detail="Invalid JSON format")

    # Save uploaded files
    template_file_path = await save_file_to_tmp(templateFile)
    product_data_file_path = await save_file_to_tmp(productDataFile)

    # Process uploaded files (reading the file content based on type)
    if templateFileType.startswith('image/'):
        template_text = await read_image(templateFile, 'EasyOCR', request_id="templateFile_request")
    elif templateFileType == 'application/pdf':
        template_text = await read_pdf(templateFile)
    elif templateFileType in ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel']:
        template_text = await read_excel(templateFile)
    else:
        template_text = await read_file_with_fallback(template_file_path, ['utf-8', 'windows-1251'])

    if productDataFileType.startswith('image/'):
        product_data_text = await read_image(productDataFile, 'EasyOCR', request_id="productDataFile_request")
    elif productDataFileType == 'application/pdf':
        product_data_text = await read_pdf(productDataFile)
    elif productDataFileType in ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel']:
        product_data_text = await read_excel(productDataFile)
    elif productDataFileType == 'text/csv':
        product_data_text = await read_csv(productDataFile)
    else:
        product_data_text = await read_file_with_fallback(product_data_file_path, ['utf-8', 'windows-1251'])

    # Generate proposal text
    generated_text = await generate_proposal_text(client_info, template_text, product_data_text, selected_products, model, api)

    # Log all extracted form data
    logger.info("📌 Extracted Form Data: %s", form_dict)

    return JSONResponse(content={"generatedText": generated_text})

@router.post("/save-pdf")
async def save_pdf(templateFile: UploadFile = File(...), generatedText: str = Form(...)):
    """
    Save the template file and generate the PDF.
    """
    template_path = await save_file_to_tmp(templateFile)
    pdf_path = await create_pdf(template_path, generatedText)
    return JSONResponse(content={"pdfLink": pdf_path})

@router.post("/send-email")
async def send_email_route(request: EmailRequest):
    """
    Send an email with the generated PDF link.
    """
    try:
        await send_email(request.email, request.pdf_link)
        return JSONResponse(content={"message": "Email sent successfully!"})
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to send email: {str(e)}")