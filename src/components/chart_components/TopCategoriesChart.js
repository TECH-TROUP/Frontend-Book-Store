// src/components/TopCategoriesChart.js
import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const TopCategoriesChart = ({ topCategories }) => {
  const data = {
    labels: topCategories.map((category) => category.category_name),
    datasets: [
      {
        data: topCategories.map((category) => category.booksInCategory),
        backgroundColor: topCategories.map(
          (_, index) => `hsl(${(index * 360) / topCategories.length}, 70%, 70%)`
        ),
        hoverBackgroundColor: topCategories.map(
          (_, index) => `hsl(${(index * 360) / topCategories.length}, 70%, 50%)`
        ),
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
            return `${tooltipItem.label}: ${tooltipItem.raw} books`;
          },
        },
      },
    },
  };

  return (
    <div className="bg-white rounded-lg p-4 text-black w-full max-w-md mx-auto">
      <h3 className="text-xl font-semibold mb-4">Top Categories</h3>
      <div className="relative h-64 flex justify-center">
        <Pie data={data} options={options} />
      </div>
    </div>
  );
};

export default TopCategoriesChart;
