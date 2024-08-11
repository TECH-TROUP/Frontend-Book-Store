import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useUserContext } from "../context/userContext";

const ProtectedRoute = () => {
  const { user } = useUserContext();
  const navigate = useNavigate();

  if (!user) {
    return navigate("/login");
  }

  return <Outlet />;
};

export default ProtectedRoute;
