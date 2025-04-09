from sqlalchemy.orm import Session
from app.models.files_schema import File
from app.dependencies.postgres_depends import get_db

def get_all_files(db: Session):
    return db.query(File).all()

def get_file(db: Session, file_id: int):
    return db.query(File).filter(File.file_id == file_id).first()

def get_project_files(db: Session, project_id: int):
    return db.query(File).filter(File.project_id == project_id).all()