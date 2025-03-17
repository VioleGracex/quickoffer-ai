from fastapi import APIRouter, Depends, HTTPException, status, Request
from sqlalchemy.orm import Session
from jose import JWTError, jwt
from typing import List
from fastapi.security import OAuth2PasswordBearer

from app import schemas, models, services
from app.db.session import get_db
from app.core.config import settings
from app.utils.auth import verify_jwt

router = APIRouter()

# OAuth2 scheme for handling the Bearer token
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

# Dependency to get the current user (decoding the token)
def get_current_user(db: Session = Depends(get_db), token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )

    try:
        # Verify the token using Auth0
        payload = verify_jwt(token)
        user_id: int = payload.get("sub")
        
        if user_id is None:
            raise credentials_exception

    except JWTError as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f"Could not validate credentials: {str(e)}",
            headers={"WWW-Authenticate": "Bearer"},
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f"Unexpected error: {str(e)}",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    # Fetch the user from the DB using user_id
    user = services.get_user(db, user_id=user_id)
    if user is None:
        raise credentials_exception
    
    return user

# Get the current user's data (GET /users/me)
@router.get("/me", response_model=schemas.User)
def read_users_me(current_user: schemas.User = Depends(get_current_user)):
    return current_user


# User creation endpoint (POST /users/)
@router.post("/", response_model=schemas.User)
async def create_user(request: Request, db: Session = Depends(get_db)):
    user_in = await request.json()
    user_in = schemas.UserCreate(**user_in)
    user = services.get_user_by_email(db, email=user_in.email)
    if user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered",
        )
    return services.create_user(db=db, user_in=user_in)


# Read all users (GET /users/)
@router.get("/all", response_model=List[schemas.User])
def read_users(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    users = services.get_users(db, skip=skip, limit=limit)
    return users


# Read a specific user (GET /users/{user_id})
@router.get("/{user_id}", response_model=schemas.User)
def read_user(user_id: int, db: Session = Depends(get_db)):
    user = services.get_user(db, user_id=user_id)
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return user


# Update user data (PUT /users/{user_id})
@router.put("/{user_id}", response_model=schemas.User)
async def update_user(user_id: int, request: Request, db: Session = Depends(get_db)):
    user_in = await request.json()
    user_in = schemas.UserUpdate(**user_in)
    user = services.get_user(db, user_id=user_id)
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return services.update_user(db=db, user=user, user_in=user_in)


# Delete user data (DELETE /users/{user_id})
@router.delete("/{user_id}", response_model=schemas.User)
def delete_user(user_id: int, db: Session = Depends(get_db)):
    user = services.get_user(db, user_id=user_id)
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    services.delete_user(db=db, user_id=user_id)
    return user