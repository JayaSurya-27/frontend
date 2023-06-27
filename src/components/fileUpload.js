import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { Container, Grid, Paper } from "@mui/material";
import axios from "axios";
import ClearIcon from "@mui/icons-material/Clear";
import { List, ListItem, ListItemText, ListItemAvatar } from "@mui/material";
import { Avatar } from "@mui/material";
import { IconButton } from "@mui/material";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";

const FileUpload = ({ postUrl }) => {
  const [open, setOpen] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedFiles([]);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    var files = Array.from(event.dataTransfer.files);
    files = [...selectedFiles, ...files];
    setSelectedFiles(files);
  };

  const handleFileChange = (event) => {
    var files = Array.from(event.target.files);
    files = [...selectedFiles, ...files];
    setSelectedFiles(files);
  };

  const handleDelete = (fileToDelete) => {
    const newFiles = selectedFiles.filter((file) => file !== fileToDelete);
    setSelectedFiles(newFiles);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (selectedFiles.length > 0) {
      console.log(selectedFiles);
      const uploadPromises = selectedFiles.map((file) => {
        const formData = new FormData();
        formData.append("name", file.name);
        console.log(localStorage.getItem("userId"));
        formData.append("owner", localStorage.getItem("userId"));
        formData.append("file", file);

        return axios
          .post(postUrl, formData)
          .then((response) => response.data)
          .catch((error) => {
            throw error;
          });
      });

      try {
        await Promise.all(uploadPromises);
        setSelectedFiles([]);
        console.log("All files uploaded successfully!");
      } catch (error) {
        console.error("Error uploading files:", error);
      }
    }

    setOpen(false);
  };

  return (
    <Container component="main" maxWidth="xl">
      <Box sx={{ p: 2 }}>
        <Button variant="contained" onClick={handleOpen}>
          Upload File
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
        >
          <Paper
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "80%",
              maxWidth: 700,
              height: "60%",
              maxHeight: 500,
              p: 2,
              textAlign: "center",
            }}
            onDrop={handleDrop}
            onDragOver={(event) => event.preventDefault()}
          >
            <Typography variant="h5" id="modal-title">
              Upload File
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
              <label htmlFor="file-input">
                <div
                  style={{
                    border: "2px dashed gray",
                    borderRadius: "4px",
                    padding: "16px",
                    cursor: "pointer",
                  }}
                >
                  <Typography variant="body2">
                    Drag and drop files here or click to select files
                  </Typography>
                  {selectedFiles.length > 0 && (
                    <Box
                      sx={{
                        mt: 3,
                        overflow: "auto",
                        maxHeight: "20vh",
                        display: {},
                        width: "auto",
                        // height: "auto",
                      }}
                    >
                      <List
                        dense={true}
                        sx={{
                          display: "grid",
                          gridTemplateColumns: "repeat(3, 1fr)",
                          gap: 1,
                          minWidth: "100px",
                          overflowY: "scroll",
                          width: "100%",

                          "@media (max-width: 768px)": {
                            gridTemplateColumns: "repeat(2, 1fr)",
                          },

                          "@media (max-width: 480px)": {
                            gridTemplateColumns: "repeat(1, 1fr)",
                          },
                        }}
                      >
                        {selectedFiles.map((file) => (
                          <ListItem
                            key={file.name}
                            sx={{
                              bgcolor: "#e6e6e6",
                              minWidth: 0,
                              borderRadius: "45px",
                              zIndex: 2,
                              maxWidth: "200px",
                            }}
                          >
                            <InsertDriveFileIcon />
                            <ListItemText>
                              <Typography
                                noWrap={true}
                                sx={{ color: "grey", fontSize: "" }}
                              >
                                {file.name}
                              </Typography>
                            </ListItemText>
                            <ClearIcon
                              sx={{
                                fontSize: "large",
                                color: "red",
                                cursor: "pointer",
                                zIndex: 1,
                              }}
                              onClick={() => handleDelete(file)}
                            />
                          </ListItem>
                        ))}
                      </List>
                    </Box>
                  )}
                </div>
              </label>
              <input
                type="file"
                multiple
                id="file-input"
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
              {selectedFiles.length > 0 && (
                <Typography variant="body1">
                  {selectedFiles.length} file(s) selected
                </Typography>
              )}
              <Button
                variant="contained"
                color="primary"
                sx={{
                  mt: "auto",
                  position: "fixed",
                  bottom: 16,
                  left: "50%",
                  transform: "translateX(-50%)",
                }}
                onClick={handleSubmit}
              >
                Submit
              </Button>
              <ClearIcon
                variant="contained"
                onClick={handleClose}
                sx={{
                  ml: 1,
                  m: 2,
                  cursor: "pointer",
                  position: "absolute",
                  top: 0,
                  right: 0,
                }}
              />
            </Box>
          </Paper>
        </Modal>
      </Box>
    </Container>
  );
};

export default FileUpload;
