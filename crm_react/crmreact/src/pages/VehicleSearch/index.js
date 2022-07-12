import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { MainContext } from "../../api/MainContext";
import { AutoComplete, Input } from "antd";
import { Link } from "react-router-dom";
const VehicleSearch = (props) => {
  const mainContext = useContext(MainContext);
  const [vehicleListLocal, setVehicleListLocal] = useState([]);
  const [options, setOptions] = useState([]);
  useEffect(() => {
    mainContext.getVehicleListID();
    mainContext.setPageName("Fahrzeug Berarbeiten");
    mainContext.setParentPageName("Vehicle");
  }, []);
  useEffect(() => {
    setVehicleListLocal(mainContext.vehicleListAutoComplete);
  }, [mainContext.vehicleListAutoComplete]);

  const handleSearch = (value) => {
    const results = searchResult(value);
    var filteredResults = results.filter((element) => {
      return element !== undefined;
    });
    setOptions(value ? filteredResults : []);
  };
  const onSelect = (value) => {
    console.log("onSelect", value);
  };
  const searchResult = (searchName) =>
    vehicleListLocal.map((value, idx) => {
      const category = `${searchName}${idx}`;
      var linkTo = "/fahrzeug-berarbeiten/" + value.id;
      if (value.plateNumber.toLowerCase().includes(searchName.toLowerCase())) {
        return {
          label: (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <Link
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                to={linkTo}
              >
                {value.plateNumber}
              </Link>
            </div>
          ),
        };
      }
    });
  return (
    <div className="w-100 h-100 d-flex align-items-center justify-content-center">
      {vehicleListLocal.length != 0 ? (
        <AutoComplete
          dropdownMatchSelectWidth={252}
          style={{
            width: 600,
          }}
          options={options}
          onSelect={onSelect}
          onSearch={handleSearch}
        >
          <Input.Search size="large" placeholder="Name" enterButton />
        </AutoComplete>
      ) : (
        ""
      )}
    </div>
  );
};

VehicleSearch.propTypes = {};

export default VehicleSearch;
