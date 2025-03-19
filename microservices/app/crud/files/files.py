from sqlalchemy.orm import Session
from app.models import files_schema as models
from app.database import db

def get_all_files(db: Session):
    return db.query(models.Files).all()

def get_file(db: Session, file_id: int):
    return db.query(models.Files).filter(models.Files.file_id == file_id).first()

def get_project_files(db: Session, project_id: int):
    return db.query(models.Files).filter(models.Files.project_id == project_id).all()