import React from "react";
import PropTypes from "prop-types";
import "./index.css";
// import { ExternalLink } from "react-feather";

const DashboardCard = ({ cardImage, cardHeader, cardText, cardBg }) => {
  return (
    <div
      className="dashboard-card w-72 h-32 flex rounded-xl flex relative "
      style={{ backgroundColor: cardBg }}
    >
      <div className="absolute top-3 right-3">
        {/* <a href="#">
          <ExternalLink color="gray" size={20} />{" "}
        </a> */}
      </div>
      <div className="db-card-image  w-full h-full flex items-center flex-1 justify-center ">
        <div
          className=" d-flex items-center justify-center   card-img p-2  rounded-xl"
          // style={{ opacity: 30, backgroundColor: cardBg }}
        >
          {cardImage}
        </div>
      </div>
      <div className="db-card-text-container flex flex-col items-center justify-center flex-2  w-full h-full pt-4">
        <p className="font-italic text-md pr-2">{cardHeader}</p>
        <p className="font-bold pr-2">{cardText}</p>
      </div>
    </div>
  );
};

DashboardCard.propTypes = {};

export default DashboardCard;
