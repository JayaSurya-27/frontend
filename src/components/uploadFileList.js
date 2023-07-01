import React, { useCallback } from "react";
// import CheckIcon from "../check";
// import ClearIcon from "../clear";
import "../CSS/uploadFileList.css";

const FilesListItem = ({ name, id, onClear, uploadComplete }) => {
  const handleClear = useCallback(() => {
    onClear(id);
  }, []);

  const CheckIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );

  const ClearIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      color="red"
    >
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );

  return (
    <li className="files_list_item">
      <span className="files_list_item_name">{name}</span>
      {!uploadComplete ? (
        <span
          className="files_list_item_clear"
          role="button"
          aria-label="remove file"
          onClick={handleClear}
        >
          <ClearIcon />
        </span>
      ) : (
        <span role="img" className="file_list_item_check">
          <CheckIcon />
        </span>
      )}
    </li>
  );
};

const FilesList = ({ files, onClear, uploadComplete }) => {
  return (
    <ul className="files_list">
      {files.map(({ file, id }) => (
        <FilesListItem
          name={file.name}
          key={id}
          id={id}
          onClear={onClear}
          uploadComplete={uploadComplete}
        />
      ))}
    </ul>
  );
};

export default FilesList;
