import React from "react";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import { UserProvider, useUserContext } from "../context/userContext";
import ProtectedRoute from "./ProtectedRoute";

const RedirectToHomeIfAuthenticated = ({ children }) => {
  const { user } = useUserContext();

  if (user) {
    return <Navigate to="/" />;
  }

  return children;
};

export default function AllRoutes() {
  return (
    <Router>
      <UserProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={
              <RedirectToHomeIfAuthenticated>
                <Login />
              </RedirectToHomeIfAuthenticated>
            }
          />
          <Route
            path="/register"
            element={
              <RedirectToHomeIfAuthenticated>
                <Register />
              </RedirectToHomeIfAuthenticated>
            }
          />
          {/* <Route
            path="/protected"
            element={
              <ProtectedRoute>
                <ProtectedComponent />
              </ProtectedRoute>
            }
          /> */}
        </Routes>
      </UserProvider>
    </Router>
  );
}
