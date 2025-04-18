from datetime import timedelta
from sqlalchemy.orm import Session
from app.models.files_schema import File
from minio import Minio
from dotenv import dotenv_values

def get_all_files(db: Session):
    return db.query(File).all()

def get_file(db: Session, file_id: int):
    return db.query(File).filter(File.file_id == file_id).first()

def get_project_files(db: Session, project_id: int):
    return db.query(File).filter(File.project_id == project_id).all()

def get_signed_url(filename : str):

    CONFIG = dotenv_values(".env")
    username = CONFIG["MINIO_USERNAME"]
    password = CONFIG["MINIO_PASSWORD"]
    bucket = CONFIG["MINIO_BUCKET"]
    destination = CONFIG["MINIO_CLIENT"]

    try : 

        client = Minio(destination,
            access_key=username,
            secret_key=password,
            secure=False
        )

        url = client.get_presigned_url(
            "PUT",
            bucket,
            filename,
            expires=timedelta(hours=1),
            response_headers={"response-content-type": "application/json"},
        )

        return url
    except Exception as e:
        return str(e)

