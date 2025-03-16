from fastapi import APIRouter
from .files import router as files_router
from .users import router as users_router
from .proposal import router as proposal_router

api_router = APIRouter()
api_router.include_router(users_router, prefix="/users", tags=["users"])
api_router.include_router(files_router, prefix="/files", tags=["files"])
api_router.include_router(proposal_router, prefix="/proposal", tags=["proposal"])