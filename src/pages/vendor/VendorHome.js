import axios from "axios";
import React, { useEffect, useState } from "react";
import authService from "../../authentication/authService";
import { icons } from "../../assets/icons/IconData";
import TopCategoriesChart from "../../components/chart_components/TopCategoriesChart";
import TopSellingBooksChart from "../../components/chart_components/TopSellingBooksChart";

export default function VendorHome() {
  const [data, setData] = useState({
    booksStats: {},
    salesStats: {},
    wishlistStats: {},
    averageRating: null,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/vendor/dashboard`,
          authService.getAuthHeader()
        );
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchData();
  }, []);

  return loading ? (
    <div>{icons.loading}</div>
  ) : (
    <div className="flex flex-col h-[calc(100vh-140px)] p-4 space-y-4 text-black flex-1 overflow-y-auto">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Average Rating</h2>
        <p className="text-2xl font-bold">{data.averageRating.toFixed(2)}</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-lg flex">
        <div className="flex-1">
          <h2 className="text-2xl font-semibold mb-4">Book Statistics</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-blue-100 rounded-lg shadow-sm">
              <h3 className="text-xl font-medium">Total Books</h3>
              <p className="text-2xl font-bold">{data.booksStats.totalBooks}</p>
            </div>
            <div className="p-4 bg-green-100 rounded-lg shadow-sm">
              <h3 className="text-xl font-medium">Pending Approval</h3>
              <p className="text-2xl font-bold">
                {data.booksStats.pendingApprovalBooks}
              </p>
            </div>
            <div className="p-4 bg-yellow-100 rounded-lg shadow-sm">
              <h3 className="text-xl font-medium">Approved Books</h3>
              <p className="text-2xl font-bold">
                {data.booksStats.approvedBooks}
              </p>
            </div>
            <div className="p-4 bg-red-100 rounded-lg shadow-sm">
              <h3 className="text-xl font-medium">Rejected Books</h3>
              <p className="text-2xl font-bold">
                {data.booksStats.rejectedBooks}
              </p>
            </div>
            <div className="p-4 bg-gray-100 rounded-lg shadow-sm">
              <h3 className="text-xl font-medium">Out of Stock</h3>
              <p className="text-2xl font-bold">
                {data.booksStats.outOfStockBooks}
              </p>
            </div>
          </div>
        </div>

        {/* Top Categories Chart */}
        <div className="bg-white rounded-lg p-4 text-black w-full max-w-md mx-auto">
          <TopCategoriesChart topCategories={data.booksStats.topCategories} />
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg flex">
        <div className="flex-1">
          <h2 className="text-2xl font-semibold mb-4">Sales Statistics</h2>
          <div className="grid grid-cols-1 gap-4">
            <div className="p-4 bg-blue-100 rounded-lg shadow-sm">
              <h3 className="text-xl font-medium">Total Orders</h3>
              <p className="text-2xl font-bold">
                {data.salesStats.totalOrders}
              </p>
            </div>
            <div className="p-4 bg-green-100 rounded-lg shadow-sm">
              <h3 className="text-xl font-medium">Total Revenue</h3>
              <p className="text-2xl font-bold">
                ${data.salesStats.totalRevenue}
              </p>
            </div>
          </div>
        </div>
        {/* Top Selling Books Chart */}
        <div className="bg-white rounded-lg p-4 text-black w-full max-w-4xl mx-auto">
          <h3 className="text-xl font-semibold mb-4">Top Selling Books</h3>
          <div className="relative h-64 flex justify-center">
            <TopSellingBooksChart
              topSellingBooks={data.salesStats.topSellingBooks}
            />
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Wishlist Statistics</h2>
        <div className="grid grid-cols-1 gap-4">
          <div className="p-4 bg-blue-100 rounded-lg shadow-sm">
            <h3 className="text-xl font-medium">Total Books in Wishlist</h3>
            <p className="text-2xl font-bold">
              {data.wishlistStats.totalWishlistBooks}
            </p>
          </div>
          <div className="p-4 bg-green-100 rounded-lg shadow-sm">
            <h3 className="text-xl font-medium">Most Wished Books</h3>
            <ul className="list-disc pl-5">
              {data.wishlistStats.mostWishedBooks.map((book, index) => (
                <li key={index} className="mb-2">
                  <span className="font-medium">{book.title}</span> by{" "}
                  {book.author} - {book.wishCount} wishes
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
