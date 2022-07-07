import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { MainContext } from "../../api/MainContext";
import { AutoComplete, Input } from "antd";
import { Link } from "react-router-dom";
const PersonalSearch = (props) => {
  const mainContext = useContext(MainContext);
  const [personalListLocal, setPersonalListLocal] = useState([]);
  const [options, setOptions] = useState([]);
  useEffect(() => {
    mainContext.getPersonalList();
    mainContext.setPageName("Benutzerverwaltung");
    mainContext.setParentPageName("Personal");
  }, []);
  useEffect(() => {
    setPersonalListLocal(mainContext.personalListAutoComplete);
  }, [mainContext.personalListAutoComplete]);

  const handleSearch = (value) => {
    debugger;
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
    personalListLocal.map((value, idx) => {
      const category = `${searchName}${idx}`;
      var linkTo = "/benutzerverwaltung/" + value.id;
      if (value.name.toLowerCase().includes(searchName.toLowerCase())) {
        return {
          value: category,
          label: (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
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
                {value.name}
              </Link>
            </div>
          ),
        };
      }
    });
  return (
    <div className="w-100 h-100 d-flex align-items-center justify-content-center">
      {personalListLocal.length != 0 ? (
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

PersonalSearch.propTypes = {};

export default PersonalSearch;
