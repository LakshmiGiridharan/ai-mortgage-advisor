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
    reasons = []

    # Real-time rule-based evaluation
    if eligible:
        eligible_amount = data.loan_amount
    else:
        # Compute fallback eligible amount
        eligible_amount = min(data.loan_amount * 0.8, 300000)

        # Real-time ineligibility reasons
        if data.credit_score < 650:
            reasons.append(f"Your credit score of {data.credit_score} is below the required 650.")
        if data.loan_amount > 500000:
            reasons.append(f"Requested loan amount ${data.loan_amount:,.2f} exceeds the $500,000 limit.")
        if data.loan_term > 30:
            reasons.append("Loan term exceeds the maximum allowable duration of 30 years.")
        if not data.loan_type.lower() in ['conventional', 'fha', 'va']:
            reasons.append(f"Loan type '{data.loan_type}' is not currently supported.")
        if not reasons:
            reasons.append("Your profile does not meet our eligibility criteria at this time.")

    return {
        "eligible": eligible,
        "eligibleAmount": round(eligible_amount, 2),
        "reasons": reasons
    }

