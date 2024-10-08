import React, { createContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  const { token } = JSON.parse(localStorage.getItem("Token") || "{}");
  return (
    <AuthContext.Provider value={{ loading, setLoading, token }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
