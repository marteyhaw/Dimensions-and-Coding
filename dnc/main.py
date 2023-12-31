from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import maps, characters, questions, shops, inventories, quests
import os

app = FastAPI()
app.include_router(maps.router)
app.include_router(characters.router)
app.include_router(questions.router)
app.include_router(shops.router)
app.include_router(inventories.router)
app.include_router(quests.router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[os.environ.get("CORS_HOST", "http://localhost:3000")],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/launch-details")
def launch_details():
    return {
        "launch_details": {
            "year": 2022,
            "month": 12,
            "day": "9",
            "hour": 19,
            "min": 0,
            "tz:": "PST",
        }
    }
