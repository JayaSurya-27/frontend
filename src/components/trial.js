import React from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Container } from "@mui/material";
import API_ENDPOINT from "../apiEndpoint";
import axios from "axios";
import "./../CSS/trial.css";

const Trial = ({ files, getFiles }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    if (isNaN(date)) {
      return "";
    }
    const options = { year: "numeric", month: "short", day: "numeric" };
    return date.toLocaleDateString(undefined, options);
  };

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
    const apiUrl = `${API_ENDPOINT}api/individual/deleteFile/${file.id}`;
    axios
      .delete(apiUrl)
      .then((response) => {
        getFiles();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const actionsBodyTemplate = (rowData) => {
    return (
      <>
        <span
          className="material-symbols-outlined"
          onClick={() => handleDownload(rowData)}
          style={{ marginRight: "15px", fontSize: "1.9rem", cursor: "pointer" }}
        >
          download
        </span>
        <span
          className="material-symbols-outlined"
          onClick={() => handleDelete(rowData)}
          style={{
            marginRight: "10px",
            color: "red",
            fontSize: "1.6rem",
            cursor: "pointer",
          }}
        >
          delete
        </span>
      </>
    );
  };

  const columns = [
    {
      field: "name",
      header: "File Name",
      sortable: true,
      filter: true,
      style: { minWidth: "14rem" },
    },
    {
      field: "date",
      header: "Upload Date",
      sortable: true,
      filter: true,
      style: { minWidth: "8rem" },
      body: (rowData) => formatDate(rowData.date),
    },
    {
      field: "uploaded_by",
      header: "Uploaded By",
      sortable: true,
      filter: true,
      style: { minWidth: "10rem" },
    },
    {
      header: "",
      body: actionsBodyTemplate,
      style: { width: "180px", textAlign: "center" },
    },
  ];

  const pageSize = 5; // Set the number of rows per page

  return (
    <Container maxWidth="xl">
      <div style={{ height: "calc(100vh - 230px)", width: "100%" }}>
        <DataTable
          value={files}
          paginator
          className="p-datatable-customers"
          rows={pageSize}
          rowsPerPageOptions={[pageSize, 10, 20]}
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
          emptyMessage="No files found."
        >
          {columns.map((col) => (
            <Column
              key={col.field}
              field={col.field}
              header={col.header}
              sortable={col.sortable}
              filter={col.filter}
              body={col.body}
              style={col.style}
            />
          ))}
        </DataTable>
      </div>
    </Container>
  );
};

export default Trial;
