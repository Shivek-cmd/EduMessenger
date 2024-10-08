import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Components/Auth/Login";
import Register from "./Components/Auth/Register";
import { AuthProvider } from "./context/AuthContext";
import Homepage from "./pages/Homepage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/" element={<Homepage />} />
        </Routes>
        <ToastContainer position="top-center" />
      </Router>
    </AuthProvider>
  );
}

export default App;
