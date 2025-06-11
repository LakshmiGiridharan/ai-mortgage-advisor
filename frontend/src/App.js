import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StartPage from "./components/StartPage";
import EligibilityForm from "./components/EligibilityForm";
import RefinanceCalculator from "./components/RefinanceCalculator";
import ChatWidget from "./components/ChatWidget";
import ResultPage from "./components/ResultPage";
import "./index.css";

function App() {
  return (
    <Router>
      <div
        className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100 text-gray-800 font-sans"
        style={{ backgroundImage: "url('/bg.jpg')" }}
      >
        <div className="bg-white bg-opacity-80 min-h-screen py-10 px-4">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <Routes>
              <Route path="/" element={<StartPage />} />
              <Route path="/eligibility" element={<EligibilityForm />} />
              <Route path="/refinance" element={<RefinanceCalculator />} />
              <Route path="/result" element={<ResultPage />} />
            </Routes>
          </div>
          <ChatWidget />
        </div>
      </div>
    </Router>
  );
}

export default App;
