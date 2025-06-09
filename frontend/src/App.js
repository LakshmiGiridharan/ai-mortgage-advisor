import React from "react";
import EligibilityForm from "./components/EligibilityForm";
import RefinanceCalculator from "./components/RefinanceCalculator";
import ChatWidget from "./components/ChatWidget"; // ✅ floating bot

import './components/chatbot.css';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-4xl mx-auto grid gap-10">
        <EligibilityForm />
        <RefinanceCalculator />
        {/* ❌ Removed direct <ChatBot /> */}
      </div>

      {/* ✅ Floating ChatBot */}
      <ChatWidget />
    </div>
  );
}

export default App;
