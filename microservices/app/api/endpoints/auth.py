from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from app.crud.auth.auth import auth_user, create_token
from app.dependencies.postgres_depends import get_db

router = APIRouter()

@router.post("/token")
def login(db : Session = Depends(get_db) , form_data: OAuth2PasswordRequestForm = Depends()):
    user = auth_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(status_code=400, detail="Credenciales incorrectas")
    access_token = create_token(data={"sub": user.name})
    return {"access_token": access_token, "token_type": "bearer"}