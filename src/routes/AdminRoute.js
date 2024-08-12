import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useUserContext } from "../context/userContext";

const AdminRoute = () => {
  const { user } = useUserContext();

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (user.role_id !== 1) {
    return <Navigate to="/home" />;
  }

  return <Outlet />;
};

export default AdminRoute;
