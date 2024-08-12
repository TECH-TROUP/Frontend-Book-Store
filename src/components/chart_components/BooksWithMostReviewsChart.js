// src/components/BooksWithMostReviewsChart.js
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

const BooksWithMostReviewsChart = ({ booksWithMostReviews }) => {
  const data = {
    labels: booksWithMostReviews.map((book) => book.title),
    datasets: [
      {
        label: "Number of Reviews",
        data: booksWithMostReviews.map((book) => book.reviewCount),
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
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
    <div className="bg-white rounded-lg p-4 text-black w-full">
      <h3 className="text-xl font-semibold mb-4">Books with Most Reviews</h3>
      <div className="relative h-64">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default BooksWithMostReviewsChart;
