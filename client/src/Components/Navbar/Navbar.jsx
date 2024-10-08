import React, { useContext, useState } from "react";
import AuthContext from "../../context/AuthContext";
import { Link } from "react-router-dom";
import Login from "../Auth/Login";
import { FaTimes } from "react-icons/fa";
import Register from "../Auth/Register";
import UserDetails from "../UserDetails/UserDetails";
import { toast } from "react-toastify";

function Navbar() {
  const { token } = useContext(AuthContext);

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isviewAccountDetailsModal, setViewAccountDetailsModal] =
    useState(false);
  const closeModals = () => {
    setIsLoginModalOpen(false);
    setIsRegisterModalOpen(false);
    setViewAccountDetailsModal(false);
  };
  const handleLogout = () => {
    localStorage.removeItem("Token");
    toast.success("Logout SuccessFully");
    window.location.reload();
  };

  return (
    <nav className="bg-red-400 w-full flex flex-col sm:flex-row justify-between items-center px-5 py-4 shadow-md rounded-bl-3xl rounded-br-3xl z-50">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl font-bold text-white cursor-pointer transition duration-300">
          <Link to="/">EduMessenger</Link>
        </h1>
      </div>
      <div className="flex items-center space-x-4">
        {token ? (
          <>
            <button
              onClick={() => setViewAccountDetailsModal(true)}
              className="px-4 py-2 border border-transparent rounded-md text-white font-semibold hover:bg-gray-100 hover:text-red-400 transition duration-300 ease-in-out"
            >
              View Account
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 border border-transparent rounded-md text-white font-semibold hover:bg-gray-100 hover:text-red-400 transition duration-300 ease-in-out"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setIsRegisterModalOpen(true)}
              className="px-4 py-2 border border-transparent rounded-md text-white font-semibold hover:bg-gray-100 hover:text-red-400 transition duration-300 ease-in-out"
            >
              Register
            </button>
            <button
              onClick={() => setIsLoginModalOpen(true)}
              className="px-4 py-2 border border-transparent rounded-md text-white font-semibold hover:bg-gray-100 hover:text-red-400 transition duration-300 ease-in-out"
            >
              Login
            </button>
          </>
        )}
      </div>

      {/* Render Login Modal */}
      {isLoginModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg  relative w-11/12 md:w-[40%]">
            {" "}
            <button className="absolute top-8 right-6">
              <FaTimes
                onClick={closeModals}
                className=" text-2xl cursor-pointer"
              />
            </button>
            <Login closeModals={closeModals} />
          </div>
        </div>
      )}
      {/* Render Register Modal */}
      {isRegisterModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg  relative w-11/12 md:w-[40%]">
            <button className="absolute top-8 right-6">
              <FaTimes
                onClick={closeModals}
                className=" text-2xl cursor-pointer"
              />
            </button>
            <Register closeModals={closeModals} />
          </div>
        </div>
      )}
      {/*View Account Details */}
      {isviewAccountDetailsModal && <UserDetails />}
    </nav>
  );
}

export default Navbar;
