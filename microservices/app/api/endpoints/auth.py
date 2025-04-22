from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from app.crud.auth.auth import auth_user, create_token, validate_token
from app.dependencies.postgres_depends import get_db

router = APIRouter()

@router.post("/token", status_code=status.HTTP_200_OK)
def login(db : Session = Depends(get_db) , form_data: OAuth2PasswordRequestForm = Depends()):
    user = auth_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(status_code=400, detail="Credenciales incorrectas")
    access_token = create_token(data={"sub": user.name})
    return {"access_token": access_token, "token_type": "bearer", "user" : user}

@router.get("/check", status_code=status.HTTP_200_OK)
def check_token(payload: dict = Depends(validate_token)):
    return {"check": True}


