from fastapi import Depends, HTTPException
from sqlalchemy.orm import Session
from app.models.users_schema import User
from jose import jwt, JWTError
from datetime import datetime, timedelta
from app.utils.security import pwd_context, oauth2_scheme
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials


SECRET_KEY = "ge_jNAKDubIXNwlFTBjBXY0RtGzhENMNftgV-df--xw"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 4320

extract = HTTPBearer()


def auth_user(db : Session , name : str, password : str):
    user = db.query(User).filter(User.name == name).first()
    if not user :
        return False
    flag = pwd_context.verify(password, user.password)
    if not flag:
        return False
    return user

def create_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


def validate_token(token: str = Depends(oauth2_scheme)):
    try:
        jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return True
    except JWTError:
        raise HTTPException(status_code=401, detail="Token inválido")
    

def get_token(token: HTTPAuthorizationCredentials = Depends(extract)):
    try:
        payload = jwt.decode(token.credentials, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except JWTError:
        return None
    