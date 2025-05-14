from fastapi import APIRouter, Depends, HTTPException, status
from app.crud.trees.trees import get_tree_by_id, update_tree_attributes
from pymongo.database import Database
from app.dependencies.mongo_depends import get_mongo

router = APIRouter()

@router.get("/{file_id}/{tree_id}", status_code=status.HTTP_200_OK)
def fetch_tree_by_id( file_id : int, tree_id : int ,client : Database = Depends(get_mongo)):
	try:
		tree = get_tree_by_id(client, file_id, tree_id)
		return tree
	except Exception as e:
		return {}
	
@router.post("/{file_id}/{tree_id}", status_code=status.HTTP_200_OK)
def update_tree_by_id( file_id : int, tree_id : int , data : dict, client : Database = Depends(get_mongo)):
	try:
		check = update_tree_attributes(client, file_id, tree_id, data)
		return {"check" : check}
	except Exception as e:
		return {"check" : False}