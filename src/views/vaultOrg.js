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
import FilePickerOrg from "../components/filePickerOrg";
import FileListOrg from "../components/fileListOrg";

const VaultOrg = ({ isLoggedIn, setIsLoggedIn, userType }) => {
  const [files, setFiles] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const getFiles = async () => {
    try {
      const response = await axios.get(
        `${API_ENDPOINT}api/organization/getFiles/`,
        {
          params: { id: localStorage.getItem("userId") },
        }
      );
      setFiles(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getFiles();
  }, []);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredFiles = files.filter((file) =>
    file.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      org
      {isLoggedIn ? (
        <>
          <Container component="main" maxWidth="xl">
            {userType === "organization" ? (
              <>
                <Grid container alignItems="center" spacing={2}>
                  <Grid item xs={12} md={4}>
                    <TextField
                      label=""
                      variant="outlined"
                      placeholder="Search"
                      value={searchQuery}
                      onChange={handleSearchChange}
                      fullWidth
                      sx={{ borderRadius: "5px", ml: "20px" }}
                    />
                  </Grid>
                  <Grid item xs={6} md={4} />
                  <Grid
                    item
                    xs={6}
                    md={4}
                    sx={{
                      display: "flex",
                      justifyContent: "flex-end",
                      alignItems: "center",
                    }}
                  >
                    <FilePickerOrg
                      postUrl={API_ENDPOINT + "api/organization/addFile/"}
                      getFiles={getFiles}
                    />
                  </Grid>
                </Grid>

                <FileListOrg files={filteredFiles} getFiles={getFiles} />
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

export default VaultOrg;
