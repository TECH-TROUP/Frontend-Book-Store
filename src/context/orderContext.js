import axios from "axios";
import { createContext, useContext } from "react";
import authService from "../authentication/authService";

const OrderContext = createContext();

export function useOrderContext() {
  return useContext(OrderContext);
}

export const OrderProvider = ({ children }) => {
  const getOrderById = async (orderId) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/orders/${orderId}`,
        authService.getAuthHeader()
      );
      return response.data;
    } catch (error) {
      console.log(error.response.data.error);
    }
  };

  const getOrdersByUserId = async (statusId) => {
    try {
      const response = await axios.post(
        `http://localhost:3000/api/user-orders`,
        { statusId: statusId === "all" ? null : statusId },
        authService.getAuthHeader()
      );
      return response.data;
    } catch (error) {
      console.log(error.response.data.error);
    }
  };

  const value = {
    getOrderById,
    getOrdersByUserId,
  };

  return (
    <OrderContext.Provider value={value}>{children}</OrderContext.Provider>
  );
};
