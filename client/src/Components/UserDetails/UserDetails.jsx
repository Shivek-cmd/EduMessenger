import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";
import { getUser, updateUserDetails, deleteUser } from "../../Apis/User";
function UserDetails() {
  const { token } = useContext(AuthContext);
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "Student",
    phone: "",
  });
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await getUser();

        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };
    fetchUserDetails();
  }, [token]);
  const handleInputChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };
  const updateUser = async () => {
    try {
      await updateUserDetails(user);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };
  const removeUser = async () => {
    try {
      const response = await deleteUser();
      localStorage.removeItem("TokenData");
      window.location.reload();
      console.log("User Deleted successfully", response.data);
    } catch (error) {
      console.error("Error Deleting user:", error);
    }
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg  relative w-11/12 md:w-[40%]">
        <form>
          <div className="mb-4">
            <label className="block text-gray-600 mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={user.name}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-400"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-400"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 mb-2">Phone</label>
            <input
              type="text"
              name="phone"
              value={user.phone}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-400"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 mb-2">Password</label>

            <input
              type="password"
              name="password"
              value={user.password}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-400"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 mb-2">Role</label>
            <select
              name="role"
              value={user.role}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-400"
            >
              <option value="Student">Student</option>
              <option value="Teacher">Teacher</option>
              <option value="Institute">Institute</option>
            </select>
          </div>
          <div className="flex justify-around">
            <button
              type="button"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg"
              onClick={() => updateUser()}
            >
              Edit Details
            </button>
            <button
              type="button"
              className="bg-red-500 text-white px-4 py-2 rounded-lg"
              onClick={() => removeUser()}
            >
              Delete Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserDetails;
