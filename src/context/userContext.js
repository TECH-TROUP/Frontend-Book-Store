import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import authService from "../authentication/authService";
import { useNavigate } from "react-router-dom";

const userContext = createContext();

export function useUserContext() {
  return useContext(userContext);
}

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const token = authService.getToken();
    if (token) {
      setUser({ token });
    }
  }, []);

  const login = async (username, password) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/users/login",
        { username, password }
      );
      const { token } = response.data;
      authService.setToken(token);

      // Navigate to home
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
};
