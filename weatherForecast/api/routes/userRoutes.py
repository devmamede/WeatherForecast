from fastapi import APIRouter

from routes.register.registerRoute import Register
from routes.login.loginRoute import Login
from routes.delete.deleteRoute import Delete
from routes.update.updateRoute import Update


class UserRouter:
    @staticmethod
    def register_routes():
        router = APIRouter()
        Register(router=router).routes()
        Login(router=router).routes()
        Update(router=router).routes()
        Delete(router=router).routes()
        return router
