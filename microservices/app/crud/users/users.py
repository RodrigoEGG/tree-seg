from sqlalchemy.orm import Session
from app.models.users_schema import User, UserCreate
from app.utils.security import pwd_context

def create_user( db : Session, user : UserCreate):
    new_user = User(**user.dict())
    new_user.password = pwd_context.hash(new_user.password)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

def get_all_users(db : Session):
    return db.query(User).all()

def get_user(db : Session, user_id : int):
    return db.query(User).filter(User.user_id == user_id).first()

def get_user_by_name(db : Session, name : str):
    return db.query(User).filter(User.name == name).first()



