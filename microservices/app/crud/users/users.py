from sqlalchemy.orm import Session
from app.models.users_schema import User

def get_all_users(db : Session):
    return db.query(User).all()

def get_user(db : Session, user_id : int):
    return db.query(User).filter(User.user_id == user_id).first()

def get_user_by_name(db : Session, name : str):
    return db.query(User).filter(User.name == name).first()



