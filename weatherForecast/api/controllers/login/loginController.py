from models.userModel import User
from sqlalchemy.orm import Session
import bcrypt
from fastapi import HTTPException
from sqlalchemy import text
from fastapi.responses import JSONResponse


class UserLoginController:
    def __init__(self, user: User = None, db: Session = None) -> None:
        self.email = user.email
        self.password = user.password_hash
        self.db = db

    def run(self):
        query = text("SELECT * FROM users WHERE email = :email")
        result = self.db.execute(query, {"email": self.email}).fetchone()

        if result is None:
            return JSONResponse(content={"message": "User not found"}, status_code=404)

        return JSONResponse(content={"message": "Loggin with success"}, status_code=200)
