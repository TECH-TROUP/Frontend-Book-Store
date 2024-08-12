import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useUserContext } from "../context/userContext";

const VendorRoute = () => {
  const { user } = useUserContext();

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (user.role_id !== 3) {
    return <Navigate to="/home" />;
  }

  return <Outlet />;
};

export default VendorRoute;
