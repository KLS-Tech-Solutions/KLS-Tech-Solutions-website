from fastapi import APIRouter

router = APIRouter()

@router.get("/")
async def get_home():
    return {
        "page": "Home",
        "status": "active",
        "message": "Home page placeholder API"
    }

