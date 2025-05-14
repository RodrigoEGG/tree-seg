from datetime import timedelta, datetime
from sqlalchemy.orm import Session
from sqlalchemy import and_
from pymongo.database import Database
from bson import ObjectId
from pymongo.errors import PyMongoError

def get_tree_by_id(client : Database, file_id: str, tree_id: str):
    
	try: 

		db = client['tree-seg']
		collection = db['metadata']

		result = collection.find_one(
			{
				"file_id": file_id,
				"tree_data.treeid": tree_id
			},{
				"file_id": 1,
				"tree_data": {
					"$elemMatch": {
						"treeid": tree_id
					}
				}
			}
		)

		if result['tree_data'][0]:
			return result['tree_data'][0]
		else:
			return {}
	except Exception as e:
		return {}
	

def update_tree_attributes(client: Database, file_id: int, tree_id: int, update_data: dict) -> bool:
    
    try:
        db = client['tree-seg']
        collection = db['metadata']

        set_data = {f"tree_data.$.{key}": value for key, value in update_data.items()}

        result = collection.update_one(
            {
                "file_id": file_id,
                "tree_data.treeid": tree_id
            },
            {
                "$set": set_data
            }
        )

        if result.matched_count == 0:
            return False

        return True

    except PyMongoError as e:
        return False





