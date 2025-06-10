
import os
import ssl
import smtplib
import certifi
from pathlib import Path
from email.message import EmailMessage
from datetime import datetime
from dotenv import load_dotenv

env_path = Path(__file__).resolve().parent.parent.parent / ".env"
load_dotenv(dotenv_path=env_path)

EMAIL_SENDER    = os.getenv("CONTACT_FORM_EMAIL_SENDER")

EMAIL_PASSWORD  = os.getenv("CONTACT_FORM_EMAIL_PW")

EMAIL_RECEIVER_ENGLISH  = os.getenv("CONTACT_FORM_EMAIL_RECEIVER_ENGLISH", EMAIL_SENDER)
EMAIL_RECEIVER_RUSSIAN  = os.getenv("CONTACT_FORM_EMAIL_RECEIVER_RUSSIAN", EMAIL_SENDER)
EMAIL_RECEIVER_UKRAINIAN  = os.getenv("CONTACT_FORM_EMAIL_RECEIVER_UKRAINIAN", EMAIL_SENDER)

def send_email(sender_first_name, sender_last_name, sender_email, sender_phone_number, message_content, language):

    if not EMAIL_SENDER or not EMAIL_PASSWORD:
        raise RuntimeError(f"Missing EMAIL_SENDER or EMAIL_PASSWORD; looked in {env_path}")

    email_reciever = EMAIL_SENDER
    if language == "english":
        email_reciever = EMAIL_RECEIVER_ENGLISH
    elif language == "russian":
        email_reciever = EMAIL_RECEIVER_RUSSIAN
    elif language == "ukrainian":
        email_reciever = EMAIL_RECEIVER_UKRAINIAN


    em = EmailMessage()
    em["From"]    = f"OST Services <{EMAIL_SENDER}>"
    em["To"]      = email_reciever
    em["Subject"] = "New message from your site’s contact form"

    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    em.set_content(f"""\
    Hello,

    You have received a new message via your website’s contact form.

    Time:         {timestamp}
    Name:         {sender_first_name} {sender_last_name}
    Email:        {sender_email}
    Phone Number: {sender_phone_number}

    Message:
    {message_content}

    —
    This notification was sent automatically by your site.
    """)

    ssl_ctx = ssl.create_default_context(cafile=certifi.where())
    ssl_ctx.options |= ssl.OP_NO_TLSv1 | ssl.OP_NO_TLSv1_1
    ssl_ctx.set_ciphers("HIGH:!aNULL:!eNULL")
    ssl_ctx.check_hostname = True
    ssl_ctx.verify_mode   = ssl.CERT_REQUIRED

    with smtplib.SMTP("smtp.gmail.com", 587) as smtp:
        smtp.ehlo()
        smtp.starttls(context=ssl_ctx)
        smtp.ehlo()
        smtp.login(EMAIL_SENDER, EMAIL_PASSWORD)
        smtp.send_message(em)