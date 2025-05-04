from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.crud.users.users import create_user  # Import the function
from app.models.users_schema import User, UserCreate, UserResponse
from app.dependencies.postgres_depends import get_db

router = APIRouter()

@router.post("/user", response_model=UserResponse)
def register_user(user: UserCreate, db: Session = Depends(get_db)):
    # Check if the user already exists
    existing_user = db.query(User).filter(User.email == user.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    # Call the create_user function to create a new user
    return create_user(db, user)