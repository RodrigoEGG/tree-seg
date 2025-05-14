import io
import sys
import laspy
import argparse
from minio import Minio
from minio.error import S3Error
import numpy as np

def tree_height_extraction(laz_file):
    try:

        # Get unique tree IDs (excluding 0 which usually means no tree/ground)
        tree_ids = np.unique(laz_file.PredInstance)
        tree_ids = tree_ids[tree_ids != 0]  # Remove 0 if present (no tree)
        
        tree_heights = {}
        
        # Get ground elevation (assuming classification 2 is ground)
        try:
            ground_points = laz_file[laz_file.classification == 2]

            if len(ground_points) > 0:
                ground_elevation = np.mean(ground_points.z)
            else:
                #if no ground points found
                ground_elevation = np.min(laz_file.z)
                print("Warning: No ground points found. Using minimum z value as ground.")
        except AttributeError:
            ground_elevation = np.min(laz_file.z)
            print("Warning: No classification data. Using minimum z value as ground.")
            
        # Iterate through each tree
        for tree_id in tree_ids:
            if tree_id == 0:  # Skip non-tree points if any
                continue
            
            # Get points for this specific tree
            tree_points = laz_file.points[laz_file.PredInstance == tree_id]
            
            # Find maximum height for this tree
            max_z = np.max(tree_points.z)
            
            # Calculate tree height
            tree_height = max_z - ground_elevation
            
            # Store the result
            tree_heights[int(tree_id)] = float(tree_height)

        return tree_heights if tree_heights else {}