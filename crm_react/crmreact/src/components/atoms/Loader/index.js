import React from "react";
import PropTypes from "prop-types";
import "./index.css";
const Loader = (props) => {
  return (
    <div class="middle w-24 h-9">
      <div class="barloader barloader1"></div>
      <div class="barloader barloader2"></div>
      <div class="barloader barloader3"></div>
      <div class="barloader barloader4"></div>
      <div class="barloader barloader5"></div>
      <div class="barloader barloader6"></div>
      <div class="barloader barloader7"></div>
      <div class="barloader barloader8"></div>
    </div>
  );
};

Loader.propTypes = {};

export default Loader;
