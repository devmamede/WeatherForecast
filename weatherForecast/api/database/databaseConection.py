from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, scoped_session, Session
import os

DATABASE_URI = os.getenv("DATABASE_URI")
engine = create_engine(DATABASE_URI)
SessionLocal = scoped_session(sessionmaker(bind=engine, expire_on_commit=False))


def database_session() -> Session:
    return SessionLocal()
