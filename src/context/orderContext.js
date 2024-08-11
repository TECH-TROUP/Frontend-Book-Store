import axios from "axios";
import { createContext, useContext } from "react";
import authService from "../authentication/authService";

const OrderContext = createContext();

export function useOrderContext() {
  return useContext(OrderContext);
}

export const OrderProvider = ({ children }) => {
  const createOrder = async (totalPrice, rating, comment) => {
    try {
      const response = await axios.post(
        `http://localhost:3000/api/reviews`,
        {
          bookId,
          rating,
          comment,
        },
        authService.getAuthHeader()
      );
      return response.data;
    } catch (error) {
      console.log(error.response.data.error);
    }
  };

  const getAllReviewsOfBook = async (bookId) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/reviews/book/${bookId}`
      );
      return response.data;
    } catch (error) {
      console.log(error.response.data.error);
    }
  };

  const value = {
    createReview,
    getAllReviewsOfBook,
  };

  return (
    <OrderContext.Provider value={value}>{children}</OrderContext.Provider>
  );
};
