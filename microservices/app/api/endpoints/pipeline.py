from fastapi import APIRouter, Depends, status
from app.crud.pipeline.pipeline import execute_pipeline
from sqlalchemy.orm import Session
from app.dependencies.postgres_depends import get_db

router = APIRouter()

@router.get("/{file_id}", status_code=status.HTTP_200_OK)
def start_pipeline(file_id : int , db : Session = Depends(get_db)):
	pipeline = execute_pipeline(db, file_id)
	return {"check" : pipeline}