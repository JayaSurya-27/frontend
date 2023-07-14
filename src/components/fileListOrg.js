import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import GetAppIcon from "@mui/icons-material/GetApp";
import Container from "@mui/material/Container";
import API_ENDPOINT from "../apiEndpoint";
import axios from "axios";

const FilesListOrg = ({ files, getFiles }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    if (isNaN(date)) {
      return "";
    }
    const options = { year: "numeric", month: "short", day: "numeric" };
    return date.toLocaleDateString(undefined, options);
  };

  const rows = files.map((file) => ({
    id: file.id,
    "File Name": file.name,
    "Upload Date": formatDate(file.date),
    "Uploaded By": file.uploaded_by,
    "Status": file.status,
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
      field: "owner",
      headerName: "owner",
      headerClassName: "column-header",
      headerAlign: "center",
      cellClassName: "column-cell",
      disableColumnMenu: true,
      align: "center",
      flex: 1,
    },
    {
      field: "status", // Add the "status" field
      headerName: "Status",
      headerClassName: "column-header",
      headerAlign: "center",
      cellClassName: "column-cell",
      disableColumnMenu: true,
      align: "center",
      flex: 1,
    },
    {
      field: "actions",
      headerName: "",
      headerClassName: "column-header",
      cellClassName: "column-cell",
      flex: 1,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      align: "center",
      renderCell: (params) => params.value,
    },
  ];

  const pageSize = 5; // Set the number of rows per page

  return (
    <Container maxWidth="xl">
      <div style={{ height: "calc(100vh - 230px)", width: "100%" }}>
        <DataGrid columns={columns} rows={rows} pageSize={pageSize} />
      </div>
    </Container>
  );
};

export default FilesListOrg;
