// src/components/BookStatsChart.js
import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BookStatsChart = ({ bookStats }) => {
  const data = {
    labels: [
      "Total Books",
      "Pending Approval",
      "Approved Books",
      "Rejected Books",
      "Out of Stock",
    ],
    datasets: [
      {
        label: "Book Stats",
        data: [
          bookStats.totalBooks,
          bookStats.pendingApprovalBooks,
          bookStats.approvedBooks,
          bookStats.rejectedBooks,
          bookStats.outOfStockBooks,
        ],
        backgroundColor: [
          "rgba(75, 192, 192, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 99, 132, 0.2)",
          "rgba(153, 102, 255, 0.2)",
        ],
        borderColor: [
          "rgba(75, 192, 192, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.label}: ${tooltipItem.raw}`;
          },
        },
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="bg-white rounded-lg p-4 text-black w-full max-w-md mx-auto">
      <h3 className="text-xl font-semibold mb-4">Book Statistics</h3>
      <div className="relative h-64">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default BookStatsChart;
