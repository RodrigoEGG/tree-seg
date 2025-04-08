from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.crud import files as crud_files
from app.dependencies.postgres_depends import get_db

router = APIRouter()

@router.get("/get_all_files")
async def get_all_files(db: Session = Depends(get_db)):
    try:
        return crud_files.get_all_files(db)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e)) from e

@router.get("/get_file/{file_id}")
async def get_file(file_id: int, db: Session = Depends(get_db)):
    try:
        return crud_files.get_file(db, file_id)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e)) from e

@router.get("/get_project_files/{project_id}")
async def get_project_files(project_id: int, db: Session = Depends(get_db)):
    try:
        return crud_files.get_project_files(db, project_id)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e)) from e

    