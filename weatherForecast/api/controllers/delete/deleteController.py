from models.userModel import User
from sqlalchemy.orm import Session
from sqlalchemy import text
from fastapi.responses import JSONResponse
from sqlalchemy.exc import SQLAlchemyError


class UserDeleteController:
    def __init__(self, email: str = None, db: Session = None) -> None:
        self.email = email
        self.db = db

    def run(self):
        try:
            query = text("DELETE FROM users WHERE email = :email")

            result = self.db.execute(query, {"email": self.email})

            self.db.commit()

            if result.rowcount > 0:
                return JSONResponse(
                    content={"message": "User deleted successfully"}, status_code=200
                )
            else:
                return JSONResponse(content={"message": "User not found"}, status_code=404)
        except SQLAlchemyError as e:
            self.db.rollback()
            return JSONResponse(content={"message": str(e)}, status_code=500)
