import { array, func } from "prop-types";
import React from "react";
import "../CSS/dropZone.css";

const Banner = ({ onClick, onDrop }) => {
  const handleDragOver = (ev) => {
    ev.preventDefault();
    ev.stopPropagation();
    ev.dataTransfer.dropEffect = "copy";
  };

  const handleDrop = (ev) => {
    ev.preventDefault();
    ev.stopPropagation();
    onDrop(ev.dataTransfer.files);
  };

  return (
    <div
      className="banner"
      onClick={onClick}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <span className="banner_text">Click to Add files</span>
      <span className="banner_text">Or</span>
      <span className="banner_text">Drag and Drop files here</span>
    </div>
  );
};

const DropZone = ({ onChange, accept = ["*"] }) => {
  const inputRef = React.useRef(null);

  const handleClick = () => {
    inputRef.current.click();
  };

  const handleChange = (ev) => {
    onChange(ev.target.files);
  };

  const handleDrop = (files) => {
    onChange(files);
  };

  return (
    <div className="wrapper">
      <Banner onClick={handleClick} onDrop={handleDrop} />
      <input
        type="file"
        aria-label="add files"
        className="input"
        ref={inputRef}
        multiple="multiple"
        onChange={handleChange}
        accept={accept.join(",")}
      />
    </div>
  );
};

DropZone.propTypes = {
  accept: array,
  onChange: func,
};

export default DropZone;
