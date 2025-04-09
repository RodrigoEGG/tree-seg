from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.crud.files.files import get_all_files, get_file, get_project_files
from app.dependencies.postgres_depends import get_db

router = APIRouter()

@router.get("/", status_code=status.HTTP_200_OK)
def fetch_all_files(db: Session = Depends(get_db)):
    try:
        files = get_all_files(db)
        return files
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/{file_id}", status_code=status.HTTP_200_OK)
def fetch_file(file_id: int, db: Session = Depends(get_db)):
    file = get_file(db, file_id)
    if not file:
        raise HTTPException(status_code=404, detail="File not found")
    return file

@router.get("/project/{project_id}", status_code=status.HTTP_200_OK)
def fetch_project_files(project_id: int, db: Session = Depends(get_db)):
    try:
        files = get_project_files(db, project_id)
        return files
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

