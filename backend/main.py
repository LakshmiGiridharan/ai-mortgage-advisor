from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.routes import eligibility, refinance  # adjust if needed

app = FastAPI()

# ✅ CORS setup (must come BEFORE include_router)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # or ["*"] for dev
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(eligibility.router, prefix="/mortgage")
app.include_router(refinance.router, prefix="/refinance")

@app.get("/")
def root():
    return {"message": "AI Mortgage Advisor is running"}
