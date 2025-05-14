from pymongo.database import Database
from sqlalchemy.orm import Session

def get_tree_heights(project_id: int, file_id: int, mongo: Database):
    try:
        # Fetch metadata from MongoDB
        mongo_db = mongo['tree-seg']
        collection = mongo_db["metadata"]
        metadata = collection.find_one({"project_id": project_id, "file_id": file_id})
        
        if not metadata:
            return None
        
        return metadata['tree_heights']
    
    except Exception as e:
        return e
    
def get_tree_diameters(project_id: int, file_id: int, mongo: Database):
    try:
        mongo_db = mongo['tree-seg']
        collection = mongo_db["metadata"]
        metadata = collection.find_one({"project_id": project_id, "file_id": file_id})
        
        if not metadata:
            return None
        
        return metadata['tree_diameters']
    
    except Exception as e:
        return e