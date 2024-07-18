import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { getEmployee } from "./API/API";

const EmployeeDetails = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState("");

  useEffect(() => {
    axios
      .get(`${getEmployee}/${id}`)
      .then((response) => {
        if (response.status !== 200) {
          throw new Error("Network response was not ok");
        }
        toast.success("Find Employee successfully!");
        console.log(response.data);
        setEmployee(response.data);
      })
      .catch((error) => {
        console.error(error);
        toast.error("Data Fetching Error...");
      });
  }, [id]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 mt-8">Employee Details</h1>

      {
        <div className=" sm:mx-auto lg:mx-20 md:mx-20  p-4 mb-4 rounded-xl text-center shadow-2xl shadow-gray-400">
          <h2 className="text-3xl text-center font-bold mb-6 mt-4">
            <label>
              <span className="font-semibold text-gray-700">
                Employee Name:{" "}
              </span>{" "}
              {employee.firstName} {employee.lastName}
            </label>
          </h2>
          <hr />
          <div className="mt-6 mb-6">
            <p className="text-xl text-gray-600">
              <label>
                <span className="font-semibold text-gray-900">Email: </span>
                {employee.email}
              </label>
            </p>
            <p className="text-xl text-gray-600">
              <label>
                <span className="font-semibold text-gray-900">Title: </span>
                {employee.title}
              </label>
            </p>
            <p className="text-xl text-gray-600">
              <label>
                <span className="font-semibold text-gray-900">
                  Department:{" "}
                </span>
                {employee.department}
              </label>
            </p>
            <p className="text-xl text-gray-600">
              <label>
                <span className="font-semibold text-gray-900">Address: </span>
                {employee.address}
              </label>
            </p>
            <p className="text-xl text-gray-600">
              <label>
                <span className="font-semibold text-gray-900 text-nowrap overflow-hidden">
                  Description:{" "}
                </span>
                {employee.description}
              </label>
            </p>
          </div>
          <hr />
          <div className="mt-4 mb-4 text-center">
            <Link
              to={`/editemployee/${employee.id}`}
              className="text-white text-xl bg-blue-600 text-center shadow-md hover:bg-blue-400 mx-1 px-8 max-w-full rounded-md py-2"
            >
              Edit Employee
            </Link>
          </div>
        </div>
      }
    </div>
  );
};

export default EmployeeDetails;
