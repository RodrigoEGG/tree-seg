from fastapi import APIRouter

# Import all endpoint routers
from app.api.endpoints import projects, files

# Create the main API router
api_router = APIRouter()

# Include all endpoint routers with appropriate prefixes and tags

api_router.include_router(
    files.router,
    prefix="/files",
    tags=["files"]
)