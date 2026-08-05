from fastapi import APIRouter

router = APIRouter()

@router.get("/")
async def get_products():
    return {
        "page": "Products",
        "status": "active",
        "message": "Products page placeholder API"
    }

