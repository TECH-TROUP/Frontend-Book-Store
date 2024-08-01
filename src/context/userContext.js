import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import authService from "../authentication/authService";
import { useNavigate } from "react-router-dom";

const UserContext = createContext();

export function useUserContext() {
  return useContext(UserContext);
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

  const register = async (name, username, password, email) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/users/register",
        { name, username, password, email }
      );
      if (response.status === 201) {
        navigate("/login");
      }
      console.log(response.data);
    } catch (error) {}
  };

  const logout = () => {
    authService.clearToken();
    setUser(null);
    navigate("/login");
  };

  const value = {
    user,
    login,
    register,
    logout,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
