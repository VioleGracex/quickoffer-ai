""" from sqlalchemy import Boolean, Column, Integer, String
from app.db.base_class import Base

class User(Base):
    __tablename__ = "users"  # Explicitly specify the table name

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    is_active = Column(Boolean, default=True)
    is_superuser = Column(Boolean, default=False)
    # Add any additional fields you need here

 """