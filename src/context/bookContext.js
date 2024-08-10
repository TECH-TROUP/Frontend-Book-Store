import axios from "axios";
import { createContext, useContext } from "react";

const BookContext = createContext();

export function useBookContext() {
  return useContext(BookContext);
}

export const BookProvider = ({ children }) => {
  const getBooksPublicQuery = async (query) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/books/${query}`
      );
      return response.data;
    } catch (error) {
      console.log(error.response.data.error);
    }
  };

  const getBooksByStatusId = async (statusId) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/books/status/${statusId}`
      );
      return response.data;
    } catch (error) {
      console.log(error.response.data.error);
    }
  };

  const getBookById = async (bookId) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/books/${bookId}`
      );
      return response.data;
    } catch (error) {
      console.log(error.response.data.error);
    }
  };

  const value = {
    getBooksPublicQuery,
    getBooksByStatusId,
    getBookById,
  };

  return <BookContext.Provider value={value}>{children}</BookContext.Provider>;
};
