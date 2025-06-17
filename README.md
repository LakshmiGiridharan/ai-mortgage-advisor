📝 Overview
- AI Mortgage Advisor is a full-stack AI-driven platform designed to assist first-time homebuyers and existing homeowners in evaluating mortgage loan eligibility and refinancing opportunities. By combining machine learning models with GPT-based natural language support, this platform simplifies complex financial decisions through personalized insights, predictions, and real-time explanations.

- Built using Scikit-learn, FastAPI, React, and OpenAI GPT-4, the platform includes an animated frontend, a robust backend, ML pipelines, a PDF report generator, and cloud deployment on AWS EC2.

❗ Problem Statement
- Many individuals—especially first-time buyers—struggle to understand if they qualify for a mortgage loan or whether refinancing their existing mortgage would be beneficial. Traditional tools are often generic, lack transparency, or don’t cater to individual financial scenarios. This can lead to poor decision-making, loan rejections, or missed refinancing opportunities.

🎯 Why This Problem?
- While researching housing finance options during my academic tenure, I encountered a recurring gap: most online mortgage tools were either static calculators or required users to interpret jargon-filled reports. There was no smart system that could provide eligibility advice, explain decisions conversationally, and project refinancing savings all in one place.

- This inspired me to build AI Mortgage Advisor—a system that combines structured data (ML) and unstructured interaction (GPT) to offer intelligent, accessible, and transparent mortgage assistance.

💡 Proposed Solution
- The platform offers the following capabilities:

✅ Eligibility Prediction (Classification)
- A trained ML model determines if a user is likely to qualify for a mortgage based on input parameters like credit score, loan type, term, and income profile.

✅ Refinance Savings Prediction (Regression)
- A regression model calculates the potential monthly and total savings if the user refinances based on their current vs. market terms.

✅ AI Chat Assistant (GPT-4)
A conversational assistant answers user questions like:

- “Why did I get rejected?”

- “What is an FHA loan?”

- “How much can I afford with a $70K salary?”

✅ Animated Multi-Step Frontend
Built in React, the frontend guides users through:

- House type and loan term selection

- Credit score and loan type entry

- Income and monthly expense fields

Final results with visualizations

✅ Downloadable Reports
- Using ReportLab and Matplotlib, eligibility and savings results are exported as branded PDF reports, complete with approval status and visual charts.

✅ Cloud Hosting
- Deployed on AWS EC2, the application supports global access with persistent backend storage and real-time availability.

🏗️ Architecture & Key Features
```
React Frontend → FastAPI Backend → ML Models + GPT → Result + PDF Export
       │                 │
       ▼                 ▼
Animated UI        Classifier & Regressor Models
                   GPT Chat Assistant
                   PDF Generator
                   AWS EC2 Deployment
```

Key Functional Modules:
🔹 ML Model Training: mortgage_classifier.py and refinance_regressor.py

🔹 GPT Integration: chatbot_controller.py via OpenAI API

🔹 Backend API: FastAPI routes under routes/eligibility.py, routes/refinance.py

🔹 PDF Export: report_generator.py using ReportLab and Matplotlib

🔹 Frontend Flow: EligibilityForm.jsx, ResultPage.jsx, ChatWidget.jsx

🛠 Tech Stack
```
Tools & Frameworks
Frontend    React.js, Bootstrap, HTML/CSS, React Router, Axios
Backend     FastAPI, Python, Uvicorn
ML Models   Scikit-learn (Logistic Regression, Linear Regression), pandas, NumPy
NLP         OpenAI GPT-4 API
Reporting   ReportLab, Matplotlib
Cloud       AWS EC2 (Ubuntu), GitHub Actions (for future CI/CD setup)
Others      dotenv, Pydantic, CORS middleware
```
⚙️ Setup Instructions
✅ Prerequisites
- Python 3.8+

- Node.js 14+

- OpenAI API Key

- AWS EC2 or local development environment

🚀 Frontend Setup
```
cd frontend
npm install
npm start
```

The app runs at http://localhost:3000. The frontend includes the animated forms, chatbot widget, and result visualizations.

🧠 Backend Setup
```
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

The FastAPI backend will be hosted at http://localhost:8000. Test endpoints using Swagger at http://localhost:8000/docs.

🧪 ML Model Setup
Ensure you’ve trained and saved your models:
```
models/
  ├── classifier_model.pkl
  └── regressor_model.pkl
```
If needed, run the scripts in the ml/ directory to retrain.

☁️ Deploy to AWS EC2
- Launch an EC2 instance (Ubuntu)

- Clone this repo

- Set up backend with Gunicorn or Uvicorn + Nginx

- Use pm2 or systemd to run the frontend and backend services

- Configure environment variables for OpenAI and AWS if needed

🔭 Future Enhancements
📄 OCR-based Document Parsing
- Allow users to upload pay stubs or W2s for auto-filled mortgage forms using Tesseract or Amazon Textract.

📈 Real-Time Market Data Integration
- Fetch live interest rates and mortgage conditions from public APIs (e.g., Freddie Mac, Zillow) to improve prediction accuracy.

📲 SMS/Email Notifications
- Notify users of approval status, refinance opportunities, or changes in mortgage rates.

🧠 Self-Learning Model Updates
Enable feedback loops to retrain ML models based on user interaction and 
