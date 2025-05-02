from fastapi import APIRouter, Depends, status
from app.crud.pipeline.pipeline import execute_pipeline
from app.models.files_schema import File
from sqlalchemy.orm import Session
from app.dependencies.postgres_depends import get_db
import asyncio
from concurrent.futures import ThreadPoolExecutor

router = APIRouter()

executor = ThreadPoolExecutor(max_workers=2)

@router.get("/{file_id}", status_code=status.HTTP_200_OK)
async def start_pipeline(file_id: int, db: Session = Depends(get_db)):
    file: File = db.query(File).filter(File.file_id == file_id).first()
    if not file:
        return {"check": False}
    
    loop = asyncio.get_running_loop()
    loop.run_in_executor(executor, execute_pipeline, file)
    
    return {"check": True}
