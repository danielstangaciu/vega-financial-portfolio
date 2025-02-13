import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";


//If auth.user is null, the user is redirected to the login page.

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const auth = useContext(AuthContext);

  return auth?.user ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
