import { useState } from "react";
import axios from "axios";

export default function RefinanceCalculator() {
  const [form, setForm] = useState({
    current_rate: "",
    new_rate: "",
    remaining_years: "",
    principal: "",
  });

  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:8000/refinance/predict-savings", {
        ...form,
        current_rate: parseFloat(form.current_rate),
        new_rate: parseFloat(form.new_rate),
        remaining_years: parseInt(form.remaining_years),
        principal: parseFloat(form.principal),
      });
      setResult(response.data.estimated_monthly_savings);
    } catch (err) {
      console.error("API error:", err);
      setResult("error");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-md space-y-4">
      <h2 className="text-2xl font-bold text-center">Refinance Savings Calculator</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        {["current_rate", "new_rate", "remaining_years", "principal"].map((field) => (
          <input
            key={field}
            name={field}
            placeholder={field.replace("_", " ").toUpperCase()}
            value={form[field]}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        ))}
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Calculate Savings
        </button>
      </form>

      {typeof result === "number" && (
        <div className="text-green-700 font-semibold text-center">
          💰 Estimated Monthly Savings: ${result}
        </div>
      )}
      {result === "error" && (
        <div className="text-red-600 font-semibold text-center">
          ⚠️ Could not calculate. Please check your inputs.
        </div>
      )}
    </div>
  );
}
