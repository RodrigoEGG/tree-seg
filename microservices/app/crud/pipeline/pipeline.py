import subprocess
from app.models.files_schema import File
from app.utils.minio import get_minio_client, get_minio_bucket
from sqlalchemy.orm import Session
from app.models.files_schema import File
from minio.error import S3Error
from pathlib import Path

POTREE="/home/juan/potree/"

def execute_pipeline(db : Session, file_id : int, token : str):
	file : File = db.query(File).filter(File.file_id == file_id).first()
	if not file:
		return False
	BASE_DIR = Path(__file__).resolve().parent
	script_path = BASE_DIR / "pipeline" / "script.sh"

	subprocess.Popen(["sudo", "bash", str(script_path), str(file.project_id), str(file.file_id), file.file_name, token])
	return True

def upload_potree(db: Session, file_id: int):
    try:
        client = get_minio_client()
        bucket = get_minio_bucket()

        file: File = db.query(File).filter(File.file_id == file_id).first()
        if not file:
            return False

        potree_path = Path(POTREE) / str(file_id)
        upload_path = f"{file.project_id}/{file.file_id}/potree"

        filenames = ["metadata.json", "log.txt", "hierarchy.bin", "octree.bin"]

        uploaded_any = False
        for fname in filenames:
            local_path = potree_path / fname
            if local_path.exists():
                object_name = f"{upload_path}/{fname}"
                client.fput_object(bucket, object_name, str(local_path))
                uploaded_any = True
            else :
                return False
        return uploaded_any

    except S3Error as e:
        return e
    except Exception as e:
        return e
