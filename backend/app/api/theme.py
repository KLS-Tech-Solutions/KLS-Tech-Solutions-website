from fastapi import APIRouter
from pydantic import BaseModel
import json
import os

router = APIRouter()

# Simple file-based storage for theme preference
# In production, this would be stored in a database
THEME_STORAGE_FILE = os.path.join(
    os.path.dirname(os.path.dirname(os.path.dirname(__file__))),
    "backend",
    "theme_preference.json"
)

class ThemeRequest(BaseModel):
    theme: str

class ThemeResponse(BaseModel):
    theme: str

def get_default_theme() -> str:
    """Get default theme (light)"""
    return "light"

def load_theme_preference() -> str:
    """Load theme preference from file, or return default"""
    try:
        if os.path.exists(THEME_STORAGE_FILE):
            with open(THEME_STORAGE_FILE, 'r') as f:
                data = json.load(f)
                theme = data.get('theme', get_default_theme())
                # Validate theme value
                if theme in ['light', 'dark']:
                    return theme
        return get_default_theme()
    except Exception as e:
        print(f"Error loading theme preference: {e}")
        return get_default_theme()

def save_theme_preference(theme: str) -> None:
    """Save theme preference to file"""
    try:
        # Validate theme value
        if theme not in ['light', 'dark']:
            theme = get_default_theme()
        
        os.makedirs(os.path.dirname(THEME_STORAGE_FILE), exist_ok=True)
        with open(THEME_STORAGE_FILE, 'w') as f:
            json.dump({'theme': theme}, f)
    except Exception as e:
        print(f"Error saving theme preference: {e}")

@router.get("/")
async def get_theme():
    """Get current theme preference"""
    theme = load_theme_preference()
    return ThemeResponse(theme=theme)

@router.post("/")
async def set_theme(request: ThemeRequest):
    """Set theme preference"""
    theme = request.theme
    save_theme_preference(theme)
    return ThemeResponse(theme=theme)
