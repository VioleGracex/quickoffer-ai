from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError

from app.api.v1.endpoints import api_router  # Import api_router
from app.db.session import get_db, init_db, table_exists
from app.core.config import settings
from app import services, schemas
from app.core.security import add_cors_middleware

app = FastAPI()

# Add CORS middleware
add_cors_middleware(app)

# Include the API router
app.include_router(api_router, prefix="/api/v1")

@app.on_event("startup")
def startup_event():
    # Initialize the database and create tables if they don't exist
    init_db()

    # Create default admin user if not exists
    try:
        db: Session = next(get_db())
        if table_exists("users"):
            user = services.get_user_by_email(db, email=settings.ADMIN_EMAIL)
            if not user:
                admin_in = schemas.UserCreate(
                    email=settings.ADMIN_EMAIL,
                    password=settings.ADMIN_PASSWORD,
                    first_name="Admin",
                    last_name="User",
                    is_active=True,
                    is_superuser=True,
                )
                services.create_user(db=db, user_in=admin_in)
    except SQLAlchemyError as e:
        print(f"Error occurred while creating default admin user: {e}")

@app.get("/")
def read_root():
    return {"message": "Welcome to the FastAPI application!"}