from pydantic import BaseModel

class BotResponse(BaseModel):
    response: str

class BotRequest(BaseModel):
    message: str
    id : str