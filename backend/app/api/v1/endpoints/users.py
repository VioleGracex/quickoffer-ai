from fastapi import APIRouter, Depends, HTTPException, status, Request
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from datetime import timedelta
from jose import JWTError, jwt
from typing import List

from app import schemas, models, services
from app.db.session import get_db
from app.core.config import settings

router = APIRouter()

# OAuth2 scheme for handling the Bearer token
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


# Token generation (POST /token)
@router.post("/token", response_model=schemas.Token)
def login_for_access_token(
    form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)
):
    print("Received login payload:", form_data)  # Debugging statement

    # Authenticate user by email (email is passed as username)
    user = services.authenticate_user(db, email=form_data.username, password=form_data.password)

    # If no user found, raise 401 error
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    # Generate an access token with user_id (converted to string)
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = services.create_access_token(
        data={"sub": str(user.id)}, expires_delta=access_token_expires  # Ensure sub is a string
    )

    return {"access_token": access_token, "token_type": "bearer"}



# Dependency to get the current user (decoding the token)
def get_current_user(db: Session = Depends(get_db), token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )

    try:
        # Decode the token and get the user_id
        print("Decoding JWT token...")  # Add logging to understand if the token is being decoded
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=["HS256"])

        # Debugging the decoded token payload
        print(f"Decoded payload: {payload}")

        user_id: int = payload.get("sub")  # sub is now the user_id
        
        if user_id is None:
            raise credentials_exception

    except JWTError as e:
        print(f"JWTError: {str(e)}")  # Log the specific error that occurred during JWT decoding
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f"Could not validate credentials: {str(e)}",  # Include the specific JWTError message
            headers={"WWW-Authenticate": "Bearer"},
        )
    except Exception as e:
        print(f"Unexpected error during token validation: {str(e)}")  # Catch any other exceptions
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f"Unexpected error: {str(e)}",  # Return the error message
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    # Fetch the user from the DB using user_id
    user = services.get_user(db, user_id=user_id)
    if user is None:
        print(f"User with ID {user_id} not found in database.")  # Log if user is not found in DB
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
    print("Received create_user payload:", user_in)  # Debugging statement
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
    print("Received update_user payload:", user_in)  # Debugging statement
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
