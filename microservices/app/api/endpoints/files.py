from fastapi import APIRouter, Depends, HTTPException, status

router = APIRouter()

@router.get("/")
async def get_files():
    return {"files": "All files returned"}