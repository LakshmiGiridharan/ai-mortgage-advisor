import React from 'react';
import { useNavigate } from 'react-router-dom';

function InitialChoice() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-blue-50 text-center">
      <h2 className="text-3xl font-bold mb-6">Welcome to AJ Mortgage Calculator</h2>
      <p className="mb-4 text-lg">Why are you here today?</p>
      <div className="space-x-4">
        <button onClick={() => navigate('/mortgage')} className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-md">
          Eligibility Check
        </button>
        <button onClick={() => navigate('/refinance')} className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-md">
          Refinance Options
        </button>
      </div>
    </div>
  );
}

export default InitialChoice;
