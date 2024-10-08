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
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const token = authService.getToken();
    if (token) {
      fetchUserData(token);
    } else {
      setLoading(false);
    }
    // eslint-disable-next-line
  }, []);

  const fetchUserData = async (token) => {
    try {
      const response = await axios.get("http://localhost:3000/api/users/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(response.data);
      setLoading(false);
      return response.data;
    } catch (error) {
      console.log(error);
      if (error.response.status === 401) {
        logout();
      }
      setLoading(false);
    }
  };

  const login = async (username, password) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/users/login",
        { username, password }
      );
      const { token } = response.data;
      authService.setToken(token);
      const userResponse = await fetchUserData(token);
      if (userResponse.role_id === 1) {
        navigate("/admin/home");
      } else if (userResponse.role_id === 2) {
        navigate("/home");
      } else {
        navigate("/vendor/home");
      }
    } catch (error) {
      return error.response.data;
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
    } catch (error) {
      return error.response.data;
    }
  };

  const updateAddress = async (address) => {
    try {
      const response = await axios.put(
        "http://localhost:3000/api/users/update-address",
        { address },
        authService.getAuthHeader()
      );
      await fetchUserData(authService.getToken());
      return response;
    } catch (error) {
      return error.response.data;
    }
  };

  const logout = () => {
    authService.removeToken();
    setUser(null);
    navigate("/login");
  };

  const value = {
    user,
    login,
    register,
    logout,
    updateAddress,
  };

  return (
    <UserContext.Provider value={value}>
      {!loading && children}
    </UserContext.Provider>
  );
};
