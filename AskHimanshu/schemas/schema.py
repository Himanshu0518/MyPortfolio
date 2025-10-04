from pydantic import BaseModel,Field
from typing import Annotated 

class BotResponse(BaseModel):
   response: Annotated[str, Field(min_length=1, max_length=100 ,description="The response to the user's message must be less than or equal to 100 words")]


class BotRequest(BaseModel):
    message: str
    id : str