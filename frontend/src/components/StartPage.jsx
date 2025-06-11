import React from "react";
import { useNavigate } from "react-router-dom";

const StartPage = () => {
  const navigate = useNavigate();

  const handleSelection = (option) => {
    if (option === "eligibility") {
      navigate("/eligibility", { state: { from: "start" } });
    } else if (option === "refinance") {
      navigate("/refinance", { state: { from: "start" } });
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-bold text-gray-800">Welcome to AJ Mortgage Calculator</h1>
      <p className="text-lg text-gray-600">How can we help you today?</p>

      <div className="flex flex-col md:flex-row justify-center gap-6 mt-8">
        <button
          onClick={() => handleSelection("eligibility")}
          className="px-6 py-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded shadow transition-all duration-300"
        >
          🏡 Check My Loan Eligibility
        </button>
        <button
          onClick={() => handleSelection("refinance")}
          className="px-6 py-4 bg-green-500 hover:bg-green-600 text-white font-semibold rounded shadow transition-all duration-300"
        >
          🔁 Refinance My Current Mortgage
        </button>
      </div>
    </div>
  );
};

export default StartPage;
