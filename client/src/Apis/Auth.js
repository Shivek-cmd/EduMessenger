import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const login = async (email, password) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/login`,
      { email, password }
    );

    toast.success("Login successful!");

    return response;
  } catch (err) {
    console.error(err);

    toast.error("Login failed. Please check your credentials.");
  }
};

export const register = async (name, email, phone, role, password) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/register`,
      {
        name,
        email,
        phone,
        role,
        password,
      }
    );

    toast.success("Registration successful!");

    return response;
  } catch (err) {
    console.error(err);

    toast.error("Registration failed. Please try again.");
  }
};
