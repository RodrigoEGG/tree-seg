from fastapi import APIRouter, HTTPException
import redis

router = APIRouter()

r = redis.Redis(host='localhost', port=6379, db=0, decode_responses=True)

REDIS_LIST = "file_ids"

@router.post("/insert/{file_id}")
def insert_id(file_id : int):
    r.rpush(REDIS_LIST, file_id)
    return {"id": file_id}

@router.delete("/delete/{file_id}")
def delete_id(file_id : int):
    removed = r.lrem(REDIS_LIST, 0, file_id)
    if removed > 0:
        return {"id": file_id}
    raise HTTPException(status_code=404, detail=f"ID '{file_id}' no encontrado.")

@router.get("/exist/{file_id}")
def check_exists(file_id: int):
    ids = r.lrange(REDIS_LIST, 0, -1)
    if str(file_id) in ids:
        return {"check": True}
    return {"check": False}