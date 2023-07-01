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

import "../CSS/filePicker.css";

const FilePicker = ({ postUrl }) => {
  const [files, setFiles] = useState([]);
  const [progress, setProgress] = useState(0);
  const [uploadStarted, setUploadStarted] = useState(false);
  const [open, setOpen] = useState(false);

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

  // const handleUpload = useCallback(async () => {
  //   try {
  //     const data = new FormData();

  //     files.forEach((file) => {
  //       data.append("file", file.file);
  //       data.append("name", file.file.name);
  //       data.append("owner", localStorage.getItem("userId"));
  //     });

  //     const res = await axios.request({
  //       url: postUrl,
  //       method: "POST",
  //       data,
  //       onUploadProgress: (progressEvent) => {
  //         setUploadStarted(true);
  //         const percentCompleted = Math.round(
  //           (progressEvent.loaded * 100) / progressEvent.total
  //         );
  //         setProgress(percentCompleted);
  //       },
  //     });

  //     setUploadStarted(false);
  //     console.log(res);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }, [files.length]);

  const handleUpload = useCallback(async () => {
    try {
      setUploadStarted(true);
      const totalFiles = files.length;
      let uploadedCount = 0;

      for (const file of files) {
        const data = new FormData();
        data.append("file", file.file);
        data.append("name", file.file.name);
        data.append("owner", localStorage.getItem("userId"));
        

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
    } catch (error) {
      console.log(error);
    }
  }, [files]);

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
              width: "100%",
              maxWidth: 750,
              maxHeight: 900,
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            <div className="wrapper">
              <div className="canvas_wrapper">
                <DropZone
                  onChange={handleOnChange}
                  // accept={accept}
                />
              </div>
              {files.length ? (
                <div className="files_list_wrapper">
                  <FilesList
                    files={files}
                    onClear={handleClearFile}
                    uploadComplete={uploadComplete}
                  />
                </div>
              ) : null}
              {canShowProgress ? (
                <div className="files_list_progress_wrapper">
                  <progress
                    value={progress}
                    max={100}
                    style={{ width: "100%" }}
                  />
                </div>
              ) : null}

              {files.length ? (
                <Button
                  variant="contained"
                  onClick={handleUpload}
                  className={classNames(
                    "upload_button",
                    "uploadComplete" || uploadStarted ? "disabled" : ""
                  )}
                >
                  {`Upload ${files.length} Files`}
                </Button>
              ) : null}
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

export default FilePicker;
