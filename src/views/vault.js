import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "./../auth";

const Vault = ({ isLoggedIn, setIsLoggedIn }) => {
  
  return (
    <>
      {isLoggedIn ? (
        <h1>Vault, this is a protected route</h1>
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
};

export default Vault;
