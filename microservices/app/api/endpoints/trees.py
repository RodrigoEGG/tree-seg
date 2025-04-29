from fastapi import APIRouter, Depends, HTTPException, status
from app.models.files_schema import FileCreate, FileCreateResponse, FileUpdate, FileUrl, FileUrlResponse

from app.crud.files.files import get_las_file
from app.crud.trees.trees import get_tree_heights
from app.dependencies.mongo_depends import get_mongo
from app.dependencies.postgres_depends import get_db
from sqlalchemy.orm import Session
from pymongo.database import Database

router = APIRouter()

@router.get("/{file_id}", response_model=FileUrlResponse, status_code=status.HTTP_200_OK)
def get_all_tree_heights(file_id: int, pg: Session = Depends(get_db), mongo_db: Database = Depends(get_mongo) ):
    """
    Get the height of the tree in the database.
    """
    try:
        las = get_las_file(pg, mongo_db, file_id)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
    if las is None:
        raise HTTPException(status_code=404, detail="File not found")

    try:
        heights = get_tree_heights(las)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))