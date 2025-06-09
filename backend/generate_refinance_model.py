import joblib
import numpy as np
from sklearn.linear_model import LinearRegression
import os

# Dummy training data
X = np.array([
    [4.5, 3.0, 15, 200000],
    [5.0, 3.5, 20, 250000],
    [6.0, 4.0, 30, 300000],
    [7.0, 5.0, 25, 350000],
])
y = np.array([
    200, 180, 250, 300
])

model = LinearRegression()
model.fit(X, y)

model_dir = os.path.join("backend", "models")
os.makedirs(model_dir, exist_ok=True)

model_path = os.path.join(model_dir, "refinance_model.pkl")
joblib.dump(model, model_path)

print(f"✅ Refinance model saved to {model_path}")
