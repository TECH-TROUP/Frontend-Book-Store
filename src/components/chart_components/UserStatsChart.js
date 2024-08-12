// src/components/UserStatsChart.js
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

const UserStatsChart = ({ userStats }) => {
  const data = {
    labels: ["Total Users", "Total Admins", "Total Customers", "Total Vendors"],
    datasets: [
      {
        label: "Number of Users",
        data: [
          userStats.totalUsers,
          userStats.totalAdmins,
          userStats.totalCustomers,
          userStats.totalVendors,
        ],
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
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
      <h3 className="text-xl font-semibold mb-4">User Statistics</h3>
      <div className="relative h-64">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default UserStatsChart;
