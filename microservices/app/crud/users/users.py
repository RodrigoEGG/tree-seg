from sqlalchemy.orm import Session
from app.models.files_schema import User
from app.dependencies.postgres_depends import get_db

def get_all_users(db : Session):
    return db.query(User).all()

def get_user(db : Session, user_id : int):
    return db.query(User).filter(User.user_id == user_id).first()

def get_user_by_name(db : Session, name : str):
    return db.query(User).filter(User.name == name).first()



