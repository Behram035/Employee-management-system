import React, { useState, useEffect } from "react";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "./Layout";
import ListEmployee from "./components/ListEmployee";
import AddEmployee from "./components/AddEmployee";
import UpdateEmployee from "./components/UpdateEmployee";
import Signup from "./components/Signup/Signup";
import Login from "./components/Login/Login";
import ProtectedRoute from "./components/Login/ProtectedRoute";
import Logout from "./components/Login/Logout";
import UserContext from "./UserContext";
import EmployeeDetails from "./components/EmployeeDetails";
import ForgetPassword from "./components/Login/ForgetPassword";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    // Check if there is a token in local storage
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); // Set isLoggedIn based on the presence of the token
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route
          path=""
          element={
            <ProtectedRoute>
              <ListEmployee />
            </ProtectedRoute>
          }
        />
        <Route path="signup" element={<Signup />} />
        <Route path="login" element={<Login />} />
        <Route path="login/forget-password" element={<ForgetPassword />} />
        <Route path="logout" element={<Logout />} />
        <Route
          path="addemployee"
          element={
            <ProtectedRoute>
              <AddEmployee />
            </ProtectedRoute>
          }
        />
        <Route
          path="editemployee/:id"
          element={
            <ProtectedRoute>
              <UpdateEmployee />
            </ProtectedRoute>
          }
        />
        <Route
          path="employeeDetails/:id"
          element={
            <ProtectedRoute>
              <EmployeeDetails />
            </ProtectedRoute>
          }
        />
      </Route>
    )
  );
  return (
    <UserContext.Provider
      value={{ username, setUsername, isLoggedIn, setIsLoggedIn, handleLogout }}
    >
      <RouterProvider router={router} />
      <ToastContainer />
    </UserContext.Provider>
  );
}

export default App;
