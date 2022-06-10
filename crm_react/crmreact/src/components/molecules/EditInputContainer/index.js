import React from "react";
import PropTypes from "prop-types";
import "./index.css";
const EditInputContainer = ({ children, headerText, styles }) => {
  return (
    <div
      className="input-card-edit position-relative flex align-items-center justify-content-between p-lg-3 mb-3"
      style={styles}
    >
      <div className="input-card-text-edit  font-semibold">
        {headerText != "" ? <p className="px-2 mb-0">{headerText}</p> : ""}
      </div>
      <div>{children}</div>
    </div>
  );
};

EditInputContainer.propTypes = {};

export default EditInputContainer;
