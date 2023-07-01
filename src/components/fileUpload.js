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
import FilePicker from "./filePicker";

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
          Upload Files
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
              width: "auto",
              maxWidth: 700,
              maxHeight: 900,

              textAlign: "center",
            }}
          >
            {/* <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}> */}
            {/* FilePicker component */}
            <FilePicker
              selectedFiles={selectedFiles}
              setSelectedFiles={setSelectedFiles}
              progress={0}
              uploadStarted={false}
              uploadURL={postUrl}
              setOpen={setOpen}
              handleClose={handleClose}
            />
            {/* </Box> */}
          </Paper>
        </Modal>
      </Box>
    </Container>
  );
};

export default FileUpload;
