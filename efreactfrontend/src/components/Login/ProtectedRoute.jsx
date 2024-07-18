import React from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";


const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return (
      <>
        <Navigate to="/login" />
        {toast.error("Please Login First...")}
      </>
    );
  }

  return children;
};

export default ProtectedRoute;
