from fastapi import APIRouter
from workflow.graph import run_workflow
from schemas.schema import BotRequest

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
    try:
        response = run_workflow(user_input=request.message, id=request.id)
        # Get last assistant message
        return response["messages"][-1].content
    except Exception as e:
        return {"error": str(e)}
