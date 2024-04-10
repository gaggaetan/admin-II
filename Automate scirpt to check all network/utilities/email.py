import smtplib
from email.mime.text import MIMEText

sender = "gaetan.carbonnelle1@gmail.com"
recipients = [sender,"gaetan.carbonnelle1@gmail.com"]
password = "hsot ijrh dbud rfef"


def send_email(subject, body ):
    msg = MIMEText(body)
    msg['Subject'] = subject
    msg['From'] = sender
    msg['To'] = ', '.join(recipients)
    with smtplib.SMTP_SSL('smtp.gmail.com', 465) as smtp_server:
       smtp_server.login(sender, password)
       smtp_server.sendmail(sender, recipients, msg.as_string())
    print("Message sent!")


