import os
import dotenv
from fastapi import FastAPI

import routers

# Load environment variables from dotenv file
dotenv.load_dotenv()

app = FastAPI(
    root_path=os.environ.get('BASE_URL', ''),
)

# Register all available routers
app.include_router(routers.functions.acrostic_generator.router)
app.include_router(routers.functions.anime_characterize.router)
app.include_router(routers.functions.interview_simulator.router)
app.include_router(routers.functions.kospi_analyzer.router)
app.include_router(routers.health.router)
app.include_router(routers.home.router)
