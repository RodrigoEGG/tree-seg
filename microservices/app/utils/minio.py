from minio import Minio
from dotenv import dotenv_values


def get_minio_client():
    CONFIG = dotenv_values(".env")

    try:
        client = Minio(
            CONFIG["MINIO_CLIENT"],
            access_key=CONFIG["MINIO_USERNAME"],
            secret_key=CONFIG["MINIO_PASSWORD"],
            secure=False
        )
        return client

    except Exception as e:
        raise RuntimeError(f"Connection error")

def get_minio_bucket():
    CONFIG = dotenv_values(".env")
    return CONFIG["MINIO_BUCKET"]

    
