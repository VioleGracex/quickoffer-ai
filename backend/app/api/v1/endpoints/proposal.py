from fastapi import APIRouter, UploadFile, File, Form, HTTPException, Request
from fastapi.responses import JSONResponse
from pydantic import BaseModel
import json
from app.services.ai import generate_proposal_text
from app.services.pdf import create_pdf
from app.services.email import send_email
from app.services.ocr import read_image, read_pdf, read_excel
from app.services.file_services import save_file_to_tmp, read_file_with_fallback, read_csv, read_docx
import logging
import os

router = APIRouter()

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class EmailRequest(BaseModel):
    email: str
    pdf_link: str

def translate_error_message(error_message: str) -> str:
    """
    Translate common error messages to user-friendly Russian messages.
    """
    if "Insufficient Balance" in error_message:
        return "Недостаточно средств на счету."
    elif "invalid_request_error" in error_message:
        return "Ошибка в запросе."
    else:
        return "Произошла ошибка при обработке вашего запроса."

@router.post("/generate")
async def generate_proposal(
    request: Request,
    templateFile: UploadFile = File(None),
    productDataFile: UploadFile = File(None),
    templateFileType: str = Form("application/pdf"),
    productDataFileType: str = Form("application/pdf"),
    model: str = Form("deepseek-chat"),
    api: str = Form("deepseek"),
    additionalPrompt: str = Form(""),
    requestId: str = Form(""),
    selectedProducts: str = Form("")
):
    try:
        # Extract all form data dynamically
        form_data = await request.form()
        form_dict = {key: form_data[key] for key in form_data}
        additional_prompt = form_dict.get("additionalPrompt", "")
        selected_products = form_dict.get("selectedProducts", "")

        # Log the extracted form data
        logger.info("📌 Extracted Form Data: %s", form_dict)

    except json.JSONDecodeError:
        raise HTTPException(status_code=400, detail="Неверный формат JSON")

    template_text = ""
    product_data_text = ""

    if templateFile:
        # Save uploaded template file
        template_file_path = await save_file_to_tmp(templateFile)

        # Ensure the temporary file path is valid
        if not os.path.isfile(template_file_path):
            raise HTTPException(status_code=400, detail="Template file upload failed.")

        # Process uploaded template file (reading the file content based on type)
        if templateFileType.startswith('image/'):
            template_text = await read_image(template_file_path, 'EasyOCR', request_id=f"{requestId}_templateFile")
        elif templateFileType == 'application/pdf':
            template_text = await read_pdf(template_file_path)
        elif templateFileType in ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel']:
            template_text = await read_excel(template_file_path)
        elif templateFileType == 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
            template_text = await read_docx(template_file_path)
        else:
            template_text = await read_file_with_fallback(template_file_path, ['utf-8', 'windows-1251'])

    if productDataFile:
        # Save uploaded product data file
        product_data_file_path = await save_file_to_tmp(productDataFile)

        # Ensure the temporary file path is valid
        if not os.path.isfile(product_data_file_path):
            raise HTTPException(status_code=400, detail="Product data file upload failed.")

        # Process uploaded product data file (reading the file content based on type)
        if productDataFileType.startswith('image/'):
            product_data_text = await read_image(product_data_file_path, 'EasyOCR', request_id=f"{requestId}_productDataFile")
        elif productDataFileType == 'application/pdf':
            product_data_text = await read_pdf(product_data_file_path)
        elif productDataFileType in ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel']:
            product_data_text = await read_excel(product_data_file_path)
        elif productDataFileType == 'text/csv':
            product_data_text = await read_csv(product_data_file_path)
        elif productDataFileType == 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
            product_data_text = await read_docx(product_data_file_path)
        else:
            product_data_text = await read_file_with_fallback(product_data_file_path, ['utf-8', 'windows-1251'])

    try:
        # Generate proposal text
        generated_text = await generate_proposal_text(
            additional_prompt, template_text, product_data_text, selected_products.split(',') if selected_products else [], model, api
        )
    except Exception as e:
        logger.error(f"Real error: {str(e)}")
        translated_error = translate_error_message(str(e))
        raise HTTPException(status_code=500, detail=f"Ошибка при генерации текста предложения: {translated_error}")

    return JSONResponse(content={"generatedText": generated_text})

@router.post("/save-pdf")
async def save_pdf(templateFile: UploadFile = File(None), generatedText: str = Form(...)):
    """
    Save the template file and generate the PDF.
    """
    try:
        template_path = None
        if templateFile:
            template_path = await save_file_to_tmp(templateFile)
            if not os.path.isfile(template_path):
                raise HTTPException(status_code=400, detail="Template file upload failed.")

        pdf_path = await create_pdf(template_path, generatedText)
        return JSONResponse(content={"pdfLink": pdf_path})
    except Exception as e:
        logger.error(f"Real error: {str(e)}")
        translated_error = translate_error_message(str(e))
        raise HTTPException(status_code=500, detail=f"Ошибка при сохранении PDF: {translated_error}")

@router.post("/send-email")
async def send_email_route(request: EmailRequest):
    """
    Send an email with the generated PDF link.
    """
    try:
        await send_email(request.email, request.pdf_link)
        return JSONResponse(content={"message": "Email успешно отправлен!"})
    except Exception as e:
        logger.error(f"Real error: {str(e)}")
        translated_error = translate_error_message(str(e))
        raise HTTPException(status_code=500, detail=f"Ошибка при отправке Email: {translated_error}")