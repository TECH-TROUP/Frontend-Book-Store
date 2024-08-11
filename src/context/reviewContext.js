import axios from "axios";
import { createContext, useContext } from "react";
import authService from "../authentication/authService";

const ReviewContext = createContext();

export function useReviewContext() {
  return useContext(ReviewContext);
}

export const ReviewProvider = ({ children }) => {
  const createReview = async (bookId, rating, comment) => {
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
    <ReviewContext.Provider value={value}>{children}</ReviewContext.Provider>
  );
};
