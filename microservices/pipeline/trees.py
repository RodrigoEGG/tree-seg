import os
import io
import sys
import laspy
import argparse
import numpy as np
from dotenv import load_dotenv
from pymongo import MongoClient
from minio import Minio
from minio.error import S3Error
from scipy.spatial.distance import pdist
from scipy.spatial import ConvexHull
from pyproj import CRS, Transformer

load_dotenv(dotenv_path="/home/juan/tree-seg/microservices/pipeline/.env")

MINIO_USERNAME = os.getenv("MINIO_USERNAME")
MINIO_PASSWORD = os.getenv("MINIO_PASSWORD")
MINIO_BUCKET = os.getenv("MINIO_BUCKET")
MINIO_CLIENT = os.getenv("MINIO_CLIENT")
POTREE_DIR = "/home/juan/potree"
BASE_OUTPUT_DIR = "/home/juan/output"
BASE_INPUT_DIR = "/home/juan/input"

def extract_tree_data_and_averages(laz_file, las_file):
	try:
		tree_ids = np.unique(laz_file.PredInstance)
		tree_ids = tree_ids[tree_ids != 0]
		
		tree_data = []
		total_height = 0
		total_circumference = 0
		count = 0

		crs = las_file.header.parse_crs()
		transformer = Transformer.from_crs(crs, "EPSG:4326", always_xy=True)

		x = laz_file.X * laz_file.header.scale[0] + laz_file.header.offset[0]
		y = laz_file.Y * laz_file.header.scale[1] + laz_file.header.offset[1]
		z = laz_file.Z * laz_file.header.scale[2] + laz_file.header.offset[2]

		for tree_id in tree_ids:
			tree_mask = (laz_file.PredInstance == tree_id)
			z_tree = z[tree_mask]
			x_tree = x[tree_mask]
			y_tree = y[tree_mask]

			threshold = 2.0
			z_max = np.max(z_tree)
			top_points_mask = (z_tree >= (z_max - threshold))
			x_top = x_tree[top_points_mask]
			y_top = y_tree[top_points_mask]
			z_top = z_tree[top_points_mask]

			xy_top = np.vstack((x_top, y_top)).T

			if len(xy_top) < 3:
				continue

			hull = ConvexHull(xy_top)
			hull_points = xy_top[hull.vertices]
			dists = pdist(hull_points)
			crown_diameter = np.max(dists)

			tree_height = z_max - np.min(z_tree)

			x_mean = np.mean(x_top)
			y_mean = np.mean(y_top)
			longitude, latitude = transformer.transform(x_mean, y_mean)
			location = {"latitude": latitude, "longitude": longitude}

			tree_data.append({
				"treeid": int(tree_id),
				"height": tree_height,
				"circumference": crown_diameter,
				"location": location
			})

			total_height += tree_height
			total_circumference += crown_diameter
			count += 1

		if count > 0:
			avg_height = total_height / count
			avg_circumference = total_circumference / count
		else:
			avg_height = 0
			avg_circumference = 0

		return tree_data, avg_height, avg_circumference

	except Exception as e:
		print(f"Error in tree data extraction: {e}")
		return [], 0, 0

def metadata_extraction(project_id: int, file_id: int, file_name: str):
	try:
		file_name_base = file_name.rsplit('.las', 1)[0]
		processed_path = f"{BASE_OUTPUT_DIR}/{file_id}/home/datascience/results/{file_name_base}_out.laz"
		print(f"Procesando archivo: {processed_path}")
		original_path = f"{BASE_INPUT_DIR}/{file_id}/{file_name}"
		print(f"Archivo original : {original_path}")

		laz = laspy.read(processed_path)
		las = laspy.read(original_path)

		if not hasattr(laz, "PredInstance"):
			print("El archivo laz no tiene el atributo 'PredInstance'.")
			return False

		tree_data, avg_height, avg_circumference = extract_tree_data_and_averages(laz, las)

		MONGO_URI = os.getenv("ATLAS_URI")
		client = MongoClient(MONGO_URI)
		db = client["tree-seg"]
		collection = db["metadata"]

		document = collection.find_one({"file_id": file_id})

		if document:
			collection.update_one(
				{"file_id": file_id},
				{"$set": {
					"tree_data": tree_data,
					"average_height": avg_height,
					"average_circumference": avg_circumference
				}}
			)
			print(f"Documento con file_id {file_id} actualizado correctamente.")
			return True
		else:
			print(f"No se encontró documento con file_id {file_id}.")
			return False

	except Exception as e:
		print(f"Error en metadata extraction: {e}")
		return False

if __name__ == "__main__":
	parser = argparse.ArgumentParser(description="Actualizar metadatos de árboles desde archivo LAZ procesado")
	parser.add_argument("project_id", type=int, help="ID del proyecto")
	parser.add_argument("file_id", type=int, help="ID del archivo")
	parser.add_argument("file_name", type=str, help="Nombre del archivo LAS")

	args = parser.parse_args()
	success = metadata_extraction(args.project_id, args.file_id, args.file_name)
	if not success:
		sys.exit(1)
