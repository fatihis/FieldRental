import React from "react";
import PropTypes from "prop-types";
import "./index.css";
const FormInputContainer = ({ children, headerText, styles }) => {
  return (
    <div
      className="input-card position-relative p-lg-3 border-1 mb-3"
      style={styles}
    >
      <div className="input-card-text position-absolute font-semibold">
        {headerText != "" ? <p className="px-2">{headerText}</p> : ""}
      </div>
      <div>{children}</div>
    </div>
  );
};

FormInputContainer.propTypes = {};

export default FormInputContainer;
