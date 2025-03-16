from fpdf import FPDF
import os

async def create_pdf(template_path, generated_text):
    pdf = FPDF()
    pdf.add_page()
    pdf.set_font("Arial", size=12)
    pdf.multi_cell(0, 10, generated_text)

    pdf_path = os.path.join("/tmp", "proposal.pdf")
    pdf.output(pdf_path)

    return pdf_path