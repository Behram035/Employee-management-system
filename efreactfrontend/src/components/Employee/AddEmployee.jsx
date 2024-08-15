import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useForm, FormProvider } from "react-hook-form";
import TextInput from "../InputFields/TextInput";
import SelectInput from "../InputFields/SelectInput";
import { addEmployee, uploadFilexlsx } from "../API/API";

const AddEmployee = () => {
  const methods = useForm();
  const navigate = useNavigate();
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = () => {
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      console.log("FormData Content: ", formData.get("file"));
      axios
        .post(`${uploadFilexlsx}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(() => {
          toast.success("File is Uploaded Successfully");
          navigate("/");
        })
        .catch((error) => {
          console.error("There was an error adding the File!", error);
          toast.error("There was an error uploading the file.");
        });
    } else {
      toast.error("Please select a file to upload.");
    }
  };

  const onSubmit = (newEmployee) => {
    axios
      .post(`${addEmployee}`, newEmployee)
      .then(() => {
        toast.success("Employee added successfully!");
        console.log(newEmployee);
        navigate("/");
      })
      .catch((error) => {
        console.error("There was an error adding the Employee!", error);
        toast.error("Employee is Existed with Email.");
      });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Add Employee</h1>
      <div className="container mx-auto px-4 py-8">
        <input
          type="file"
          name="Upload file"
          id="fileInput"
          onChange={handleFileChange}
        />
        <button
          type="submit"
          onClick={handleUpload}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Upload File (xlsx)
        </button>
      </div>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="max-w-5xl">
          <div className="grid lg:grid-cols-3 gap-4 md:grid-cols-2">
            <TextInput name="firstname" placeholder="First Name" />
            <TextInput name="lastname" placeholder="Last Name" />
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
            Add Employee
          </button>
        </form>
      </FormProvider>
    </div>
  );
};

export default AddEmployee;
