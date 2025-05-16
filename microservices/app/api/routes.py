from fastapi import APIRouter,Depends

from app.api.endpoints import projects, files, users, auth, pipeline, userc, trees, status
from app.crud.auth.auth import validate_token

api_router = APIRouter()


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
    userc.router,
	prefix='/userc',
	tags=["userc"]
)

api_router.include_router(
	pipeline.router,
	prefix='/pipeline',
	tags=["pipeline"],
	dependencies=[Depends(validate_token)]
)

api_router.include_router(
    trees.router,
	prefix='/trees',
	tags=["trees"]
)

api_router.include_router(
	status.router,
	prefix='/status',
	tags=["status"]
)

api_router.include_router(
    auth.router,
	prefix='/auth',
	tags=["auth"]
)