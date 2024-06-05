import os
import dotenv
from fastapi import FastAPI, Path, Query
from routers import trial
from pydantic import BaseModel
from enum import Enum
from fastapi import Path

class LawyerSpeech(BaseModel):
    text: str

    class Config:
        schema_extra = {
            "example": {
                "text": "Your example lawyer speech text goes here."
            }
        }

# Load environment variables from dotenv file
dotenv.load_dotenv()

app = FastAPI(
    root_path=os.environ.get('BASE_URL', ''),
)

# Register all available routers
# app.include_router(routers.functions.acrostic_generator.router)
# app.include_router(routers.functions.anime_characterize.router)
# app.include_router(routers.functions.interview_simulator.router)
# app.include_router(routers.functions.kospi_analyzer.router)
# app.include_router(routers.health.router)

@app.get('/')
async def get_root():
    return {
        'name': 'MobileX-Experience-Lab-Backend',
    }


@app.post("/init")
async def get_initial_story():
    return trial.initialize_game()

@app.get("/trial/{trial_id}")
async def get_trial(trial_id: str):
    return trial.get_trial(trial_id)

@app.post("/prosecutor/{trial_id}")
async def generate_prosecutor_speech(trial_id: str):
    return trial.generate_prosecutor(trial_id)


@app.post("/judge/{trial_id}")
async def generate_judge_speech(trial_id: str):
    return trial.generate_judge(trial_id)

class Action(str, Enum):
    이의있음 = "이의있음"
    받아랏 = "받아랏"

@app.post("/lawyer/{trial_id}")
async def generate_lawyer_speech(
    trial_id: str = Path(..., title="Trial ID", description="ID of the trial"),
    action: Action = Query(..., title="Action", description="Action to be performed by the lawyer"),
):
    return trial.generate_lawyer(trial_id, action)

@app.post("/lawyer/manual/{trial_id}")
async def post_lawyer_speech(trial_id: str, body: LawyerSpeech):
    text = body.get('text')
    return trial.post_lawyer_script(trial_id, text)

