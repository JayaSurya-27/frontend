import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "./../auth";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import API_ENDPOINT from "../apiEndpoint";
import axios from "axios";
import FilePicker from "../components/filePicker";
import FileList from "../components/fileList";

const Vault = ({ isLoggedIn, setIsLoggedIn, userType }) => {
  const [files, setFiles] = useState([]);

  const getFiles = async () => {
    try {
      // console.log("getFiles called");
      // console.log(files);
      const response = await axios.get(
        `${API_ENDPOINT}api/individual/getFiles/`,
        {
          params: { id: localStorage.getItem("userId") },
        }
      );
      setFiles(response.data.data); // the file data is stored in the 'data' property of the response
      // console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {isLoggedIn ? (
        <>
          <Container component="main" maxWidth="xl">
            {userType === "individual" ? (
              <>
                <FilePicker
                  postUrl={API_ENDPOINT + "api/individual/addFile/"}
                />
                <Button
                  onClick={getFiles}
                  sx={{ position: "absolute", top: 100 }}
                >
                  Refresh
                </Button>
                <FileList files={files} />
              </>
            ) : (
              <></>
            )}
          </Container>
        </>
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
};

export default Vault;
