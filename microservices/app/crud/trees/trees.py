from scipy.spatial.distance import pdist
from scipy.spatial import ConvexHull
import numpy as np

def get_tree_heights(las) -> list:
    """
    Get the height of the tree in the database.
    """
    try:
        # Iterate over segmented sections and calculate the height of each tree
        heights = []

        segment_ids = las['PredInstance'].unique()

        # Get the ground points
        ground_points = las[las['Classification'] == 2]
        ground_elevation = np.mean(ground_z)


        for segment in segment_ids:
            if segment == 0:
                continue
            # Get the points for the current segment
            points = las[las['PredInstance'] == segment]

            # Find the maximum Z (highest point)
            max_z = np.max(z)

            # Calculate tree height
            tree_height = max_z - ground_elevation

            # Append the height to the list
            heights.append(tree_height)
        return heights
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e)) from e

def get_tree_diameter(las) -> list:
    """
    Get the diameter of the tree in the database.
    """
    try:
        # Iterate over segmented sections and calculate the diameter of each tree
        diameters = []

        segment_ids = las['PredInstance'].unique()
        threshold = 2.0  # meters

        for segment in segment_ids:
            if segment == 0:
                continue

            # Get the points for the current segment
            points = las[las['PredInstance'] == segment]

            z = points.z
            z_max = np.max(z)

            # Get points near the top (within 2m below the top)
            top_points_mask = (z >= (z_max - threshold))
            x_top = points.x[top_points_mask]
            y_top = points.y[top_points_mask]

            # Stack them
            xy_top = np.vstack((x_top, y_top)).T

            # Use convex hull to get the outer boundary
            hull = ConvexHull(xy_top)

            # Get hull vertices
            hull_points = xy_top[hull.vertices]

            dists = pdist(hull_points)
            crown_diameter = np.max(dists)

            diameters.append(crown_diameter)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e)) from e
    return diameters