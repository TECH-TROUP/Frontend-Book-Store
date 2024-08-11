import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import authService from "../authentication/authService";
import { useUserContext } from "./userContext";

const WishlistContext = createContext();

export function useWishlistContext() {
  return useContext(WishlistContext);
}

export const WishlistProvider = ({ children }) => {
  // State
  const [loading, setLoading] = useState(true);
  const [wishlist, setWishlist] = useState([]);

  //context
  const { user } = useUserContext();

  useEffect(() => {
    if (user) {
      fetchWishlist();
    } else {
      setWishlist([]);
      setLoading(false);
    }
  }, [user]);

  const fetchWishlist = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/wishlist/book-ids",
        authService.getAuthHeader()
      );
      setWishlist(response.data.bookIds);
      setLoading(false);
    } catch (error) {
      console.log("Error fetching wishlist:", error.response.data.error);
    }
  };

  const addToWishlist = async (bookId) => {
    try {
      const response = await axios.post(
        `http://localhost:3000/api/wishlist/add`,
        { bookId },
        authService.getAuthHeader()
      );
      console.log("Book added to wishlist:", response.data);
      await fetchWishlist();
      return response.data;
    } catch (error) {
      console.log("Error adding book to wishlist:", error.response.data.error);
    }
  };

  const removeFromWishlist = async (bookId) => {
    try {
      const response = await axios.post(
        `http://localhost:3000/api/wishlist/remove`,
        { bookId },
        authService.getAuthHeader()
      );
      console.log("Book removed from wishlist:", response.data);
      await fetchWishlist();
      return response.data;
    } catch (error) {
      console.log("Error adding book to wishlist:", error.response.data.error);
    }
  };

  const fetchUserWishlist = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/wishlist/user",
        authService.getAuthHeader()
      );
      return response.data;
    } catch (error) {
      console.log("Error fetching wishlist:", error.response.data.error);
    }
  };

  const value = {
    wishlist,
    addToWishlist,
    removeFromWishlist,
    fetchUserWishlist,
  };

  return (
    <WishlistContext.Provider value={value}>
      {!loading && children}
    </WishlistContext.Provider>
  );
};
