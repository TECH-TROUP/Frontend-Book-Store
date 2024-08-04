import React from "react";
import {
  Navigate,
  Outlet,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import { UserProvider, useUserContext } from "../context/userContext";
// import ProtectedRoute from "./ProtectedRoute";
import Layout from "../components/Layout";

const RedirectToHomeIfAuthenticated = () => {
  const { user } = useUserContext();

  if (user) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default function AllRoutes() {
  return (
    <Router>
      <UserProvider>
        <Routes>
          <Route
            path="/*"
            element={
              <Layout>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route
                    path="/login"
                    element={<RedirectToHomeIfAuthenticated />}
                  >
                    <Route path="/login" element={<Login />} />
                  </Route>
                  <Route
                    path="/register"
                    element={<RedirectToHomeIfAuthenticated />}
                  >
                    <Route path="/register" element={<Register />} />
                  </Route>
                </Routes>
              </Layout>
            }
          />
        </Routes>
      </UserProvider>
    </Router>
  );
}
