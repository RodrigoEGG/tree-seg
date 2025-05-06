from fastapi import APIRouter, Depends, HTTPException, status
from app.dependencies.mongo_depends import get_mongo
from app.dependencies.postgres_depends import get_db
from app.crud.trees.trees import get_tree_heights, get_tree_diameters
from sqlalchemy.orm import Session
from pymongo.database import Database

router = APIRouter()


@router.get("/metadata/heights", status_code=status.HTTP_200_OK)
def fetch_tree_heights(
    project_id: int, file_id: int,  mongo_db: Database = Depends(get_mongo)
):
    try:
        heights = get_tree_heights(project_id, file_id, mongo_db)
        if not heights:
            raise HTTPException(status_code=404, detail="Metadata not found")
        return heights
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
@router.get("/metadata/diameters", status_code=status.HTTP_200_OK)
def fetch_tree_diameters(
    project_id: int, file_id: int,  mongo: Database = Depends(get_mongo)
):
    try:
        diameters = get_tree_diameters(project_id, file_id, mongo)
        if not diameters:
            raise HTTPException(status_code=404, detail="Metadata not found")
        return diameters
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    