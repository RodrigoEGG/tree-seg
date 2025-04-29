import subprocess
from app.models.files_schema import File
from datetime import timedelta, datetime
from app.utils.minio import get_minio_client, get_minio_bucket
from app.models.project_member_schema import ProjectMember
from app.models.project_schema import Project
from sqlalchemy.orm import Session
from app.models.files_schema import File, FileCheck, FileCreate, FileUpdate, FileUrl
from minio.error import S3Error
from pathlib import Path

def execute_pipeline(db : Session, file_id : int, token : str):
	file : File = db.query(File).filter(File.file_id == file_id).first()
	if not file:
		return False
	BASE_DIR = Path(__file__).resolve().parent
	script_path = BASE_DIR / "pipeline" / "script.sh"

	subprocess.Popen(["sudo", "bash", str(script_path), str(file.project_id), str(file.file_id), file.file_name, token])
	return True
	