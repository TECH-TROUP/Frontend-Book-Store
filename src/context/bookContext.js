import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import authService from "../authentication/authService";

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

  const value = {
    getBooksPublicQuery,
  };

  return <BookContext.Provider value={value}>{children}</BookContext.Provider>;
};
