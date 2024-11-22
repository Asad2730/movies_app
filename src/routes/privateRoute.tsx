import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute: React.FC = () => {
  const token = useSelector((state:any)=>state.auth.token)
  if (!token) {
    return <Navigate to="/" />;
  }
  return <Outlet />;
};

export default PrivateRoute;
