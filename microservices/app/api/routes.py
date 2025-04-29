from fastapi import APIRouter,Depends

# Import all endpoint routers
from app.api.endpoints import projects, files, users, auth, pipeline
from app.crud.auth.auth import validate_token

# Create the main API router
api_router = APIRouter()

# Include all endpoint routers with appropriate prefixes and tags

api_router.include_router(
    projects.router,
    prefix="/projects",
    tags=["projects"],
	dependencies=[Depends(validate_token)]
)

api_router.include_router(
    files.router,
    prefix="/files",
    tags=["files"],
	dependencies=[Depends(validate_token)]
)

api_router.include_router(
    users.router,
	prefix='/users',
	tags=["users"],
	dependencies=[Depends(validate_token)]
)

api_router.include_router(
	pipeline.router,
	prefix='/pipeline',
	tags=["pipeline"],
	dependencies=[Depends(validate_token)]
)

api_router.include_router(
    auth.router,
	prefix='/auth',
	tags=["auth"]
)