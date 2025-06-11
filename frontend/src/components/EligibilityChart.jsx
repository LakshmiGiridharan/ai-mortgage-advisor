import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const EligibilityChart = ({ eligibleAmount, requestedAmount }) => {
  const data = {
    labels: ["Eligible Amount", "Remaining"],
    datasets: [
      {
        label: "Eligibility",
        data: [eligibleAmount, requestedAmount - eligibleAmount],
        backgroundColor: ["#4caf50", "#f44336"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="max-w-xs mx-auto mt-6">
      <Pie data={data} />
    </div>
  );
};

export default EligibilityChart;
