import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import authService from "../authentication/authService";
import { useUserContext } from "./userContext";

const CartContext = createContext();

export function useCartContext() {
  return useContext(CartContext);
}

export const CartProvider = ({ children }) => {
  // State
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);

  //context
  const { user } = useUserContext();

  useEffect(() => {
    if (user) {
      fetchCart();
    } else {
      setCart([]);
      setLoading(false);
    }
  }, [user]);

  const fetchCart = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/cart/book-ids",
        authService.getAuthHeader()
      );
      setCart(response.data.bookIds);
      setLoading(false);
    } catch (error) {
      console.log("Error fetching cart:", error.response.data.error);
    }
  };

  const addToCart = async (bookId, quantity, type) => {
    try {
      const response = await axios.post(
        `http://localhost:3000/api/cart/add`,
        { bookId, quantity, type },
        authService.getAuthHeader()
      );
      console.log("Book added to cart:", response.data);
      await fetchCart();
      return response.data;
    } catch (error) {
      console.log("Error adding book to cart:", error.response.data.error);
    }
  };

  const removeFromCart = async (bookId) => {
    try {
      const response = await axios.post(
        `http://localhost:3000/api/cart/remove`,
        { bookId },
        authService.getAuthHeader()
      );
      console.log("Book removed from cart:", response.data);
      await fetchCart();
      return response.data;
    } catch (error) {
      console.log("Error adding book to cart:", error.response.data.error);
    }
  };

  const value = {
    cart,
    addToCart,
    removeFromCart,
  };

  return (
    <CartContext.Provider value={value}>
      {!loading && children}
    </CartContext.Provider>
  );
};
