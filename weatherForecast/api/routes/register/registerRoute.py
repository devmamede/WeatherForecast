from fastapi import APIRouter
from sqlalchemy.orm import Session
from controllers.register.registerController import UserRegisterController
from database.databaseConection import database_session
from models.userModel import User
from fastapi import Depends


class Register:
    def __init__(self, router: APIRouter):
        self.router = router

    def routes(self):
        @self.router.post("/register")
        def register_user(user: User, db: Session = Depends(database_session)):
            return UserRegisterController(user, db).run()
