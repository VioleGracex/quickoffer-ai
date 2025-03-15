from fastapi import APIRouter, File, UploadFile, Form, HTTPException, BackgroundTasks
from fastapi.responses import JSONResponse, PlainTextResponse, StreamingResponse
import filetype
from app.services.ocr import read_pdf, read_excel, read_image
import fitz  # PyMuPDF
import io
import logging
from docx import Document

router = APIRouter()

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

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
    file: UploadFile = File(...),
    ocr_service: str = Form(...),
    output_format: str = Form(...),
):
    print(f"Received file: {file.filename}, OCR service: {ocr_service}, Output format: {output_format}")
    
    try:
        kind = filetype.guess(file.file)
        file.file.seek(0)  # Reset file pointer after detection
        
        if not kind:
            raise HTTPException(status_code=400, detail="Unsupported file type")

        print(f"Detected file type: {kind.mime}")

        if kind.mime.startswith('image/'):
            text = read_image(file, ocr_service)
            print(f"OCR result: {text}")
        else:
            raise HTTPException(status_code=400, detail="Unsupported file type for OCR")

        result = {"status": "success", "text": text}

        if output_format == '.txt':
            print("Returning plain text response")
            return JSONResponse(content={"status": "success", "text": text})
        elif output_format == '.pdf':
            print("Returning PDF response")
            pdf_bytes = io.BytesIO()
            doc = fitz.open()
            page = doc.new_page()
            page.insert_text((100, 100), text)
            doc.save(pdf_bytes)
            doc.close()
            pdf_bytes.seek(0)
            return JSONResponse(content={"status": "success", "message": "PDF created"})
        elif output_format == '.docx':
            print("Returning DOCX response")
            doc = Document()
            doc.add_paragraph(text)
            file_stream = io.BytesIO()
            doc.save(file_stream)
            file_stream.seek(0)
            return JSONResponse(content={"status": "success", "message": "DOCX created"})
        else:
            raise HTTPException(status_code=400, detail="Unsupported output format")
    
    except Exception as e:
        print(f"Error processing file: {e}")
        return JSONResponse(status_code=500, content={"status": "error", "message": f"Internal server error: {e}"})
     
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
            return StreamingResponse(pdf_bytes, media_type="application/pdf")
        else:
            raise HTTPException(status_code=400, detail="Unsupported file type for OCR")
    except Exception as e:
        logger.error(f"Error reading OCR PDF: {e}")
        raise HTTPException(status_code=500, detail=f"Internal server error: {e}")