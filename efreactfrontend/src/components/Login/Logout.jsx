import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Remove the token from local storage
    localStorage.removeItem("token");

    toast.success("User logged out successfully!");
    navigate("/login"); // Redirect to login page
  }, [navigate]);

  return null;
};

export default Logout;
