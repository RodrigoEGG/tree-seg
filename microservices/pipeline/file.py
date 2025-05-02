import io
import sys
import laspy
import argparse
from minio import Minio
from minio.error import S3Error
from dotenv import load_dotenv
import os

load_dotenv(dotenv_path="/home/juan/pipeline/.env")


MINIO_USERNAME = os.getenv("MINIO_USERNAME")
MINIO_PASSWORD = os.getenv("MINIO_PASSWORD")
MINIO_BUCKET = os.getenv("MINIO_BUCKET")
MINIO_CLIENT = os.getenv("MINIO_CLIENT")

POTREE_DIR = "/home/juan/potree"
BASE_OUTPUT_DIR = "/home/juan/output"
INPUT = "/home/juan/input"

def get_minio_client():
    try:
        client = Minio(
            MINIO_CLIENT,
            access_key=MINIO_USERNAME,
            secret_key=MINIO_PASSWORD,
            secure=False
        )
        return client
    except Exception:
        raise RuntimeError("Error de conexión con MinIO")

def insert_file(project_id: int, file_id: int, file_name: str):
    try:
        client = get_minio_client()
        bucket = MINIO_BUCKET
        object_path = f"{project_id}/{file_id}/{file_name}"

        file_name_base = file_name.rsplit('.las', 1)[0]
        processed_path = f"{BASE_OUTPUT_DIR}/{file_id}/home/datascience/results/{file_name_base}_out.laz"

        file_object = client.get_object(bucket, object_path)
        data = io.BytesIO(file_object.read())
        las = laspy.read(data)
        las.write(f"{INPUT}/{file_id}/{file_name}")

        return True

    except Exception as e:
        print(f"Error: {e}")
        return False

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Actualizar pt_src_id en archivo LAS de MinIO")
    parser.add_argument("project_id", type=int, help="ID del proyecto")
    parser.add_argument("file_id", type=int, help="ID del archivo")
    parser.add_argument("file_name", type=str, help="Nombre del archivo LAS")

    args = parser.parse_args()
    insert_file(args.project_id, args.file_id, args.file_name)

