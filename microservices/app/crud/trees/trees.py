
def get_tree_heights(las) -> list:
    """
    Get the height of the tree in the database.
    """
    try:
        # Iterate over segmented sections and calculate the height of each tree
        heights = []

        segment_ids = las['PredInstance'].unique()

        for segment in segment_ids:
            if segment == 0:
                continue
            # Get the points for the current segment
            points = las[las['PredInstance'] == segment]

            # Calculate the height of the tree
            min_z = points['Z'].min()
            max_z = points['Z'].max()
            height = max_z - min_z

            # Append the height to the list
            heights.append(height)
        return heights
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e)) from e
    return heights

def get_tree_diameter(las) -> list:
    """
    Get the diameter of the tree in the database.
    """
    try:
        # Iterate over segmented sections and calculate the diameter of each tree
        diameters = []

        segment_ids = las['PredInstance'].unique()

        for segment in segment_ids:
            if segment == 0:
                continue
            # LOGIC FOR DIAMETER CALCULATION
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e)) from e
    return diameters