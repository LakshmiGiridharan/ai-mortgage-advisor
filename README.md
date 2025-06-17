# AI Mortgage Advisor

📝 Overview
An end-to-end AI-powered mortgage assistant that helps first-time buyers and homeowners understand loan eligibility and refinancing options using ML models, LLMs, and cloud deployment.

❗ Problem Statement
Many people are unsure about their mortgage eligibility or whether refinancing can save them money. Existing tools are either too complex or not personalized enough.

🎯 Why This Problem?
While exploring mortgage tools for personal use, I noticed the lack of smart systems that personalize advice in real-time. This sparked the idea of an assistant that combines ML predictions and GPT to simplify decisions.

💡 Proposed Solution
Mortgage approval prediction using classification model

- Refinance savings prediction using regression model

- GPT-based assistant to answer contextual mortgage questions

- Frontend with animated, multi-step eligibility forms

- Exportable eligibility reports as PDFs

🏗️ Architecture / Features
- Scikit-learn for training ML models

- FastAPI backend for API integration

- OpenAI GPT-4 integration

- React frontend with chatbot and form wizard

- ReportLab & Matplotlib for PDF generation

- Hosted on AWS EC2

🛠 Tech Stack
React · FastAPI · OpenAI GPT-4 · Scikit-learn · ReportLab · AWS EC2 · Matplotlib · Python

⚙️ Setup Instructions
bash
Copy
Edit
# Frontend
```
cd frontend
npm install
npm start
```


# Backend
```
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

# ML Models
Ensure models are pre-trained and saved in `models/` directory

# Deploy
Launch backend on AWS EC2 instance
🔭 Future Enhancements
OCR-based document parsing (bank statements, pay stubs)

Integration with real-time interest rate APIs

SMS/email notifications on refinancing alerts
