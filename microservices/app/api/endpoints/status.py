from fastapi import APIRouter, HTTPException
import redis

router = APIRouter()

r = redis.Redis(host='localhost', port=6379, db=0, decode_responses=True)

REDIS_LIST = "file_ids"

@router.get("/insert/{user_id}")
def insert_id(user_id : int):
    r.rpush(REDIS_LIST, user_id)
    return {"id": user_id}

@router.delete("/delete/{user_id}")
def delete_id(user_id : int):
    removed = r.lrem(REDIS_LIST, 0, user_id)
    if removed > 0:
        return {"id": user_id}
    raise HTTPException(status_code=404, detail=f"ID '{user_id}' no encontrado.")

@router.get("/exist/{user_id}")
def check_exists(user_id: int):
    ids = r.lrange(REDIS_LIST, 0, -1)
    if str(user_id) in ids:
        return {"check": True}
    return {"check": False}