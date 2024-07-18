import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import TextInput from "../InputFields/TextInput";
import { useNavigate, NavLink } from "react-router-dom";
import { useForm, FormProvider } from "react-hook-form";
import { userLogin } from "../API/API";
import UserContext from "../../UserContext";

const Login = () => { 
  const methods = useForm();
  const navigate = useNavigate();
  const { setUsername, setIsLoggedIn } = useContext(UserContext);

  const onSubmit = async (loginuser) => {
    try {
      const response = await axios.post(`${userLogin}`, loginuser);
      if (response.status === 200) {
        const { Token, user } = response.data;
        if (Token !== null) {
          
          localStorage.setItem("userName:", user.userName);
          setUsername(user.userName); // set username to show with logout button
        }
        
        localStorage.setItem("token", Token);

        setIsLoggedIn(true); // Update login state
        navigate("/");
        toast.success("User logged in successfully!");
      } else {
        toast.error("Invalid email or password. Please try again.");
      }
    } catch (error) {
      console.error("There was an error logging in!", error);
      toast.error("Failed to login. Try again.");
    }
  };

  
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      toast.success("User already logged in.");

      navigate("/"); // Redirect to home if already logged in
    }
  }, [navigate]);
  return (
    <>
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-16 w-auto"
          src="https://alexharkness.com/wp-content/uploads/2020/06/logo-2.png"
          alt="Your Company"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Login To Your Account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} className="max-w-5xl">
            <TextInput
              type="email"
              name="email"
              placeholder="Email"
              autoComplete="off"
            />
            <TextInput
              type="password"
              name="password"
              placeholder="Password"
              autoComplete="off"
            />

            <div className="text-sm mb-2">
              <NavLink
                to="forget-password"
                className="font-semibold text-orange-700 hover:text-orange-400"
              >
                Forgot password?
              </NavLink>
            </div>
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-orange-700 px-3 py-1.5 text-lg font-semibold leading-6 text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
              >
                Sign in
              </button>
            </div>
          </form>
        </FormProvider>
        <p className="mt-10 text-center text-sm text-gray-600">
          Not a member?
          <NavLink
            to="/signup"
            className="font-semibold mr-2 leading-6 text-orange-700 hover:text-orange-400"
          >
            Create Your New Account
          </NavLink>
        </p>
      </div>
    </div>
    </>
  );
};

export default Login;