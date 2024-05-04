from fastapi import FastAPI
import os
from fastapi.middleware.cors import CORSMiddleware

from routes.userRoutes import UserRouter

app = FastAPI(title="WeatherForecast", version="1.0.0")

app.include_router(UserRouter.register_routes(), prefix="/user")


@app.get("/")
async def root():
    return {"message": "WeatherForecast API"}


# uvicorn api:app --reload
