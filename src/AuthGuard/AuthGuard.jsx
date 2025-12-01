import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const AuthGuard = () => {
  const token = localStorage.getItem("accessToke");

  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
};

export default AuthGuard;
