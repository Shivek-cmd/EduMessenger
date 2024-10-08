import axios from "axios";
import { toast } from "react-toastify";
const getToken = () => {
  const storedData = localStorage.getItem("Token");
  const { token } = storedData ? JSON.parse(storedData) : null;
  return token;
};

const getAuthHeaders = () => {
  const token = getToken();
  if (!token) throw new Error("User is not authenticated");
  return { Authorization: `Bearer ${token}` };
};
export const getUser = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/getUser`,
      {
        headers: getAuthHeaders(),
      }
    );
    return response;
  } catch (err) {
    console.error(err);
  }
};
export const updateUserDetails = async (userData) => {
  try {
    const response = await axios.patch(
      `${import.meta.env.VITE_BACKEND_URL}/api/updateUser`,
      userData,
      {
        headers: getAuthHeaders(),
      }
    );
    toast.success("User updated successfully!");
    console.log("User updated successfully", response.data);

    return response;
  } catch (err) {
    console.error(err);
  }
};
export const deleteUser = async () => {
  try {
    const response = await axios.delete(
      `${import.meta.env.VITE_BACKEND_URL}/api/deleteUser`,
      { headers: getAuthHeaders() }
    );
    toast.success("User deleted successfully!");
    return response;
  } catch (error) {
    console.error("Error in deleteUser API:", error);
  }
};
