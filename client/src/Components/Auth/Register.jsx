import React, { useState, useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { register } from "../../Apis/Auth";
import Spinner from "../Spinner/Spinner";
const Register = ({ closeModals }) => {
  const navigate = useNavigate();
  const { loading, setLoading } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("Student");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const response = await register(name, email, phone, role, password);
      console.log("Registered SuccessFully", response.data);

      localStorage.setItem(
        "Token",
        JSON.stringify({ token: response.data.token })
      );
      closeModals();
    } catch (error) {
      console.error("Login Error:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  return loading ? (
    <Spinner />
  ) : (
    <div className="bg-white p-8 rounded-lg  max-w-md w-full">
      <h2 className="text-2xl font-bold text-gray-700 mb-6">Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-600 mb-2">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-400"
            placeholder="Enter your name"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-600 mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-400"
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-600 mb-2">Phone Number</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-400"
            placeholder="Enter your phone number"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-600 mb-2">Role</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-400"
          >
            <option value="Student">Student</option>
            <option value="Teacher">Teacher</option>
            <option value="Institute">Institute</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-600 mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-400"
            placeholder="Enter your password"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600"
          disabled={loading}
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
};

export default Register;
