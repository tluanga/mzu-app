import email
from email.message import EmailMessage
import smtplib
import ssl
from pydantic import BaseModel, Field


class Email(BaseModel):

    recipientEmailId: str = Field()
    recipientName: str = Field()
    message: str = Field()


def sendNotificationEmail(payload: Email):
    # email_sender = 'webadmin@mzu.edu.in'
    # email_receipient = 'tluangahauhnar@gmail.com'
    # email_password = 'ihokrouawkwgjmed'
    email_sender = 'webadmin@mzu.edu.in'
    email_receipient = payload.recipientEmailId
    email_password = 'ihokrouawkwgjmed'
    print('--------the payload received is -------')
    print(payload)
    subject = 'Application for Mizoram University Registration Completed'

    body = payload.message
    em = EmailMessage()
    em['from'] = email_sender
    em['to'] = email_receipient
    em['subject'] = subject
    em.set_content(body)

    # securing ddata
    context = ssl.create_default_context()

    with smtplib.SMTP_SSL('smtp.gmail.com', 465, context=context)as smtp:
        smtp.login(email_sender, email_password)
        smtp.sendmail(email_sender, email_receipient, em.as_string())
