import React, { useEffect, useState } from "react";

export const MainContext = React.createContext();

export const MainContextProvider = ({ children }) => {
  const [personalList, setPersonalList] = useState([]);
  const [vehicleList, setVehicleList] = useState([]);
  const [selectedPersonal, setSelectedPersonal] = useState({});
  const [personalForTableData, setPersonalForTableData] = useState([]);
  const [newPersonal, setNewPersonal] = useState({
    name: "",
    surname: "",
    address: "",
    //   password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
    postalCode: 0,
    city: "",
    clothSize: "",
    shoeSize: "",
    education: [],
    languageCertificate: [],
    driverLicense: [],
    inventory: [],
    vehicleId: 0,
  });

  // useEffect(() => {
  //   console.log(newPersonal);
  // }, [newPersonal]);

  const newPersonalHandle = (field, value) => {
    setNewPersonal({ ...newPersonal, [field]: value });
  };
  const addNewPersonal = () => {
    fetch("http://localhost:8080/personal/create", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPersonal),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const getPersonalForTableData = () => {
    const isListExist = getPersonalList();
    var personalTableArray = [];
    if (isListExist) {
      personalList.forEach((personal, key) => {
        personalTableArray.push({
          key: key,
          name: personal.name,
          driverLisence: personal.driverLisence,
          address: personal.address,
          inventory: personal.inventory,
        });
      });
      setPersonalForTableData(personalTableArray);
      return true;
    }
    return false;
  };
  const getPersonalList = async () => {
    fetch("http://localhost:8080/personal", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((result) => {
        console.log("Success:", result);
        setPersonalList(result);
        return true;
      })
      .catch((error) => {
        console.error("Error:", error);
        return false;
      });
  };
  const contextValue = {
    personalList,
    vehicleList,
    selectedPersonal,
    personalForTableData,
    setPersonalList,
    setVehicleList,
    setSelectedPersonal,
    getPersonalList,
    getPersonalForTableData,
    newPersonalHandle,
    addNewPersonal,
  };

  return (
    <MainContext.Provider value={contextValue}>{children}</MainContext.Provider>
  );
};
