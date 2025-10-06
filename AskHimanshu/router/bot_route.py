from fastapi import APIRouter
from fastapi.responses import StreamingResponse
from workflow.graph import run_workflow_stream
from schemas.schema import BotRequest
import json
import sqlite3
import os 

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DB_PATH = os.path.join(BASE_DIR, "checkpoint.sqlite")



router = APIRouter(
    prefix="/api",
    tags=["api"],
    responses={404: {"description": "Not found"}},
)



@router.get("/")
async def root():
    return {"message": "Hello World"}

@router.post("/AskHimanshu")
async def ask_himanshu(request: BotRequest):
    """Streaming endpoint for chatbot responses"""
    print(DB_PATH)
    try:
        async def generate():
            async for chunk in run_workflow_stream(user_input=request.message, id=request.id):
                # Send each chunk as Server-Sent Events format
                if chunk:
                    yield f"data: {json.dumps({'content': chunk})}\n\n"
            
            # Send end signal
            yield f"data: {json.dumps({'done': True})}\n\n"
        
        return StreamingResponse(
            generate(),
            media_type="text/event-stream",
            headers={
                "Cache-Control": "no-cache",
                "Connection": "keep-alive",
                "X-Accel-Buffering": "no"  # Disable buffering for nginx
            }
        )
    except Exception as e:
        return {"error": str(e)}
    