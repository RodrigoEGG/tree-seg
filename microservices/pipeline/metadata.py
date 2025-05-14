import io
import sys
import laspy
import argparse
from minio import Minio
from minio.error import S3Error
import numpy as np
from pymongo import MongoClient
import io
import sys
import laspy
import argparse
from minio import Minio
from minio.error import S3Error
import numpy as np
from scipy.spatial.distance import pdist
from scipy.spatial import ConvexHull
import io
import sys
import laspy
import argparse
from minio import Minio
from minio.error import S3Error
import numpy as np
from scipy.spatial.distance import pdist
from scipy.spatial import ConvexHull

CONFIG = dotenv_values(".env")
POTREE_DIR = "/home/juan/potree"
BASE_OUTPUT_DIR = "/home/juan/output"


def tree_diameter_extraction(laz_file):
    try:
        # Get unique tree IDs (excluding 0 which usually means no tree/ground)
        tree_ids = np.unique(laz_file.PredInstance)
        tree_ids = tree_ids[tree_ids != 0]  # Remove 0 if present (no tree)
        
        tree_diameters = {}
            
        # Iterate through each tree
        for tree_id in tree_ids:
            if tree_id == 0:  # Skip non-tree points if any
                continue
            
            z = laz_file.z  # Get the z-coordinates (height)

            # Get points near the top (within 2m below the top)
            threshold = 2.0  # meters
            top_points_mask = (z >= (z_max - threshold))
            x_top = laz_file.x[top_points_mask]
            y_top = laz_file.y[top_points_mask]
            
            # Stack them
            xy_top = np.vstack((x_top, y_top)).T

            # Use convex hull to get the outer boundary
            hull = ConvexHull(xy_top)

            # Get hull vertices
            hull_points = xy_top[hull.vertices]

            # Calculate pairwise distances between hull points
            dists = pdist(hull_points)
            crown_diameter = np.max(dists)

            tree_diameters[int(tree_id)] = crown_diameter
            
        return tree_diameters if tree_diameters else {}

def tree_diameter_extraction(laz_file):
    try:
        # Get unique tree IDs (excluding 0 which usually means no tree/ground)
        tree_ids = np.unique(laz_file.PredInstance)
        tree_ids = tree_ids[tree_ids != 0]  # Remove 0 if present (no tree)
        
        tree_diameters = {}
            
        # Iterate through each tree
        for tree_id in tree_ids:
            if tree_id == 0:  # Skip non-tree points if any
                continue
            
            z = laz_file.z  # Get the z-coordinates (height)

            # Get points near the top (within 2m below the top)
            threshold = 2.0  # meters
            top_points_mask = (z >= (z_max - threshold))
            x_top = laz_file.x[top_points_mask]
            y_top = laz_file.y[top_points_mask]
            
            # Stack them
            xy_top = np.vstack((x_top, y_top)).T

            # Use convex hull to get the outer boundary
            hull = ConvexHull(xy_top)

            # Get hull vertices
            hull_points = xy_top[hull.vertices]

            # Calculate pairwise distances between hull points
            dists = pdist(hull_points)
            crown_diameter = np.max(dists)

            tree_diameters[int(tree_id)] = crown_diameter
            
        return tree_diameters if tree_diameters else {}



def metadata_extraction(project_id: int, file_id: int, file_name: str):
    try:

        file_name_base = file_name.rsplit('.las', 1)[0]
        processed_path = f"{BASE_OUTPUT_DIR}/{file_id}/home/datascience/results/{file_name_base}_out.laz"
        print(processed_path)

        laz = laspy.read(processed_path)

        if not hasattr(laz, "PredInstance"):
            print("El archivo laz no tiene el atributo 'PredInstance'.")
            return False
        
        # Call the tree height extraction function
        tree_heights = tree_height_extraction(laz)
        
        # Call the tree diameter extraction function
        tree_diameters = tree_diameter_extraction(laz)

        MONGO_URI = CONFIG["ATLAS_URI"]

        client = MongoClient(MONGO_URI)
        db = client["tree-seg"]
        collection = db["metadata"]

        try:
            document = collection.find_one({"file_id": file_id})

            if document:
                # Update the existing document with new tree heights and diameters
                collection.update_one(
                    {"file_id": file_id},
                    {"$set": {"tree_heights": tree_heights, "tree_diameters": tree_diameters}}
                )
                print(f"Document with file_id {file_id} updated successfully.")
                return True
            else:
                print(f"No document found with file_id {file_id}.")
                return False
        except Exception as e:
            print(f"Error fetching document from MongoDB: {e}")
            return False
        
        return True
    except Exception as e:
        print(f"Error in metadata extraction: {e}")
        return False

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Actualizar pt_src_id en archivo LAS de MinIO")
    parser.add_argument("project_id", type=int, help="ID del proyecto")
    parser.add_argument("file_id", type=int, help="ID del archivo")
    parser.add_argument("file_name", type=str, help="Nombre del archivo LAS")

    args = parser.parse_args()
    metadata_extraction(args.project_id, args.file_id, args.file_name)