from fastapi import APIRouter
from sqlalchemy.orm import Session
from database.databaseConection import database_session
from fastapi import Depends
from controllers.update.updateController import UserUpdateController
from models.updateUserModel import UserUpdateRequest


class Update:
    def __init__(self, router: APIRouter):
        self.router = router

    def routes(self):
        @self.router.put("/")
        def update_user(update_data: UserUpdateRequest, db: Session = Depends(database_session)):
            return UserUpdateController(update_data, db).run()
