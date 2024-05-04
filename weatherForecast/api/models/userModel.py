from pydantic import BaseModel, Field
from datetime import datetime


class User(BaseModel):
    email: str
    password_hash: str
    created_at: datetime = Field(default_factory=datetime.now)
    updated_at: datetime = Field(default_factory=datetime.now)
