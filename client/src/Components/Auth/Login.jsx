import React, { useState, useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Spinner from "./../Spinner/Spinner";
import { login } from "../../Apis/Auth";
const Login = ({ closeModals }) => {
  const { loading, setLoading } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const response = await login(email, password);
      console.log("Login Success:", response.data);

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
    <div className="bg-white p-8 rounded-lg max-w-md w-full">
      <h2 className="text-2xl font-bold text-gray-700 mb-6">Login</h2>
      <form onSubmit={handleSubmit}>
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
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
