import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function ResultPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { eligible, eligibleAmount } = location.state || {};

  return (
    <div className="p-8 bg-white bg-opacity-90 rounded-lg shadow-xl">
      <h2 className={`text-3xl font-bold mb-4 ${eligible ? "text-green-600" : "text-red-600"}`}>
        {eligible
          ? "✅ Congratulations! You're eligible."
          : "❌ You are not eligible currently"}
      </h2>

      {!eligible && (
        <div className="text-gray-700 text-lg mt-2 mb-6">
          But based on your profile, you may qualify for up to{" "}
          <span className="text-blue-700 font-semibold">
            ${eligibleAmount ? eligibleAmount.toLocaleString() : "an estimated amount"}.
          </span>

          <p className="text-sm mt-4">
            🤖 Want to understand why you're not eligible?{" "}
            <button
              className="text-blue-600 underline"
              onClick={() => {
                document.querySelector(".chat-toggle")?.click(); // Opens chatbot
              }}
            >
              Chat with AJ now
            </button>
          </p>
        </div>
      )}

      <button
        className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded transition duration-200"
        onClick={() => navigate("/")}
      >
        Go back to Home
      </button>

      {eligible && (
        <p className="mt-10 text-sm text-gray-600 text-center italic">
          💬 Want to explore refinancing or learn more? Chat with AJ – your mortgage assistant in the bottom right corner!
        </p>
      )}
    </div>
  );
}

export default ResultPage;
