from fastapi import APIRouter, Request
from pydantic import BaseModel
import openai
import os

router = APIRouter()

openai.api_key = os.getenv("OPENAI_API_KEY")

class ChatInput(BaseModel):
    message: str

@router.post("/chat")
def chat_with_bot(data: ChatInput):
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[{"role": "user", "content": data.message}]
    )
    return {"reply": response.choices[0].message["content"]}
