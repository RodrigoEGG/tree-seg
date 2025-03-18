from fastapi import APIRouter, Depends, HTTPException, status

router = APIRouter()

@router.get("/")
async def get_projects():
    return {"projects": "All projects returned"}