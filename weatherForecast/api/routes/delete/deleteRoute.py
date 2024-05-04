from fastapi import APIRouter
from sqlalchemy.orm import Session
from database.databaseConection import database_session
from fastapi import Depends
from controllers.delete.deleteController import UserDeleteController
from pydantic import BaseModel, EmailStr


class UserDeleteRequest(BaseModel):
    email: EmailStr


class Delete:
    def __init__(self, router: APIRouter):
        self.router = router

    def routes(self):
        @self.router.delete("/")
        def delete_user(email: UserDeleteRequest, db: Session = Depends(database_session)):
            return UserDeleteController(email.email, db).run()
