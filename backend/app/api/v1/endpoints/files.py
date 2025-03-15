from fastapi import APIRouter, File, UploadFile, HTTPException
from fastapi.responses import JSONResponse, PlainTextResponse, StreamingResponse
import filetype
from services.ocr import read_pdf, read_excel, read_image
import fitz  # PyMuPDF
import io

router = APIRouter()

@router.post("/upload/")
async def upload_file(file: UploadFile = File(...)):
    kind = filetype.guess(file.file)
    file.file.seek(0)  # Reset file pointer after detection

    if not kind:
        raise HTTPException(status_code=400, detail="Unsupported file type")

    if kind.mime == 'application/pdf':
        return JSONResponse(content={"text": read_pdf(file)})
    elif kind.mime == 'application/vnd.ms-excel' or kind.mime == 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
        return JSONResponse(content={"text": read_excel(file)})
    elif kind.mime.startswith('image/'):
        return JSONResponse(content={"text": read_image(file)})
    else:
        raise HTTPException(status_code=400, detail="Unsupported file type")

@router.post("/upload-ocr/")
async def upload_ocr_file(file: UploadFile = File(...)):
    kind = filetype.guess(file.file)
    file.file.seek(0)  # Reset file pointer after detection

    if not kind:
        raise HTTPException(status_code=400, detail="Unsupported file type")

    if kind.mime.startswith('image/'):
        return JSONResponse(content={"text": read_image(file)})
    else:
        raise HTTPException(status_code=400, detail="Unsupported file type for OCR")

@router.get("/get-ocr-json/")
async def get_ocr_json(file: UploadFile = File(...)):
    if file.content_type.startswith('image/'):
        text = read_image(file)
        return JSONResponse(content={"text": text})
    else:
        raise HTTPException(status_code=400, detail="Unsupported file type for OCR")

@router.get("/get-ocr-text/")
async def get_ocr_text(file: UploadFile = File(...)):
    if file.content_type.startswith('image/'):
        text = read_image(file)
        return PlainTextResponse(content=text)
    else:
        raise HTTPException(status_code=400, detail="Unsupported file type for OCR")

@router.get("/get-ocr-pdf/")
async def get_ocr_pdf(file: UploadFile = File(...)):
    if file.content_type.startswith('image/'):
        text = read_image(file)
        # Create a new PDF with the OCR text
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