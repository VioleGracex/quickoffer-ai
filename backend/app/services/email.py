import smtplib
from email.message import EmailMessage

async def send_email(to_email, pdf_link):
    msg = EmailMessage()
    msg['Subject'] = 'Your Proposal'
    msg['From'] = 'youremail@example.com'
    msg['To'] = to_email
    
    with open(pdf_link, 'rb') as f:
        file_data = f.read()
        file_name = 'proposal.pdf'
    
    msg.add_attachment(file_data, maintype='application', subtype='pdf', filename=file_name)
    
    with smtplib.SMTP_SSL('smtp.example.com', 465) as smtp:
        smtp.login('youremail@example.com', 'yourpassword')
        smtp.send_message(msg)