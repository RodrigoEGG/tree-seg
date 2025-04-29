from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from app.crud.pipeline.pipeline import execute_pipeline, upload_potree
from sqlalchemy.orm import Session
from app.crud.auth.auth import auth_user, create_token, get_token, validate_token
from app.dependencies.postgres_depends import get_db

router = APIRouter()

@router.get("/pipeline/{file_id}", status_code=status.HTTP_200_OK)
def start_pipeline(file_id : int , token : dict = Depends(get_token), db : Session = Depends(get_db)):
	if not token:
		raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Token inválido o expirado")
	pipeline = execute_pipeline(db, file_id, token)

	return {"check" : pipeline}

@router.get("/potree/{file_id}", status_code=status.HTTP_200_OK)
def strart_potree_upload(file_id : int ,db : Session = Depends(get_db)):
	uploaded = upload_potree(db, file_id)
	return {"check" : uploaded}