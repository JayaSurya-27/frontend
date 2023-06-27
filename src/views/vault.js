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
import SearchBar from "./../components/searchBar";
import API_ENDPOINT from "../apiEndpoint";
import axios from "axios";

const Vault = ({ isLoggedIn, setIsLoggedIn }) => {
  const [files, setFiles] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [autocompleteResults, setAutocompleteResults] = useState([]);

  const getFiles = async () => {
    try {
      console.log("getFiles called");
      console.log(files);
      const response = await axios.get(
        `${API_ENDPOINT}api/individual/getFiles/`,
        {
          params: { id: localStorage.getItem("userId") },
        }
      );
      setFiles(response.data.data); // Assuming the file data is stored in the 'data' property of the response
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //   getFiles();
  // }, [isLoggedIn, files]);

  // const handleInputChange = (e) => {
  //   const query = e.target.value;
  //   setSearchQuery(query);

  //   // Perform autocomplete search here
  //   // Replace the following line with your own autocomplete logic
  //   const results = getAutocompleteResults(query);
  //   setAutocompleteResults(results);
  // };

  // const handleAutocompleteClick = (result) => {
  //   setSearchQuery(result);
  //   setAutocompleteResults([]);
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   // Perform search with searchQuery here
  //   // Replace the following line with your own search logic
  //   performSearch(searchQuery);
  // };

  return (
    <>
      {isLoggedIn ? (
        <>
          <Container component="main" maxWidth="xl">
            <Typography component="h1" variant="h5">
              Vault
            </Typography>
            {/* <SearchBar
              searchQuery={searchQuery}
              handleInputChange={handleInputChange}
              handleSubmit={handleSubmit}
              autocompleteResults={autocompleteResults}
              handleAutocompleteClick={handleAutocompleteClick}
            /> */}
            <FileUpload
              postUrl={API_ENDPOINT + "api/individual/addFile/"}
              // getFiles={getFiles}
            />
            <Button onClick={getFiles}>Refresh</Button>
            <Grid container spacing={2}>
              {files.map((file) => (
                <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={file.id}>
                  <div className="file-card">
                    <div className="file-card-header">
                      <div className="file-card-header-title">
                        <Typography component="h1" variant="h5">
                          {file.name}
                        </Typography>
                      </div>
                      <div className="file-card-header-icon">
                        <Button
                          variant="contained"
                          color="primary"
                          size="small"
                          // href={
                          //   API_ENDPOINT +
                          //   "api/individual/downloadFile/" +
                          //   file.id
                          // }
                        >
                          Download
                        </Button>
                      </div>
                    </div>
                  </div>
                </Grid>
              ))}
            </Grid>
          </Container>
        </>
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
};

export default Vault;
