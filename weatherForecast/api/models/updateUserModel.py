from pydantic import BaseModel, EmailStr


class UserUpdateRequest(BaseModel):
    new_email: EmailStr
    old_email: EmailStr
