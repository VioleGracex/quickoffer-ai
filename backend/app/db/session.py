import os
from sqlalchemy import create_engine, inspect
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

SQLALCHEMY_DATABASE_URL = os.getenv("DATABASE_URL")

engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def table_exists(table_name: str) -> bool:
    inspector = inspect(engine)
    return table_name in inspector.get_table_names()

def init_db():
    # Import the Base class and all models here so that they are registered with the Base metadata
    from app.db.base_class import Base  # Import the Base class where MetaData is defined
    from app.models import user  # Import all models to ensure they're registered with Base

    # Create tables if they don't exist
    for table in Base.metadata.tables.keys():
        if not table_exists(table):
            print(f"Creating table {table}")
            Base.metadata.tables[table].create(bind=engine)
        else:
            print(f"Table {table} already exists")