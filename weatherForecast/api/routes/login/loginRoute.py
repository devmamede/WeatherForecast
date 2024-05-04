from fastapi import APIRouter
from sqlalchemy.orm import Session
from database.databaseConection import database_session
from models.userModel import User
from fastapi import Depends
from controllers.login.loginController import UserLoginController


class Login:
    def __init__(self, router: APIRouter):
        self.router = router

    def routes(self):
        @self.router.post("/login")
        def login_user(user: User, db: Session = Depends(database_session)):
            return UserLoginController(user, db).run()
