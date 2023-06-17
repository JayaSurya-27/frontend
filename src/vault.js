import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "./auth"; // Import the authentication functions

const Vault = () => {
  const [isAuthenticatedUser, setIsAuthenticatedUser] = useState(false);

  useEffect(() => {
    setIsAuthenticatedUser(isAuthenticated());
  }, []);

  return (
    <>
      {isAuthenticatedUser ? (
        <h1>Vault , this is a protected route</h1>
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
};

export default Vault;
