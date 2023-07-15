import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import GetAppIcon from "@mui/icons-material/GetApp";
import Container from "@mui/material/Container";
import API_ENDPOINT from "../apiEndpoint";
import axios from "axios";
import { Box, Icon } from "@mui/material";
import PendingIcon from "@mui/icons-material/Pending";

const FilesListOrg = ({ files, getFiles }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    if (isNaN(date)) {
      return "";
    }
    const options = { year: "numeric", month: "short", day: "numeric" };
    return date.toLocaleDateString(undefined, options);
  };

  const handleFileDownload = async (fileId) => {
    try {
      const response = await axios.get(
        `${API_ENDPOINT}api/organization/downloadFile/${fileId}/`,
        {
          responseType: "blob",
        }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", response.headers["content-disposition"]);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.log(error);
    }
  };

  const handleFileDelete = async (fileId) => {
    try {
      await axios.delete(
        `${API_ENDPOINT}api/organization/deleteFile/${fileId}/`
      );
      getFiles(); // Call getFiles after file deletion
    } catch (error) {
      console.log(error);
    }
  };

  const getStatusCellStyle = (status) => {
    let backgroundColor = "";
    let color = "";

    if (status === "pending") {
      backgroundColor = "#fcf881";
      color = "#bfb900";
    } else if (status === "declined") {
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

  const rows = files.map((file) => ({
    id: file.id,
    "File Name": file.name,
    "Upload Date": formatDate(file.date),
    owner: file.owner,
    status: file.status,
    actions: (
      <>
        <GetAppIcon
          className="icon-button"
          onClick={() => handleFileDownload(file.id)}
        />
        <DeleteIcon
          className="icon-button"
          onClick={() => handleFileDelete(file.id)}
        />
      </>
    ),
  }));

  const columns = [
    {
      field: "File Name",
      headerName: "File Name",
      headerClassName: "column-header",
      headerAlign: "center",
      cellClassName: "column-cell",
      disableColumnMenu: true,
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
      flex: 1,
      valueGetter: (params) => formatDate(params.value),
    },
    {
      field: "Owner",
      headerName: "Owner",
      headerClassName: "column-header",
      headerAlign: "center",
      cellClassName: "column-cell",
      align: "center",
      disableColumnMenu: true,
      flex: 1,
      valueGetter: (params) =>
        params.row.owner?.firstName + " " + params.row.owner?.lastName || "",
    },
    {
      field: "Status",
      headerName: "Status",
      headerClassName: "column-header",
      headerAlign: "center",
      cellClassName: "column-cell",
      align: "center",
      disableColumnMenu: true,
      flex: 1,
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

  const pageSize = 5;

  return (
    <Container maxWidth="xl">
      <div style={{ height: "calc(100vh - 230px)", width: "100%" }}>
        <DataGrid columns={columns} rows={rows} pageSize={pageSize} />
      </div>
    </Container>
  );
};

export default FilesListOrg;
