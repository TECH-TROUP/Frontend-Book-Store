import React from "react";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
  useLocation,
} from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import { UserProvider, useUserContext } from "../context/userContext";
import ProtectedRoute from "./ProtectedRoute";
import NavBar from "../components/NavBar";

const RedirectToHomeIfAuthenticated = ({ children }) => {
  const { user } = useUserContext();

  if (user) {
    return <Navigate to="/" />;
  }

  return children;
};

const Layout = ({ children }) => {
  const { pathname } = useLocation();

  const shouldApplyPadding = pathname !== "/login" && pathname !== "/register";

  return (
    <div
      className={`flex flex-col h-screen bg-gradient-to-r from-purple-950 to-black space-y-6 ${
        shouldApplyPadding ? "p-8" : ""
      } font-poiret`}
    >
      {shouldApplyPadding && <NavBar />}
      <div className="h-screen">{children}</div>
    </div>
  );
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
              </Layout>
            }
          />
        </Routes>
      </UserProvider>
    </Router>
  );
}
