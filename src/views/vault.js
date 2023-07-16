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
import Stack from "@mui/material/Stack";
import Badge from "@mui/material/Badge";
import NotificationsIcon from "@mui/icons-material/Notifications";

const Vault = ({ isLoggedIn, setIsLoggedIn, userType }) => {
  const [files, setFiles] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const getFiles = async () => {
    try {
      const response = await axios.get(
        `${API_ENDPOINT}api/individual/getFiles/`,
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
      {isLoggedIn ? (
        <>
          <Container component="main" maxWidth="xl">
            {userType === "individual" ? (
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
                    <Stack spacing={2} direction="row" alignItems="center">
                      <Badge badgeContent={10} color="secondary">
                        <NotificationsIcon sx={{ color: "#030b17" }} />
                      </Badge>
                    </Stack>
                    <FilePicker
                      postUrl={API_ENDPOINT + "api/individual/addFile/"}
                      getFiles={getFiles}
                    />
                  </Grid>
                </Grid>

                <FileList files={filteredFiles} getFiles={getFiles} />
              </>
            ) : (
              <>{/* Render content for other user types */}</>
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
