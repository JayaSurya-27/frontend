import axios from "axios";
import classNames from "classnames";
import { nanoid } from "nanoid";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import DropZone from "./dropZone";
import FilesList from "./uploadFileList";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { Container, Paper } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import Swal from "sweetalert2";
import API_ENDPOINT from "../apiEndpoint";
import "../CSS/filePicker.css";

const FilePickerOrg = ({ postUrl, getFiles }) => {
  const [files, setFiles] = useState([]);
  const [progress, setProgress] = useState(0);
  const [uploadStarted, setUploadStarted] = useState(false);
  const [open, setOpen] = useState(false);
  const [owner, setOwner] = useState("");

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setFiles([]);
  };

  const handleOnChange = useCallback((newFiles) => {
    setFiles((prevFiles) => {
      const updatedFiles = [
        ...prevFiles,
        ...Array.from(newFiles).map((file) => ({
          id: nanoid(),
          file,
        })),
      ];
      return updatedFiles;
    });
    setProgress(0);
    setUploadStarted(false);
  }, []);

  const handleClearFile = useCallback((id) => {
    setFiles((prev) => prev.filter((file) => file.id !== id));
  }, []);

  const canShowProgress = useMemo(() => files.length > 0, [files.length]);

  const userCheck = async () => {
    const { value: owner } = await Swal.fire({
      title: "Submit your user ID",
      input: "text",
      inputAttributes: {
        autocapitalize: "off",
      },
      showCancelButton: true,
      confirmButtonText: "Look up",
      showLoaderOnConfirm: true,
      preConfirm: async (owner) => {
        try {
          const response = await axios.get(
            API_ENDPOINT + "api/organization/checkUser/",
            {
              params: {
                owner: owner,
              },
            }
          );

          if (!response.data.exists) {
            throw new Error("User not found");
          } else {
            handleOpen();
            setOwner(owner);
          }
          return owner;
        } catch (error) {
          Swal.showValidationMessage(`Request failed: ${error}`);
        }
      },
      allowOutsideClick: () => !Swal.isLoading(),
    });
  };

  const handleUpload = useCallback(async () => {
    try {
      setUploadStarted(true);
      const totalFiles = files.length;
      let uploadedCount = 0;

      for (const file of files) {
        const data = new FormData();
        data.append("file", file.file);
        data.append("name", file.file.name);
        data.append("owner", owner);
        data.append("organization", localStorage.getItem("userId"));

        await axios.post(postUrl, data, {
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setProgress(percentCompleted);
          },
        });

        uploadedCount++;
        setProgress((uploadedCount / totalFiles) * 100);
      }

      setUploadStarted(false);
      console.log("All files uploaded successfully");
      await getFiles();
    } catch (error) {
      console.log(error);
    }
  }, [files, postUrl]);

  useEffect(() => {
    if (files.length < 1) {
      setProgress(0);
    }
  }, [files.length]);

  useEffect(() => {
    if (progress === 100) {
      setUploadStarted(false);
    }
  }, [progress]);

  const uploadComplete = useMemo(() => progress === 100, [progress]);

  return (
    <Container component="main" maxWidth="xl">
      <Box sx={{ p: 2 }}>
        <Button variant="contained" onClick={userCheck}>
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
              width: "100%",
              maxWidth: 750,
              maxHeight: 900,
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            <div className="wrapper">
              <div className="canvas_wrapper">
                <DropZone onChange={handleOnChange} />
              </div>
              {files.length > 0 && (
                <div className="files_list_wrapper">
                  <FilesList
                    files={files}
                    onClear={handleClearFile}
                    uploadComplete={uploadComplete}
                  />
                </div>
              )}
              {canShowProgress && (
                <div className="files_list_progress_wrapper">
                  <progress
                    value={progress}
                    max={100}
                    style={{ width: "100%" }}
                  />
                </div>
              )}

              {files.length > 0 && (
                <Button
                  variant="contained"
                  onClick={handleUpload}
                  className={classNames(
                    "upload_button",
                    uploadComplete || uploadStarted ? "disabled" : ""
                  )}
                >
                  {`Upload ${files.length} Files`}
                </Button>
              )}
              <ClearIcon
                variant="contained"
                onClick={handleClose}
                sx={{
                  ml: 1,
                  m: 1,
                  cursor: "pointer",
                  position: "absolute",
                  top: 0,
                  right: 0,
                }}
              />
            </div>
          </Paper>
        </Modal>
      </Box>
    </Container>
  );
};

export default FilePickerOrg;
