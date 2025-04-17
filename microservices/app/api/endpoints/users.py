from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.crud.users.users import get_all_users, get_user, create_user
from app.models.users_schema import UserCreate , UserResponse
from app.dependencies.postgres_depends import get_db

router = APIRouter()

@router.post('/user' , response_model = UserResponse , status_code = status.HTTP_200_OK)
def create_new_user( user : UserCreate , db : Session = Depends(get_db)):
	new_user = create_user(db, user)
	return new_user
 
@router.get('/', status_code = status.HTTP_200_OK)
def fetch_all_users(db : Session = Depends(get_db)):

	try:
		users = get_all_users(db)
		return users
	except Exception as e:
		raise HTTPException(status_code = 500 , detail = str(e))

@router.get("/{user_id}" , status_code = status.HTTP_200_OK)
def fetch_user(user_id , db : Session = Depends(get_db)):
			
	user = get_user(db , user_id)
	if not user:
		raise HTTPException(status_code = 500, detail = str(e))
	return user









