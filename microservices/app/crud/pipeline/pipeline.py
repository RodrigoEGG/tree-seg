import subprocess
from app.models.files_schema import File
from app.utils.minio import get_minio_client, get_minio_bucket
from sqlalchemy.orm import Session
from app.models.files_schema import File
from minio.error import S3Error
from pathlib import Path
import io
import laspy

POTREE="/home/juan/potree"
OUTPUT="/home/juan/output"

def execute_pipeline(db : Session, file_id : int, token : str):
	file : File = db.query(File).filter(File.file_id == file_id).first()
	if not file:
		return False
	BASE_DIR = Path(__file__).resolve().parent
	script_path = BASE_DIR / "pipeline" / "script.sh"

	subprocess.Popen(["sudo", "bash", str(script_path), str(file.project_id), str(file.file_id), file.file_name, token])
	return True
