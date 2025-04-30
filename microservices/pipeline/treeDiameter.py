import io
import sys
import laspy
import argparse
from minio import Minio
from minio.error import S3Error
import numpy as np
from scipy.spatial.distance import pdist
from scipy.spatial import ConvexHull

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