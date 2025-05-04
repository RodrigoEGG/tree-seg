import argparse
from pathlib import Path
from minio import Minio
from minio.error import S3Error
from dotenv import load_dotenv
import os

load_dotenv(dotenv_path="/home/juan/tree-seg/microservices/pipeline/.env")

MINIO_USERNAME = os.getenv("MINIO_USERNAME")
MINIO_PASSWORD = os.getenv("MINIO_PASSWORD")
MINIO_BUCKET = os.getenv("MINIO_BUCKET")
MINIO_CLIENT = os.getenv("MINIO_CLIENT")

POTREE = "/home/juan/potree/"
BASE_OUTPUT_DIR = "/home/juan/output"

def get_minio_client():
    return Minio(
        MINIO_CLIENT,
        access_key=MINIO_USERNAME,
        secret_key=MINIO_PASSWORD,
        secure=False
    )

def get_minio_bucket():
    return MINIO_BUCKET

def upload_potree(project_id: int, file_id: int):
    try:
        client = get_minio_client()
        bucket = get_minio_bucket()

        potree_path = Path(POTREE) / str(file_id) 
        upload_path = f"{project_id}/{file_id}/potree"

        filenames = ["metadata.json", "log.txt", "hierarchy.bin", "octree.bin"]
        uploaded_any = False

        for fname in filenames:
            local_path = potree_path / fname
            if local_path.exists():
                object_name = f"{upload_path}/{fname}"
                client.fput_object(bucket, object_name, str(local_path))
                print(f"Subido: {object_name}")
                uploaded_any = True
            else:
                print(f"Archivo no encontrado: {local_path}")

        return uploaded_any

    except S3Error as e:
        print(f"Error de MinIO: {e}")
        return e
    except Exception as e:
        print(f"Error inesperado: {e}")
        return e

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Sube archivos Potree a MinIO")
    parser.add_argument("project_id", type=int, help="ID del proyecto")
    parser.add_argument("file_id", type=int, help="ID del archivo")
    parser.add_argument("file_name", type=str, help="Nombre del archivo LAS (no se usa en esta función, solo informativo)")

    args = parser.parse_args()
    upload_potree(args.project_id, args.file_id)

