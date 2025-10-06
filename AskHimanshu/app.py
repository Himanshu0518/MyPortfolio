from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from router.bot_route import router
from contextlib import asynccontextmanager
from utils.utils import clear_old_checkpoints
import asyncio


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Run cleanup on startup
    print("Starting up... Running checkpoint cleanup")
    await asyncio.to_thread(clear_old_checkpoints) 
    
    yield
    
    print("Shutting down...")


app = FastAPI(lifespan=lifespan)

app.include_router(router)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)