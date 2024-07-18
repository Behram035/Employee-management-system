import React, { useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useForm, FormProvider } from "react-hook-form";
import TextInput from "./InputFields/TextInput";
import { getEmployee, updateEmployees } from "./API/API";
import SelectInput from "./InputFields/SelectInput";

const UpdateEmployee = ({ BaseUrl }) => {
  const { id } = useParams();
  const methods = useForm();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${getEmployee}/${id}`)
      .then((response) => {
        if (response.status !== 200) {
          throw new Error("Network response was not ok");
        }
        return response.data;
      })
      .then((data) => {
        Object.keys(data).forEach((key) => {
          methods.setValue(key, data[key]);
        });
        toast.success("Find Employee successfully!");
      })
      .catch((error) => {
        console.error(error);
        toast.error("Data Fetching Error...");
      });
  }, [id, methods, BaseUrl]);

  const onSubmit = (updateEmployee) => {
    axios
      .put(`${updateEmployees}`, updateEmployee)
      .then(() => {
        toast.success("Employee Updated successfully!");
        navigate("/");
      })
      .catch((error) => {
        console.error("There was an error updating the Employee!", error);
        toast.error("Failed to update Employee.");
      });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Edit Employee</h1>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="max-w-5xl">
          <TextInput name="id" placeholder="Id" readOnly />
          <div className="grid lg:grid-cols-3 gap-4 md:grid-cols-2">
            <TextInput name="firstName" placeholder="First Name" />
            <TextInput name="lastName" placeholder="Last Name" />
            <TextInput name="email" placeholder="Email" />
            <TextInput name="title" placeholder="Title" />
            <TextInput name="department" placeholder="Department" />
            <TextInput name="description" placeholder="Description" />
            <TextInput name="address" placeholder="Address" />

            <SelectInput name="gender" placeholder="Gender" />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Update Employee
          </button>
        </form>
      </FormProvider>
    </div>
  );
};

export default UpdateEmployee;
