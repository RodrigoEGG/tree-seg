from fastapi import APIRouter, Depends, HTTPException, status
from pymongo.database import Database
from app.dependencies.mongo_depends import get_mongo

router = APIRouter()

@router.get("/{file_id}/{tree_id}", status_code=status.HTTP_200_OK)
def fetch_tree_by_id( file_id : int, tree_id : int ,client : Database = Depends(get_mongo)):
	try:
		tree = get_tree(client, file_id, tree_id)
	except Exception as e:
		return {}