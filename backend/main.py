from dotenv import load_dotenv
load_dotenv()

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.routes import eligibility, refinance, chat  # adjust if "backend.routes" is correct

app = FastAPI()

# ✅ CORS setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ Route registration
app.include_router(eligibility.router, prefix="/mortgage")
app.include_router(refinance.router, prefix="/refinance")
app.include_router(chat.router)

@app.get("/")
def root():
    return {"message": "AI Mortgage Advisor is running"}
