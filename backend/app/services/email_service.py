"""
Email service for sending contact form submissions
Uses SMTP to send emails to klstechsolutions2025@gmail.com
"""

import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from typing import Optional
import os

# Email configuration - using environment variables for security
SMTP_SERVER = os.getenv("SMTP_SERVER", "smtp.gmail.com")
SMTP_PORT = int(os.getenv("SMTP_PORT", "587"))
SMTP_USERNAME = os.getenv("SMTP_USERNAME", "klstechsolutions2025@gmail.com")
SMTP_PASSWORD = os.getenv("SMTP_PASSWORD", "")  # Should be set via environment variable
RECIPIENT_EMAIL = os.getenv("RECIPIENT_EMAIL", "klstechsolutions2025@gmail.com")


def send_contact_email(
    name: str,
    email: str,
    subject: str,
    message: str,
    phone: Optional[str] = None,
    company: Optional[str] = None,
) -> bool:
    """
    Send contact form submission via email
    
    Args:
        name: Contact's name
        email: Contact's email address
        subject: Message subject
        message: Message content
        phone: Optional phone number
        company: Optional company name
    
    Returns:
        True if email sent successfully, False otherwise
    """
    try:
        # Create message
        msg = MIMEMultipart()
        msg["From"] = SMTP_USERNAME
        msg["To"] = RECIPIENT_EMAIL
        msg["Subject"] = f"Contact Form: {subject}"
        msg["Reply-To"] = email

        # Build email body
        body_parts = [
            f"New contact form submission from KLS Tech Solutions website",
            "",
            "--- Contact Information ---",
            f"Name: {name}",
            f"Email: {email}",
        ]
        
        if phone:
            body_parts.append(f"Phone: {phone}")
        if company:
            body_parts.append(f"Company: {company}")
        
        body_parts.extend([
            "",
            "--- Message ---",
            f"Subject: {subject}",
            "",
            message,
        ])

        body = "\n".join(body_parts)
        msg.attach(MIMEText(body, "plain"))

        # Send email
        if not SMTP_PASSWORD:
            # In development, log instead of sending if password not configured
            print(f"[EMAIL SERVICE] Would send email (SMTP_PASSWORD not set):")
            print(f"To: {RECIPIENT_EMAIL}")
            print(f"Subject: {msg['Subject']}")
            print(f"Body:\n{body}")
            return True  # Return True for development/testing

        with smtplib.SMTP(SMTP_SERVER, SMTP_PORT) as server:
            server.starttls()
            server.login(SMTP_USERNAME, SMTP_PASSWORD)
            server.send_message(msg)

        return True

    except Exception as e:
        print(f"[EMAIL SERVICE] Error: {str(e)}")
        return False
