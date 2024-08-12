import axios from "axios";
import React, { useEffect, useState } from "react";
import authService from "../../authentication/authService";
import TopSellingBooksChart from "../../components/chart_components/TopSellingBooksChart";
import { icons } from "../../assets/icons/IconData";
import TopCategoriesChart from "../../components/chart_components/TopCategoriesChart";
import UserStatsChart from "../../components/chart_components/UserStatsChart";
import BookStatsChart from "../../components/chart_components/BookStatsChart";
import BooksWithHighestRatingsChart from "../../components/chart_components/BooksWithHighestRatingsChart";
import BooksWithMostReviewsChart from "../../components/chart_components/BooksWithMostReviewsChart";

export default function AdminHome() {
  const [data, setData] = useState({
    userStats: {},
    bookStats: {},
    salesStats: {},
    wishlistStats: {},
    averageCartValue: null,
    reviewStats: {},
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/admin/dashboard",
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
    <div className="flex flex-col h-[calc(100vh-140px)] space-y-4 ">
      <div className="flex-1 overflow-y-auto space-y-4">
        <div className="flex justify-center space-x-4">
          {/* User Stats */}
          <UserStatsChart userStats={data.userStats} />

          {/* Book Stats */}
          <BookStatsChart bookStats={data.bookStats} />

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

        <div className="flex space-x-2">
          {/* Top Categories Chart */}
          <div className="bg-white rounded-lg p-4 text-black w-full max-w-md mx-auto">
            <TopCategoriesChart topCategories={data.bookStats.topCategories} />
          </div>

          {/* Sales Stats */}
          <section className="space-y-10 flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-black">
              <div className="p-4 bg-gray-100 rounded-lg shadow">
                <h3 className="text-lg font-medium">Total Orders</h3>
                <p className="text-xl">{data.salesStats.totalOrders}</p>
              </div>
              <div className="p-4 bg-gray-100 rounded-lg shadow">
                <h3 className="text-lg font-medium">Total Revenue</h3>
                <p className="text-xl">${data.salesStats.totalRevenue}</p>
              </div>
              <div className="p-4 bg-gray-100 rounded-lg shadow">
                <h3 className="text-lg font-medium">Average Cart Value</h3>
                <p className="text-xl">${data.averageCartValue}</p>
              </div>
            </div>
            <div className="p-4 bg-gray-100 rounded-lg shadow text-black">
              <h3 className="text-lg font-medium">Total Wishlist Books</h3>
              <p className="text-xl">{data.wishlistStats.totalWishlistBooks}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 text-black">
              <div className="p-4 bg-gray-100 rounded-lg shadow">
                <h3 className="text-lg font-medium">Total Reviews</h3>
                <p className="text-xl font-bold">
                  {data.reviewStats.totalReviews}
                </p>
              </div>
              <div className="p-4 bg-gray-100 rounded-lg shadow">
                <h3 className="text-lg font-medium">Average Rating</h3>
                <p className="text-xl font-bold">
                  {data.reviewStats.averageRating}
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* Review Stats */}
        <section className="mb-8 space-y-4">
          {/* Books with Highest Ratings Chart */}
          <BooksWithHighestRatingsChart
            booksWithHighestRatings={data.reviewStats.booksWithHighestRatings}
          />
          {/* Books with Most Reviews Chart */}
          <BooksWithMostReviewsChart
            booksWithMostReviews={data.reviewStats.booksWithMostReviews}
          />
        </section>
      </div>
    </div>
  );
}
