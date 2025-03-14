from typing import Any
from sqlalchemy.ext.declarative import as_declarative, declared_attr
from sqlalchemy import MetaData

# Create a MetaData instance
metadata = MetaData()

@as_declarative(metadata=metadata)
class Base:
    id: Any
    __name__: str

    # Automatically generate table names from class names
    @declared_attr
    def __tablename__(cls) -> str:
        return cls.__name__.lower()
