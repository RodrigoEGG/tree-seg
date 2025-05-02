import subprocess
from app.models.files_schema import File
from sqlalchemy.orm import Session
from app.models.files_schema import File

SCRIPT="/home/juan/tree-seg/microservices/pipeline/script.sh"

def execute_pipeline(db : Session, file_id : int):
	file : File = db.query(File).filter(File.file_id == file_id).first()
	if not file:
		return False
	subprocess.Popen(["sudo", "bash", SCRIPT , str(file.project_id), str(file.file_id), file.file_name])
	return True
