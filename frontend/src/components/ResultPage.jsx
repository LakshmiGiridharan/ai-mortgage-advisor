import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import EligibilityChart from "./EligibilityChart";

const ResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    eligible,
    eligibleAmount,
    requestedAmount,
    creditScore,
    loanType,
    loanTerm,
    name,
    reasons = []
  } = location.state || {};

  const handleDownloadReport = async () => {
    const reportData = {
      name: name || "Anonymous",
      eligible,
      eligibleAmount,
      requestedAmount,
      creditScore,
      loanType,
      loanTerm,
      reasons
    };

    try {
      const res = await fetch("http://localhost:8000/mortgage/download-report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reportData)
      });

      if (!res.ok) throw new Error("Failed to download report");

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "eligibility_report.pdf";
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download error:", error);
    }
  };

  return (
    <div className="p-8 bg-white bg-opacity-90 rounded-lg shadow-xl max-w-3xl mx-auto mt-10">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4 text-blue-700">🎯 Eligibility Result</h2>

        {eligible ? (
          <p className="text-green-700 text-lg">
            ✅ You are eligible for the loan!
            <br />
            <span className="font-semibold">
              Approved Loan Amount: ${eligibleAmount?.toLocaleString()}
            </span>
          </p>
        ) : (
          <>
            <p className="text-red-600 text-lg font-medium">
              ❌ You are not eligible currently.
            </p>
            <p className="text-gray-700 mt-1">
              But based on your profile, you may qualify for up to: <br />
              <span className="text-black font-semibold text-xl">
                ${eligibleAmount?.toLocaleString()}
              </span>
            </p>

            {reasons.length > 0 && (
              <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded mt-4 text-left">
                <h3 className="font-semibold text-red-700 mb-2">
                  Reason(s) for denial:
                </h3>
                <ul className="list-disc list-inside text-sm text-red-600">
                  {reasons.map((reason, idx) => (
                    <li key={idx}>{reason}</li>
                  ))}
                </ul>
              </div>
            )}
          </>
        )}
      </div>

      <div className="mt-6">
        <EligibilityChart
          eligibleAmount={eligibleAmount}
          requestedAmount={requestedAmount}
        />
      </div>

      {!eligible && (
        <>
          <p className="text-sm mt-6 text-center text-gray-600">
            🧠 Want to understand why you're not eligible?{" "}
            <button
              className="text-blue-600 underline"
              onClick={() => document.querySelector(".chat-toggle")?.click()}
            >
              Chat with AJ now
            </button>
          </p>

          <div className="flex justify-center mt-4">
            <button
              onClick={handleDownloadReport}
              className="bg-purple-600 text-white px-6 py-2 rounded shadow hover:bg-purple-700 transition"
            >
              📄 Download Eligibility Report
            </button>
          </div>
        </>
      )}

      <div className="flex justify-center mt-8">
        <button
          onClick={() => navigate("/")}
          className="bg-blue-600 hover:bg-purple-700 text-white px-6 py-2 rounded transition"
        >
          🔙 Go back to Home
        </button>
      </div>
    </div>
  );
};

export default ResultPage;
