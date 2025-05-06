from pymongo.database import Database
from sqlalchemy.orm import Session

def get_tree_heights(db: Session, mongo: Database, project_id: int, file_name: str):
    try:
        mongo_db = mongo['tree-seg']
        collection = mongo_db["metadata"]
        metadata = collection.find_one({"project_id": project_id, "file_name": file_name})
        
        if not metadata:
            return None
        
        return metadata['tree_heights']
    
    except Exception as e:
        return e
    
def get_tree_diameters(db: Session, mongo: Database, project_id: int, file_name: str):
    try:
        mongo_db = mongo['tree-seg']
        collection = mongo_db["metadata"]
        metadata = collection.find_one({"project_id": project_id, "file_name": file_name})
        
        if not metadata:
            return None
        
        return metadata['tree_diameters']
    
    except Exception as e:
        return e