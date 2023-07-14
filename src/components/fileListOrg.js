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

  const rows = files.map((file) => ({
    id: file.id,
    "File Name": file.name,
    "Upload Date": formatDate(file.date),
    "Uploaded By": file.uploaded_by,
    Status: file.status,
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
    // Existing columns code remains the same
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
