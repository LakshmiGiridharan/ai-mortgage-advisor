import { useState } from "react";
import axios from "axios";

export default function EligibilityForm() {
  const [form, setForm] = useState({
    income: "",
    credit_score: "",
    debt: "",
    home_price: "",
    loan_type: "conventional",
  });

  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:8000/mortgage/predict-eligibility", {
        ...form,
        income: parseFloat(form.income),
        credit_score: parseInt(form.credit_score),
        debt: parseFloat(form.debt),
        home_price: parseFloat(form.home_price),
      });
      setResult(response.data.eligible);
    } catch (err) {
      console.error("Error calling API:", err);
      setResult("error");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-md space-y-4">
      <h2 className="text-2xl font-bold text-center">Mortgage Eligibility</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        {["income", "credit_score", "debt", "home_price"].map((field) => (
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
        <select
          name="loan_type"
          value={form.loan_type}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
        >
          <option value="conventional">Conventional</option>
          <option value="fha">FHA</option>
          <option value="va">VA</option>
        </select>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Check Eligibility
        </button>
      </form>

      {result === true && (
        <div className="text-green-600 font-semibold text-center">✅ You are eligible!</div>
      )}
      {result === false && (
        <div className="text-red-600 font-semibold text-center">❌ You are not eligible.</div>
      )}
      {result === "error" && (
        <div className="text-yellow-600 font-semibold text-center">⚠️ Failed to check eligibility.</div>
      )}
    </div>
  );
}
