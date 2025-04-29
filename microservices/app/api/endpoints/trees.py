from fastapi import APIRouter, Depends, HTTPException, status
from app.models.files_schema import FileCreate, FileCreateResponse, FileUpdate, FileUrl, FileUrlResponse
from app.dependencies.mongo_depends import get_mongo
from app.dependencies.postgres_depends import get_db
from sqlalchemy.orm import Session

router = APIRouter()