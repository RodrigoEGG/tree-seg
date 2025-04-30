import io
import sys
import laspy
import argparse
from minio import Minio
from minio.error import S3Error
import numpy as np

MINIO_USERNAME = "minioadmin"
MINIO_PASSWORD = "minioadmin"
MINIO_BUCKET = "tree-seg"
MINIO_CLIENT = "127.0.0.1:9000"

POTREE_DIR = "/home/juan/potree"
BASE_OUTPUT_DIR = "/home/juan/output"

def tree_height_extraction(project_id: int, file_id: int, file_name: str):
    try:

        file_name_base = file_name.rsplit('.las', 1)[0]
        processed_path = f"{BASE_OUTPUT_DIR}/{file_id}/home/datascience/results/{file_name_base}_out.laz"
        print(processed_path)

        laz = laspy.read(processed_path)

        if not hasattr(laz, "PredInstance"):
            print("El archivo laz no tiene el atributo 'PredInstance'.")
            return False

        # Get unique tree IDs (excluding 0 which usually means no tree/ground)
        tree_ids = np.unique(laz.PredInstance)
        tree_ids = tree_ids[tree_ids != 0]  # Remove 0 if present (no tree)
        
        tree_heights = {}
        
        # Get ground elevation (assuming classification 2 is ground)
        try:
            ground_points = laz.points[laz.classification == 2]

            if len(ground_points) > 0:
                ground_elevation = np.mean(ground_points.z)
            else:
                #if no ground points found
                ground_elevation = np.min(laz.z)
                print("Warning: No ground points found. Using minimum z value as ground.")
        except AttributeError:
            ground_elevation = np.min(laz.z)
            print("Warning: No classification data. Using minimum z value as ground.")
            
        # Iterate through each tree
        for tree_id in tree_ids:
            if tree_id == 0:  # Skip non-tree points if any
            continue
            
            # Get points for this specific tree
            tree_points = laz.points[laz.PredInstance == tree_id]
            
            # Find maximum height for this tree
            max_z = np.max(tree_points.z)
            
            # Calculate tree height
            tree_height = max_z - ground_elevation
            
            # Store the result
            tree_heights[int(tree_id)] = float(tree_height)

        return tree_heights

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Actualizar pt_src_id en archivo LAS de MinIO")
    parser.add_argument("project_id", type=int, help="ID del proyecto")
    parser.add_argument("file_id", type=int, help="ID del archivo")
    parser.add_argument("file_name", type=str, help="Nombre del archivo LAS")

    args = parser.parse_args()
    update_las_file(args.project_id, args.file_id, args.file_name)