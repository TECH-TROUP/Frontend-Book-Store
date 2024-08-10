import React from "react";
import {
  Navigate,
  Outlet,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import Home from "../pages/customer/Home";
import Login from "../pages/customer/Login";
import Register from "../pages/customer/Register";
import { UserProvider, useUserContext } from "../context/userContext";
import { BookProvider } from "../context/bookContext";
import Layout from "../components/Layout";
import AdminRoute from "./AdminRoute";
import AdminHome from "../pages/admin/AdminHome";
import VendorRoute from "./VendorRoute";
import VendorHome from "../pages/vendor/VendorHome";
import VendorBooks from "../pages/vendor/VendorBooks";
import AdminUsers from "../pages/admin/AdminUsers";
import AdminCategories from "../pages/admin/AdminCategories";
import AdminBooks from "../pages/admin/AdminBooks";
import AdminBookCopies from "../pages/admin/AdminBookCopies";
import VendorBookCopies from "../pages/vendor/VendorBookCopies";

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
        <BookProvider>
          <Routes>
            <Route
              path="/*"
              element={
                <Layout>
                  <Routes>
                    {/* Customer Routes */}
                    <Route path="/home" element={<Home />} />
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

                    {/* Admin Routes */}

                    {/* Redirect from /admin to /admin/home */}
                    <Route path="/admin" element={<AdminRoute />}>
                      <Route
                        path="/admin"
                        element={<Navigate to="/admin/home" />}
                      />
                    </Route>

                    <Route path="/admin/home" element={<AdminRoute />}>
                      <Route path="/admin/home" element={<AdminHome />} />
                    </Route>

                    <Route path="/admin/users" element={<AdminRoute />}>
                      <Route path="/admin/users" element={<AdminUsers />} />
                    </Route>

                    <Route path="/admin/books" element={<AdminRoute />}>
                      <Route path="/admin/books" element={<AdminBooks />} />
                    </Route>

                    <Route path="/admin/books/:bookId" element={<AdminRoute />}>
                      <Route
                        path="/admin/books/:bookId"
                        element={<AdminBookCopies />}
                      />
                    </Route>

                    <Route path="/admin/categories" element={<AdminRoute />}>
                      <Route
                        path="/admin/categories"
                        element={<AdminCategories />}
                      />
                    </Route>

                    {/* Vendor Routes */}

                    {/* Redirect from /vendor to /vendor/home */}
                    <Route
                      path="/vendor"
                      element={<Navigate to="/vendor/home" />}
                    />

                    <Route path="/vendor/home" element={<VendorRoute />}>
                      <Route path="/vendor/home" element={<VendorHome />} />
                    </Route>

                    <Route path="/vendor/books" element={<VendorRoute />}>
                      <Route path="/vendor/books" element={<VendorBooks />} />
                    </Route>

                    <Route
                      path="/vendor/books/:bookId"
                      element={<VendorRoute />}
                    >
                      <Route
                        path="/vendor/books/:bookId"
                        element={<VendorBookCopies />}
                      />
                    </Route>
                  </Routes>
                </Layout>
              }
            />
          </Routes>
        </BookProvider>
      </UserProvider>
    </Router>
  );
}
