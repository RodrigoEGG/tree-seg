import subprocess
from app.models.files_schema import File
from app.models.files_schema import File


SCRIPT="/home/juan/tree-seg/microservices/pipeline/script.sh"


def execute_pipeline(file: File):
    with open(f"/tmp/pipeline_{file.file_id}.log", "w") as out:
        subprocess.Popen(
            ["sudo", "bash", SCRIPT, str(file.project_id), str(file.file_id), file.file_name],
            stdout=out,
            stderr=out
        )


