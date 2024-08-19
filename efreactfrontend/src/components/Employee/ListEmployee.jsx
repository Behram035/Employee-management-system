import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { GetAllEmployees, DeleteEmployee } from "../API/API";
import {
  MdOutlineSkipNext,
  MdOutlineSkipPrevious,
  MdDeleteForever,
  MdEdit,
  MdPersonAdd,
} from "react-icons/md";
// import UserContext from "../../UserContext";

const ListEmployee = () => {
  const [search, setSearch] = useState("");
  const [employees, setEmployees] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(9);

  // const {delete} = useContext(UserContext);

  const fetchData = async () => {
    await axios
      .get(`${GetAllEmployees}`)
      .then((response) => response.data)
      .then((data) => {
        console.log(data);
        setEmployees(data);
      })
      .catch((error) => console.log(error));
  };

  const searchChange = (event) => {
    setSearch(event.target.value);
  };

  const searchEmployee = async () => {
    await axios
      .get(`${GetAllEmployees}`)
      .then((response) => {
        const employee = response.data;
        const filteredEmployees = employee.filter(
          (employee) =>
            employee.firstName.toLowerCase().includes(search.toLowerCase()) ||
            employee.lastName.toLowerCase().includes(search.toLowerCase())
        );
        if (filteredEmployees.length > 0) {
          setEmployees(filteredEmployees);
        } else {
          toast.error("Employee does not match");
        }
      })

      .catch((error) => {
        console.log(error);
        toast.error("Employee Does not match");
      });
  };
  useEffect(() => {
    if (search === "") {
      fetchData();
    } else {
      searchEmployee();
    }
  }, [search]);
  const deleteEmployee = async (id) => {
    try {
      await axios.delete(`${DeleteEmployee}/${id}`);
      const deletedemployee = employees.filter(
        (employee) => employee.id === id
      );
      console.log(deletedemployee);
      setEmployees(employees.filter((employee) => employee.id !== id));

      toast.success("Employee Deleted successfully!");
    } catch (error) {
      console.error("Error deleting Employee:", error);
      toast.error("Failed to Delete Employee.");
    }
  };

  const indexOfLastEmployee = currentPage * pageSize;
  const indexOfFirstEmployee = indexOfLastEmployee - pageSize;
  const currentEmployees = employees.slice(
    indexOfFirstEmployee,
    indexOfLastEmployee
  );

  const totalPages = Math.ceil(employees.length / pageSize);

  const handleNextPage = () => {
    setCurrentPage((prevPage) =>
      prevPage < totalPages ? prevPage + 1 : prevPage
    );
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : prevPage));
  };

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Employees List</h1>
        <div className="flex justify-between">
          <Link
            to="/addemployee"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mb-4 inline-block"
          >
            <MdPersonAdd size={35}/>
          </Link>
          <input
            value={search}
            onChange={searchChange}
            className="border border-gray-500 text-gray-400 font-semibold py-2 px-4 rounded mb-4 inline-block"
            placeholder="Search Employee"
          />
        </div>

        <div>
          <ul className="grid lg:grid-cols-3 gap-6 md:grid-cols-2 max-w-full">
            {currentEmployees.map((employee) => (
              <li
                key={employee.id}
                className="border border-gray-500 p-4 mb-4 rounded-xl shadow-xl shadow-gray-400 "
              >
                <NavLink to={`/employeeDetails/${employee.id}`}>
                  <p className="text-lg text-center font-semibold">
                    {employee.firstName} {employee.lastName}
                  </p>
                  <hr />
                  <p className="text-gray-600">{employee.email}</p>
                  <p className="text-gray-600">
                    {employee.gender} - {employee.title}
                  </p>
                  <p className="text-gray-600">{employee.department}</p>
                  <p className="text-gray-600 text-ellipsis">
                    {employee.description}
                  </p>
                  <p className="text-gray-600">{employee.address}</p>
                </NavLink>
                <hr />
                <div className="mt-2 text-center grid grid-cols-2 gap-4">
                  <Link
                    to={`/editemployee/${employee.id}`}
                    className="text-white bg-blue-600 shadow-md hover:bg-blue-400 px-16 rounded-md py-2"
                  >
                    <MdEdit size={25} />
                  </Link>
                  <button
                    onClick={() => deleteEmployee(employee.id)}
                    className="text-white bg-red-600 shadow-md hover:bg-red-700 px-16 rounded-md py-2"
                  >
                    <MdDeleteForever size={25} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex justify-center mt-4">
          <button
            className="px-4 py-2 bg-gray-300 rounded-l-md"
            disabled={currentPage === 1}
            onClick={handlePreviousPage}
          >
            <MdOutlineSkipPrevious size={25} />
          </button>
          <span className="px-4 py-2 bg-gray-100">
            Page {currentPage}/{totalPages}
          </span>
          <button
            className="px-4 py-2 bg-gray-300 rounded-r-md"
            disabled={currentPage === totalPages}
            onClick={handleNextPage}
          >
            <MdOutlineSkipNext size={25} />
          </button>
        </div>
      </div>
    </>
  );
};

export default ListEmployee;
