from fastapi import APIRouter
from pydantic import BaseModel
import joblib
import os

router = APIRouter()

# Load your pre-trained model (ensure the path is correct)
model_path = os.path.join(os.path.dirname(__file__), "../models/eligibility_model.pkl")
model = joblib.load(model_path)

class EligibilityInput(BaseModel):
    income: float
    credit_score: int
    debt: float
    home_price: float
    loan_type: str  # optional use, could be encoded

@router.post("/predict-eligibility")
def predict_eligibility(data: EligibilityInput):
    features = [[data.income, data.credit_score, data.debt, data.home_price]]
    prediction = model.predict(features)[0]
    return {"eligible": bool(prediction)}
