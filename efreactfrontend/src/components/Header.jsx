import { Link, NavLink } from "react-router-dom";
import React, { useContext, useState } from "react";
import UserContext from "../UserContext";

const Header = () => {

  const { username, isLoggedIn, handleLogout } = useContext(UserContext);

  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <header className="shadow sticky z-50 top-0">
      <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <Link to="/" className="flex items-center">
            <img
              src="https://alexharkness.com/wp-content/uploads/2020/06/logo-2.png"
              className="mr-3 h-12"
              alt="Logo"
            />
          </Link>
          <div className="flex items-center lg:order-2">
            {isLoggedIn ? (
                            
                <NavLink
                  to="/logout"
                  className={({ isActive }) =>
                    `text-gray-800 hover:bg-gray-50 ${
                      isActive ? "text-orange-700" : "text-gray-800"
                    } focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm border border-orange-200 px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none`
                  }
                  onClick={handleLogout}
                >
                  Logout ({username})
                </NavLink>
              
            ) : (
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `text-gray-800 hover:bg-gray-50 ${
                    isActive ? "text-orange-700" : "text-gray-800"
                  } focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm border border-orange-200 px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none`
                }
              >
                Log in
              </NavLink>
            )}

            <NavLink
              to="/signup"
              className="text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
            >
              Signup
            </NavLink>
          </div>
          <div className="hidden justify-between items-center w-full md:flex md:w-auto md:order-1 lg:flex lg:w-auto lg:order-1">
            <ul className="flex flex-col mb-4 mt-4 font-medium md:flex-row lg:flex-row lg:space-x-8 lg:mt-0">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `block py-2 pr-4 pl-3 duration-200 ${
                      isActive ? "text-orange-700" : "text-gray-700"
                    }  hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                  }
                >
                  Employees List
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/addemployee"
                  className={({ isActive }) =>
                    `block py-2 pr-4 pl-3 duration-200 ${
                      isActive ? "text-orange-700" : "text-gray-700"
                    }  hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                  }
                >
                  Add Employee
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="md:hidden">
            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="text-orange focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div>
        </div>
      </nav>
      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden">
          <ul className="flex flex-col">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `block py-2 pr-4 pl-3 duration-200 ${
                    isActive ? "text-orange-700" : "text-gray-700"
                  } hover:bg-gray-50 lg:hover:bg-transparent hover:text-orange-700 lg:p-0`
                }
              >
                Employees List
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/addemployee"
                className={({ isActive }) =>
                  `block py-2 pr-4 pl-3 duration-200 ${
                    isActive ? "text-orange-700" : "text-gray-700"
                  }  hover:bg-gray-50 lg:hover:bg-transparent hover:text-orange-700 lg:p-0`
                }
              >
                Add Employee
              </NavLink>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
