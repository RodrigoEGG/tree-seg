from datetime import timedelta
from app.utils.minio import get_minio_client, get_minio_bucket
from app.models.project_member_schema import ProjectMember
from app.models.project_schema import Project
from sqlalchemy.orm import Session
from app.models.files_schema import File, FileCheck, FileCreate, FileUpdate, FileUrl
from minio.error import S3Error
from sqlalchemy import and_


def get_all_files(db: Session):
    return db.query(File).all()

def get_file(db: Session, file_id: int):
    return db.query(File).filter(File.file_id == file_id).first()

def get_project_files(db: Session, project_id: int):
    return db.query(File).filter(File.project_id == project_id).all()

def get_signed_url(fileurl : FileUrl):

    try : 

        client = get_minio_client()
        bucket = get_minio_bucket()

        url = client.get_presigned_url(
            "PUT",
            bucket,
            fileurl.filename,
            expires=timedelta(hours=1),
            response_headers={"response-content-type": "application/json"},
        )

        return url

    except Exception as e:
        return f"Error al generar la URL firmada: {str(e)}"

def create_file(db : Session , file : FileCreate):

    file = File(
        file_name=file.file_name,
        project_id=file.project_id
    )

    db.add(file)
    db.commit()
    db.refresh(file)

    return file

def check_file(db : Session , file : FileCreate):

    result = db.query(File).filter(File.project_id == file.project_id, File.file_name == file.file_name).first()

    if result : 
        return True
    else : 
        return False
    
def delete_file(db : Session, file_id : int):

    try:

        client = get_minio_client()
        bucket = get_minio_bucket()
    
        file = db.query(File).filter(File.file_id == file_id).first()

        client.remove_object(bucket, f"{file.project_id}/{file.file_name}")

        if file:
            db.delete(file)
            db.commit()
        
        return file
    
    except S3Error as e:
        print(str(e))
        return None

def update_file(db : Session, file_id : int , file : FileUpdate):
    existing_file = db.query(File).filter(File.file_id == file_id).first()
    if not existing_file:
        return None
    for key, value in file.dict(exclude_unset=True).items():
        setattr(existing_file, key, value)
    db.commit()
    db.refresh(existing_file)
    return existing_file
    

def update_file(db : Session, file_id : int , file : FileUpdate):
    existing_file = db.query(File).filter(File.file_id == file_id).first()
    if not existing_file:
        return None
    for key, value in file.dict(exclude_unset=True).items():
        setattr(existing_file, key, value)
    db.commit()
    db.refresh(existing_file)
    return existing_file

def validate_user_file(db: Session, user_id : int, project_id : int, file_id : int):
    result = db.query(File).\
        join(Project, File.project_id == Project.project_id).\
        join(
            ProjectMember,
            and_(
                ProjectMember.project_id == Project.project_id,
                ProjectMember.user_id == user_id
            )
        ).\
        filter(
            File.file_id == file_id,
            Project.project_id == project_id
        ).first()

    return result is not None


def get_file_metadata():
    pass



