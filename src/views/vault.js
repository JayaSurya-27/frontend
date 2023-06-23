import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "./../auth";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { UploadFile } from "@mui/icons-material";
import FileUpload from "./../components/fileUpload";
import API_ENDPOINT from "../apiEndpoint";

const Vault = ({ isLoggedIn, setIsLoggedIn }) => {
  return (
    <>
      {isLoggedIn ? (
        <>
          <Container component="main" maxWidth="xl">
            <Typography component="h1" variant="h5">
              Vault
            </Typography>
            <FileUpload postUrl={API_ENDPOINT + "api/individual/addFile/"} />
          </Container>
        </>
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
};

export default Vault;
