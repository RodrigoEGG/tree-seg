import os
import argparse
from dotenv import load_dotenv
import psycopg2

load_dotenv(dotenv_path="/home/juan/tree-seg/microservices/pipeline/.env")
POSTGRES_URL = os.getenv("POSTGRES_URL")


def update_is_segmented(file_id: int):
    try:
        conn = psycopg2.connect(POSTGRES_URL)
        cursor = conn.cursor()

        cursor.execute(
            "UPDATE file SET is_segmented = TRUE WHERE file_id = %s;",
            (file_id,)
        )
        conn.commit()

        if cursor.rowcount == 0:
            print(f"No se encontró ningún registro con id = {file_id}")
        else:
            print(f"Archivo con id = {file_id} actualizado correctamente (is_segmented = TRUE).")

    except Exception as e:
        print(f"Error al actualizar la base de datos: {e}")
    finally:
        if 'cursor' in locals():
            cursor.close()
        if 'conn' in locals():
            conn.close()

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Actualizar is_segmented en files_i_state")
    parser.add_argument("project_id", type=int, help="ID del proyecto (no se usa en este script)")
    parser.add_argument("file_id", type=int, help="ID del archivo a actualizar")
    parser.add_argument("file_name", type=str, help="Nombre del archivo (no se usa en este script)")

    args = parser.parse_args()
    update_is_segmented(args.file_id)

