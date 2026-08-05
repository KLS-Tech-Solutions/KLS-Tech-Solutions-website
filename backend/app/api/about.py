from fastapi import APIRouter

router = APIRouter()

@router.get("/")
async def get_about():
    return {
        "page": "About",
        "status": "active",
        "message": "About page placeholder API"
    }

