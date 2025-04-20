from datetime import timedelta
from app.utils.minio import get_minio_client, get_minio_bucket
from sqlalchemy.orm import Session
from app.models.files_schema import File, FileCreate, FileUrl

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
