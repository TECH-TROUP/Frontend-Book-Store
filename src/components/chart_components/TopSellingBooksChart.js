import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

const TopSellingBooksChart = ({ topSellingBooks }) => {
  const labels = topSellingBooks.map((book) => book.title);
  const data = topSellingBooks.map((book) => book.totalSales);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Total Sales",
        data,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  return <Bar data={chartData} />;
};

export default TopSellingBooksChart;
