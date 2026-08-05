from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, EmailStr
from typing import Optional
from app.services.email_service import send_contact_email

router = APIRouter()


class ContactFormRequest(BaseModel):
    name: str
    email: EmailStr
    phone: Optional[str] = None
    company: Optional[str] = None
    subject: str
    message: str


class ContactFormResponse(BaseModel):
    success: bool
    message: str


@router.get("/")
async def get_contact():
    return {
        "page": "Contact",
        "status": "active",
        "message": "Contact page placeholder API"
    }


@router.post("/submit", response_model=ContactFormResponse)
async def submit_contact_form(form_data: ContactFormRequest):
    """
    Submit contact form and send email to klstechsolutions2025@gmail.com
    """
    try:
        success = send_contact_email(
            name=form_data.name,
            email=form_data.email,
            phone=form_data.phone,
            company=form_data.company,
            subject=form_data.subject,
            message=form_data.message,
        )

        if success:
            return ContactFormResponse(
                success=True,
                message="Thank you for your message! We'll get back to you soon."
            )
        else:
            raise HTTPException(
                status_code=500,
                detail="Failed to send email. Please try again later."
            )

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"An error occurred while processing your request: {str(e)}"
        )

