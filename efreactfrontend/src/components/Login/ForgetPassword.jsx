import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { updatePasswordApi } from "../API/API";
import { useForm, FormProvider } from "react-hook-form";
import TextInput from "../InputFields/TextInput";

const ForgetPassword = () => {
  const methods = useForm();
  const navigate = useNavigate();

  const updatePassword = async (newPassword) => {
    await axios
      .put(`${updatePasswordApi}`, newPassword)
      .then(() => {
        toast.success("Password Updated successfully!");
        navigate("/login");
      })
      .catch((error) => {
        console.error("There was an error updating the Password!", error);
        toast.error("Invalid Email: Failed to update Password.");
      });
  };

  return (
    <div>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Forget Password</h1>
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(updatePassword)}
            className="max-w-5xl"
          >
            <div className="grid lg:grid-cols-3 gap-4 md:grid-cols-2">
              <TextInput
                name="email"
                type="email"
                placeholder="Enter Your Email"
              />
              <TextInput name="password" type="password"placeholder="Enter Your Password" />
            </div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Update Password
            </button>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default ForgetPassword;
