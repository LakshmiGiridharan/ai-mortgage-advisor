from fastapi import APIRouter
from pydantic import BaseModel
import joblib
import os
import numpy as np

router = APIRouter()

# Load trained logistic regression model
model_path = os.path.join(os.path.dirname(__file__), "../models/eligibility_model.pkl")
model = joblib.load(model_path)

class EligibilityRequest(BaseModel):
    house_type: str
    loan_term: int
    loan_amount: float
    loan_type: str
    credit_score: int

def encode_features(data: EligibilityRequest):
    # Example encoding — adapt to match how your model was trained
    # Encode loan_type (Conventional, FHA, VA)
    loan_types = ['conventional', 'fha', 'va']
    loan_encoding = [int(data.loan_type.lower() == t) for t in loan_types]

    # Basic numerical fields
    features = [
        data.credit_score,
        data.loan_term,
        data.loan_amount,
        *loan_encoding  # Adds 3 binary columns
    ]
    return np.array(features).reshape(1, -1)

@router.post("/check-eligibility")
async def check_eligibility(data: EligibilityRequest):
    eligible = data.credit_score >= 650 and data.loan_amount <= 500000
    eligible_amount = 0

    if eligible:
        eligible_amount = data.loan_amount
    else:
        # Optional logic to calculate eligibility dynamically
        eligible_amount = min(data.loan_amount * 0.8, 300000)

    return {
        "eligible": eligible,
        "eligibleAmount": round(eligible_amount, 2)  # <-- Ensure key matches frontend
    }
