from fastapi.responses import JSONResponse
from models.userModel import User
from sqlalchemy.orm import Session
import re
import bcrypt
from sqlalchemy import text

class UserRegisterController:
    def __init__(self, user: User, db: Session):
        self.user_data = User(**user.model_dump())
        self.db = db

    def is_valid_email(self, email: str) -> bool:
        regex = r"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
        return re.match(regex, email) is not None

    def encrypt_password(self, password: str) -> bytes:
        salt = bcrypt.gensalt()
        return bcrypt.hashpw(password.encode("utf-8"), salt)

    def run(self):
        if not self.is_valid_email(self.user_data.email):
            raise ValueError("Invalid email format")

        password_hashed_cripted = self.encrypt_password(self.user_data.password_hash)

        query_insert_user = text(
            """
            INSERT INTO users (email, password_hash, created_at, updated_at) 
            VALUES (:email, :password_hash, NOW(), NOW()) 
            RETURNING user_id;
        """
        )

        new_user_data = {"email": self.user_data.email, "password_hash": password_hashed_cripted}

        self.db.execute(query_insert_user, new_user_data).fetchone()[0]

        self.db.commit()

        return JSONResponse(content={"message": "User registered with success"}, status_code=200)
