from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.crud import files as crud_files

router = APIRouter()

@router.get("/get_all_files")
async def get_all_files():
    try:
        return crud_files.get_all_files()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e)) from e

@router.get("/get_file/{file_id}")
async def get_file(file_id: int):
    try:
        return crud_files.get_file(file_id)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e)) from e

@router.get("/get_project_files/{project_id}")
async def get_project_files(project_id: int):
    try:
        return crud_files.get_project_files(project_id)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e)) from e

    