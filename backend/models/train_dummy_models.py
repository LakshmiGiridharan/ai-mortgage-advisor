import joblib
from sklearn.linear_model import LogisticRegression, LinearRegression
import numpy as np

# Dummy data
X_cls = np.random.rand(100, 4)
y_cls = np.random.randint(0, 2, 100)
clf = LogisticRegression().fit(X_cls, y_cls)
joblib.dump(clf, "eligibility_model.pkl")

X_reg = np.random.rand(100, 4)
y_reg = np.random.rand(100) * 500
reg = LinearRegression().fit(X_reg, y_reg)
joblib.dump(reg, "refinance_model.pkl")
