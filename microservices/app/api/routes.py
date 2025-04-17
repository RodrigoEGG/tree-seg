from fastapi import APIRouter

# Import all endpoint routers
from app.api.endpoints import projects, files, users, auth

# Create the main API router
api_router = APIRouter()

# Include all endpoint routers with appropriate prefixes and tags

api_router.include_router(
    projects.router,
    prefix="/projects",
    tags=["projects"]
)

api_router.include_router(
    files.router,
    prefix="/files",
    tags=["files"]
)

api_router.include_router(
    users.router,
	prefix='/users',
	tags=["users"]
)

api_router.include_router(
    auth.router,
	prefix='/auth',
	tags=["auth"]
)