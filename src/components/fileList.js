import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import GetAppIcon from "@mui/icons-material/GetApp";
import Container from "@mui/material/Container";
import API_ENDPOINT from "../apiEndpoint";
import axios from "axios";

const FilesList = ({ files, getFiles }) => {
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
    actions: (
      <>
        <span
          className="material-symbols-outlined"
          onClick={() => handleDownload(file)}
          style={{ marginRight: "15px", fontSize: "1.9rem" }}
        >
          download
        </span>
        <span
          className="material-symbols-outlined"
          onClick={() => handleDelete(file)}
          style={{ marginRight: "10px", color: "red", fontSize: "1.6rem" }}
        >
          delete
        </span>
      </>
    ),
  }));

  const handleDownload = async (file) => {
    try {
      const apiUrl = `${API_ENDPOINT}api/individual/downloadFile/${file.id}`;
      const response = await axios.get(apiUrl, {
        responseType: "blob",
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const a = document.createElement("a");
      a.href = url;
      a.download = file.name;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = (file) => {
    const apiUrl = API_ENDPOINT + "api/individual/deleteFile/" + file.id;
    axios
      .delete(apiUrl)
      .then((response) => {
        getFiles();
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
      field: "Uploaded By",
      headerName: "Uploaded By",
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

export default FilesList;
