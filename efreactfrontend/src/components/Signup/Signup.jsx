import React from "react";
import axios from "axios";

import TextInput from "../InputFields/TextInput";
import { toast } from "react-toastify";
import { useNavigate, NavLink } from "react-router-dom";
import { useForm, FormProvider } from "react-hook-form";
import { userRegister } from "../API/API";

const Signup = () => {
  const methods = useForm();
  const navigate = useNavigate();

  const onSubmit = async (newUser) => {
     await axios
      .post(`${userRegister}`, newUser)
      .then(() => {
        toast.success("User Registered successfully!");
        navigate("/login");
      })
      .catch((error) => {
        
        console.error("There was an error adding the User!", error);
        toast.error("Failed to Registered User. Already Exist");
      });
  };
  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-16 w-auto"
          src="https://alexharkness.com/wp-content/uploads/2020/06/logo-2.png"
          alt="Your Company"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Create Your New Account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} className="max-w-5xl">

            <TextInput type="text" name="userName" placeholder="User Name" />
            <TextInput type="email" name="email" placeholder="Email" />
            <TextInput type="password" name="password" placeholder="Password" />


            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-orange-700 px-3 py-1.5 text-lg font-semibold leading-6 text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
            >
              Signup Now
            </button>
          </form>
        </FormProvider>
        <p className="mt-10 text-center text-sm text-gray-600">
          Already have Account? 
          <NavLink
            to="/login"
            className="font-semibold leading-6 text-orange-700 hover:text-orange-400"
          >
            Signin To Your Account
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default Signup;
