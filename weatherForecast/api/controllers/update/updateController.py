from sqlalchemy.orm import Session
from sqlalchemy import text
from fastapi.responses import JSONResponse
from sqlalchemy.exc import SQLAlchemyError
import re
from models.updateUserModel import UserUpdateRequest


class UserUpdateController:
    def __init__(self, update_data: UserUpdateRequest, db: Session = None) -> None:
        self.old_email = update_data.old_email
        self.new_email = update_data.new_email
        self.db = db

    def run(self):

        regex = r"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
        is_valid = re.match(regex, self.new_email) is not None
        if not is_valid:
            return JSONResponse(content={"message": "Invalid email format"}, status_code=400)

        try:
            query = text("UPDATE users SET email = :new_email WHERE email = :old_email")

            result = self.db.execute(
                query, {"old_email": self.old_email, "new_email": self.new_email}
            )

            self.db.commit()

            if result.rowcount > 0:
                return JSONResponse(
                    content={"message": "Email updated successfully"}, status_code=200
                )
            else:
                return JSONResponse(content={"message": "User not found"}, status_code=404)
        except SQLAlchemyError as e:
            self.db.rollback()
            return JSONResponse(content={"message": str(e)}, status_code=500)
