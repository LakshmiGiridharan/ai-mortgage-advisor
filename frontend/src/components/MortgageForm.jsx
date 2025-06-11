import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function MortgageForm() {
  const navigate = useNavigate();
  const [houseType, setHouseType] = useState('');
  const [loanTerm, setLoanTerm] = useState(15);

  const handleSubmit = () => {
    navigate('/result', { state: { houseType, loanTerm } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-white flex flex-col items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full space-y-6">
        <h2 className="text-2xl font-semibold text-center">Mortgage Eligibility Form</h2>

        <div>
          <label className="block mb-1 font-medium">Type of House</label>
          <select
            value={houseType}
            onChange={(e) => setHouseType(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="">-- Select --</option>
            <option value="apartment">Apartment</option>
            <option value="villa">Villa</option>
            <option value="condo">Condominium</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">Loan Term (Years): {loanTerm}</label>
          <input
            type="range"
            min="1"
            max="30"
            value={loanTerm}
            onChange={(e) => setLoanTerm(e.target.value)}
            className="w-full"
          />
        </div>

        <div className="text-center mt-6 animate-bounce">
          <button
            className="bg-purple-600 text-white px-6 py-3 rounded shadow-lg hover:bg-purple-700 transition-all"
            onClick={handleSubmit}
          >
            🎯 Calculate Your New Payment
          </button>
        </div>
      </div>
    </div>
  );
}

export default MortgageForm;
