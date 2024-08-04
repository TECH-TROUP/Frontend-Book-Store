import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useUserContext } from "../context/userContext";

const VendorRoute = () => {
  const { user } = useUserContext();
  const navigate = useNavigate();

  if (!user) {
    return navigate("/login");
  }

  if (user.role_id !== 3) {
    return navigate("/home");
  }

  return <Outlet />;
};

export default VendorRoute;
