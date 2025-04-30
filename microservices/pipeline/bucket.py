import io
import sys
import laspy
import argparse
from minio import Minio
from minio.error import S3Error

MINIO_USERNAME = "minioadmin"
MINIO_PASSWORD = "minioadmin"
MINIO_BUCKET = "tree-seg"
MINIO_CLIENT = "127.0.0.1:9000"


POTREE_DIR = "/home/juan/potree"
BASE_OUTPUT_DIR = "/home/juan/output"

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


def update_las_file(project_id: int, file_id: int, file_name: str):
    try:
        client = get_minio_client()
        bucket = MINIO_BUCKET
        file_name_base = file_name.rsplit('.las', 1)[0]
        processed_path = f"{BASE_OUTPUT_DIR}/{file_id}/home/datascience/results/{file_name_base}_out.laz"
        object_path = f"{project_id}/{file_id}/{file_name_base}.laz"
        las = laspy.read(processed_path)
        modified_data = io.BytesIO()
        las.write(modified_data)
        modified_data.seek(0)

        client.put_object(
            bucket_name=bucket,
            object_name=object_path,
            data=modified_data,
            length=modified_data.getbuffer().nbytes,
            content_type="application/octet-stream"
        )

        print("Archivo actualizado correctamente en MinIO.")
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
    update_las_file(args.project_id, args.file_id, args.file_name)

