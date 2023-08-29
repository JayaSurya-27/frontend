import React, { useState, useEffect } from "react";
import Stack from "@mui/material/Stack";
import Badge from "@mui/material/Badge";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Modal from "@mui/material/Modal";
import { Box, ButtonGroup, Paper, Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import API_ENDPOINT from "../apiEndpoint";

const Notification = ({ getFiles }) => {
  const [open, setOpen] = useState(false);
  const [showPending, setShowPending] = useState(true);
  const [files, setFiles] = useState([]);
  const [notificationCount, setNotificationCount] = useState(0);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getFileRequests = async () => {
    try {
      const response = await axios.get(
        `${API_ENDPOINT}api/individual/getFileRequests/`,
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
    getFileRequests(); // Fetch files when the component mounts
  }, []);

  const getPendingCount = () => {
    return files.filter((file) => file.status === "pending").length;
  };

  useEffect(() => {
    setNotificationCount(getPendingCount());
  }, [files]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    if (isNaN(date)) {
      return "";
    }
    const options = { year: "numeric", month: "short", day: "numeric" };
    return date.toLocaleDateString(undefined, options);
  };

  const changeStatus = async (file, status) => {
    try {
      const response = await axios
        .put(`${API_ENDPOINT}/api/individual/changeStatus/`, {
          status: status,
          id: file.id,
        })
        .then(() => {
          getFileRequests();
          getFiles();
        });
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };

  const getStatusCellStyle = (status) => {
    let backgroundColor = "";
    let color = "";

    if (status === "declined") {
      backgroundColor = "#fa9397";
      color = "#d42f34";
    } else if (status === "accepted") {
      backgroundColor = "#b3ffba";
      color = "#0fbf3b";
    }
    return {
      backgroundColor,
      color,
    };
  };

  const columnsOther = [
    {
      field: "File Name",
      headerName: "File Name",
      headerClassName: "column-header",
      headerAlign: "center",
      cellClassName: "column-cell",
      disableColumnMenu: true,
      checkboxSelection: false, // Disable row selection
      disableClickEventBubbling: true, // Disable row selection
      type: "string",
      align: "left",
      flex: 1,
    },
    {
      field: "Upload Date",
      headerName: "Upload Date",
      headerClassName: "column-header",
      headerAlign: "center",
      cellClassName: "column-cell",
      align: "center",
      disableColumnMenu: true,
      flex: 0.8,
      valueGetter: (params) => formatDate(params.value),
    },

    {
      field: "Uploaded By",
      headerName: "Uploaded By",
      headerClassName: "column-header",
      headerAlign: "center",
      cellClassName: "column-cell",
      align: "center",
      disableColumnMenu: true,
      flex: 1.2,
      valueGetter: (params) => formatDate(params.value),
    },
    {
      field: "Status",
      headerName: "Status",
      headerClassName: "column-header",
      headerAlign: "center",
      cellClassName: "column-cell",
      align: "center",
      disableColumnMenu: true,
      flex: 0.7,
      renderCell: (params) => (
        <Box
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "5px",
            height: "70%",
            backgroundColor: getStatusCellStyle(params.row.status)
              .backgroundColor,
            color: getStatusCellStyle(params.row.status).color,
          }}
          component="div"
          padding={1}
        >
          {params.row.status}
        </Box>
      ),
    },
  ];

  const columnsPending = [
    {
      field: "File Name",
      headerName: "File Name",
      headerClassName: "column-header",
      headerAlign: "center",
      cellClassName: "column-cell",
      disableColumnMenu: true,
      checkboxSelection: false, // Disable row selection
      disableClickEventBubbling: true, // Disable row selection
      type: "string",
      align: "left",
      flex: 1,
    },
    {
      field: "Upload Date",
      headerName: "Upload Date",
      headerClassName: "column-header",
      headerAlign: "center",
      cellClassName: "column-cell",
      align: "center",
      disableColumnMenu: true,
      flex: 0.7,
      valueGetter: (params) => formatDate(params.value),
    },
    {
      field: "actions",
      headerName: "",
      headerClassName: "column-header",
      cellClassName: "column-cell",
      flex: 1.3,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      align: "center",
      renderCell: (params) => params.value,
    },
  ];

  const rowsOther = files
    .filter((file) => {
      return file.status !== "pending";
    })
    .map((file) => ({
      id: file.id,
      "File Name": file.name,
      "Upload Date": formatDate(file.date),
      " Uploaded By": file.organization.name,
      status: file.status,
    }));

  const rowsPending = files
    .filter((file) => {
      return file.status === "pending";
    })
    .map((file) => ({
      id: file.id,
      "File Name": file.name,
      "Upload Date": formatDate(file.date),
      owner: file.organization,
      status: file.status,
      actions: (
        <>
          <Button
            variant="contained"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "5px",
              height: "70%",
              backgroundColor: "#b3ffba",
              color: "#0fbf3b",
              m: 2,
              p: "20px",
              "&:hover": {
                backgroundColor: "#b3ffba",
              },
            }}
            onClick={() => changeStatus(file, "accepted")}
          >
            Accept
          </Button>
          <Button
            variant="contained"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "5px",
              height: "70%",
              backgroundColor: "#fa9397",
              color: "#d42f34",
              m: 2,
              p: "20px",
              "&:hover": {
                backgroundColor: "#fa9397",
              },
            }}
            onClick={() => changeStatus(file, "declined")}
          >
            decline
          </Button>
        </>
      ),
    }));

  return (
    <>
      <Stack spacing={2} direction="row" alignItems="center">
        <Badge
          badgeContent={notificationCount}
          color={"teriatary"}
          sx={{ color: "white" }}
          max={99}
        >
          <NotificationsIcon sx={{ color: "#64686f" }} onClick={handleOpen} />
        </Badge>
      </Stack>
      <Modal
        open={open}
        onClose={handleClose}
        onClick={getFileRequests}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Paper
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "100%",
            height: "100%",
            maxWidth: 850,
            maxHeight: 600,
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <Box sx={{ borderRadius: "5px" }}>
            <ButtonGroup
              variant="text"
              aria-label="text button group"
              sx={{ width: "100%", borderBottom: "1px solid #d6d4d4" }}
            >
              <Button
                sx={{
                  width: "50%",
                  p: 2,
                  backgroundColor: showPending ? "transparent" : "#d6d4d4",
                  "&:hover": {
                    backgroundColor: showPending ? "transparent" : "#d6d4d4",
                  },
                }}
                onClick={() => setShowPending(false)}
              >
                Completed
              </Button>
              <Button
                sx={{
                  width: "50%",
                  p: 2,
                  backgroundColor: showPending ? "#d6d4d4" : "transparent",
                  "&:hover": {
                    backgroundColor: showPending ? "#d6d4d4" : "transparent",
                  },
                }}
                onClick={() => setShowPending(true)}
              >
                Pending
              </Button>
            </ButtonGroup>
          </Box>
          <Box sx={{ p: 2, height: "calc(100% - 60px)", width: "100%" }}>
            {showPending ? (
              <DataGrid
                columns={columnsPending}
                rows={rowsPending}
                rowHeight={55}
                pageSize={5}
                disableCellSelection={true}
                disablerowsPendingelectionOnClick={true}
              />
            ) : (
              <DataGrid
                columns={columnsOther}
                rows={rowsOther}
                rowHeight={55}
                pageSize={5}
                disableCellSelection={true}
                disablerowsPendingelectionOnClick={true}
              />
            )}
          </Box>
        </Paper>
      </Modal>
    </>
  );
};

export default Notification;
