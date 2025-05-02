import io
import sys
import laspy
import argparse
from minio import Minio
from minio.error import S3Error
import numpy as np
from dotenv import load_dotenv
import os

load_dotenv(dotenv_path="/home/juan/pipeline/.env")


MINIO_USERNAME = os.getenv("MINIO_USERNAME")
MINIO_PASSWORD = os.getenv("MINIO_PASSWORD")
MINIO_BUCKET = os.getenv("MINIO_BUCKET")
MINIO_CLIENT = os.getenv("MINIO_CLIENT")

if not all([MINIO_USERNAME, MINIO_PASSWORD, MINIO_BUCKET, MINIO_CLIENT]):
    raise ValueError("Faltan algunas variables de entorno necesarias en el archivo .env")

POTREE_DIR = "/home/juan/potree"
BASE_OUTPUT_DIR = "/home/juan/output"

def update_las_file(project_id: int, file_id: int, file_name: str):
    try:
        file_name_base = file_name.rsplit('.las', 1)[0]
        processed_path = f"{BASE_OUTPUT_DIR}/{file_id}/home/datascience/results/{file_name_base}_out.laz"
        print(processed_path)

        laz = laspy.read(processed_path)

        if not hasattr(laz, "PredInstance"):
            print("El archivo laz no tiene el atributo 'PredInstance'.")
            return False

        laz.pt_src_id = laz.PredInstance
        point_source_ids = laz.point_source_id

        nueva_clasificacion = np.where(point_source_ids == 0, 2, 4)

        laz.classification = nueva_clasificacion

        laz.write(processed_path)
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

