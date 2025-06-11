import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import EligibilityChart from "./EligibilityChart";

const EligibilityForm = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    houseType: "",
    loanTerm: 15,
    creditScore: "",
    loanAmount: "",
    loanType: ""
  });
  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSliderChange = (e) => {
    setFormData((prev) => ({ ...prev, loanTerm: parseInt(e.target.value) }));
  };

  const handleSubmit = async () => {
    const payload = {
      house_type: formData.houseType,
      loan_term: formData.loanTerm,
      credit_score: parseInt(formData.creditScore),
      loan_amount: parseFloat(formData.loanAmount),
      loan_type: formData.loanType
    };

    try {
      const res = await fetch("http://127.0.0.1:8000/mortgage/check-eligibility", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      setResult(data);
    } catch (error) {
      console.error("Error checking eligibility:", error);
    }
  };

  return (
    <div className="space-y-6 text-left">
      {step === 1 && (
        <div>
          <label className="block font-semibold">Select the type of house:</label>
          <select
            name="houseType"
            value={formData.houseType}
            onChange={handleChange}
            className="w-full p-2 mt-1 border rounded"
          >
            <option value="">-- Choose --</option>
            <option value="Single Family">Single Family</option>
            <option value="Townhouse">Townhouse</option>
            <option value="Condo">Condo</option>
            <option value="Multi-family">Multi-family</option>
          </select>
        </div>
      )}

      {step === 2 && (
        <div>
          <label className="block font-semibold">Select loan term (1–30 years):</label>
          <input
            type="range"
            min="1"
            max="30"
            value={formData.loanTerm}
            onChange={handleSliderChange}
            className="w-full"
          />
          <p className="mt-2">Selected: {formData.loanTerm} years</p>
        </div>
      )}

      {step === 3 && (
        <div>
          <label className="block font-semibold">Enter your credit score:</label>
          <input
            type="number"
            name="creditScore"
            value={formData.creditScore}
            onChange={handleChange}
            className="w-full p-2 mt-1 border rounded"
          />
        </div>
      )}

      {step === 4 && (
        <>
          <div>
            <label className="block font-semibold">Enter loan amount:</label>
            <input
              type="number"
              name="loanAmount"
              value={formData.loanAmount}
              onChange={handleChange}
              className="w-full p-2 mt-1 border rounded"
            />
          </div>
          <div className="mt-4">
            <label className="block font-semibold">Select loan type:</label>
            <select
              name="loanType"
              value={formData.loanType}
              onChange={handleChange}
              className="w-full p-2 mt-1 border rounded"
            >
              <option value="">-- Choose --</option>
              <option value="Conventional">Conventional</option>
              <option value="FHA">FHA</option>
              <option value="VA">VA</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </>
      )}

      <div className="mt-4 flex justify-between">
        {step > 1 && (
          <button
            className="px-4 py-2 bg-gray-400 text-white rounded"
            onClick={() => setStep((prev) => prev - 1)}
          >
            Back
          </button>
        )}
        {step < 4 && (
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded"
            onClick={() => setStep((prev) => prev + 1)}
          >
            Next
          </button>
        )}
        {step === 4 && (
          <button
            className="px-4 py-2 bg-green-600 text-white rounded"
            onClick={handleSubmit}
          >
            Show my eligibility
          </button>
        )}
      </div>
      {result && (
  <>
    <div className="mt-6 p-4 bg-gray-100 rounded text-center shadow">
      <h2 className="font-bold text-xl text-blue-800 mb-2">🎯 Eligibility Result</h2>
      {result.eligible ? (
        <p className="text-green-700 text-lg">
          ✅ You are eligible for the loan!<br />
          <span className="font-semibold">Approved Loan Amount:</span> ${parseInt(result.eligibleAmount).toLocaleString()}
        </p>
      ) : (
        <p className="text-red-700 text-lg">
          ❌ You are not eligible currently.<br />
          But based on your profile, you may qualify for up to: <br />
          <span className="font-semibold text-black">
            ${parseInt(result.eligibleAmount || 0).toLocaleString()}
          </span>
        </p>
      )}
    </div>

    {!result.eligible && (
      <div className="mt-6">
        <EligibilityChart
          eligibleAmount={result.eligibleAmount}
          requestedAmount={formData.loanAmount}
        />

        <p className="text-sm mt-4 text-center">
          🤖 Want to understand why you're not eligible?{" "}
          <button
            className="text-blue-600 underline"
            onClick={() => document.querySelector(".chat-toggle")?.click()}
          >
            Chat with AJ now
          </button>
        </p>

        <div className="flex justify-center mt-4">
          <button
            className="bg-purple-600 text-white px-4 py-2 rounded shadow hover:bg-purple-700"
            onClick={() => window.print()}
          >
            📄 Download Eligibility Report
          </button>
        </div>
      </div>
    )}
  </>
)}  
</div> // Final outer container
);
};

export default EligibilityForm;


