from fastapi import APIRouter
from pydantic import BaseModel
import joblib
import os

router = APIRouter()

model_path = os.path.join(os.path.dirname(__file__), "../models/refinance_model.pkl")
model = joblib.load(model_path)

class RefinanceInput(BaseModel):
    current_rate: float
    new_rate: float
    remaining_years: int
    principal: float

@router.post("/predict-savings")
def predict_refinance(data: RefinanceInput):
    features = [[data.current_rate, data.new_rate, data.remaining_years, data.principal]]
    prediction = model.predict(features)[0]
    return {"estimated_monthly_savings": round(prediction, 2)}
