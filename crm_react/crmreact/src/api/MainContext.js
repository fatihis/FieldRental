import { json } from "d3";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { vehicleBrands } from "./manifacturerList";

export const MainContext = React.createContext();

export const MainContextProvider = ({ children }) => {
  const [personalList, setPersonalList] = useState([]);
  const [personalListAutoComplete, setPersonalListAutoComplete] = useState([]);
  const [vehicleListAutoComplete, setVehicleListAutoComplete] = useState([]);
  const [vehicleList, setVehicleList] = useState([]);
  const [selectedPersonal, setSelectedPersonal] = useState({});
  const [personalForTableData, setPersonalForTableData] = useState([]);
  const [vehicleForTableData, setVehicleForTableData] = useState([]);
  const [pageName, setPageName] = useState("");
  const [parentPageName, setParentPageName] = useState("Übersicht");
  const [singlePersonal, setSinglePersonal] = useState();
  const [singleVehicle, setSingleVehicle] = useState();
  const [manifacturers, setManifacturers] = useState();
  const [personalCount, setPersonalCount] = useState();
  const [userLogin, setUserLogin] = useState(false);
  const [vehicleCount, setVehicleCount] = useState();
  const [nonActiveVehicleCount, setNonActiveVehicleCount] = useState();

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
    driverLisence: [],
    inventory: [],
    vehicleId: "0",
  });
  const [newVehicle, setNewVehicle] = useState({
    price: 0,
    plateNumber: "",
    manifacturer: "",
    model: "",
    year: 0,
    priceCurrency: "",
    inquiryType: "",
    timeBegin: "",
    timeEnd: "",
    monthlyPrice: 0,
    lastPay: 0,
    TUVdate: "",
    lastInspection: "",
    nextInspection: "",
    tires: "",
    kilometers: 0,
    isAssigned: false,
  });

  const getPersonalCount = async () => {
    await fetch("https://react-crm-api-deutsch.herokuapp.com/personal/count/", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((result) => {
        setPersonalCount(result);
        return result;
      })
      .catch((error) => {
        console.error("Error:", error);

        return false;
      });

    return false;
  };
  const getVehicleCount = async () => {
    await fetch("https://react-crm-api-deutsch.herokuapp.com/vehicle/count/", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((result) => {
        setVehicleCount(result);
        return result;
      })
      .catch((error) => {
        console.error("Error:", error);

        return false;
      });

    return false;
  };
  const getNonActiveVehicle = async () => {
    await fetch(
      "https://react-crm-api-deutsch.herokuapp.com/vehicle/nonactivecount",
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((result) => {
        setNonActiveVehicleCount(result);
        return result;
      })
      .catch((error) => {
        console.error("Error:", error);

        return false;
      });

    return false;
  };
  const getSinglePersonal = async (id) => {
    await fetch(
      "https://react-crm-api-deutsch.herokuapp.com/personal/get/" + id,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((result) => {
        setSinglePersonal(result);

        return result;
      })
      .catch((error) => {
        console.error("Error:", error);

        return false;
      });

    return false;
  };
  const getSingleVehicle = async (id) => {
    await fetch(
      "https://react-crm-api-deutsch.herokuapp.com/vehicle/get/" + id,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((result) => {
        setSingleVehicle(result);
        return result;
      })
      .catch((error) => {
        console.error("Error:", error);

        return false;
      });

    return false;
  };
  const newPersonalHandle = (field, value) => {
    setNewPersonal({ ...newPersonal, [field]: value });
  };
  const newVehicleHandle = (field, value) => {
    setNewVehicle({ ...newVehicle, [field]: value });
  };
  const addNewPersonal = () => {
    fetch("https://react-crm-api-deutsch.herokuapp.com/personal/create", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPersonal),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success addPersonal:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  const addNewVehicle = () => {
    fetch("https://react-crm-api-deutsch.herokuapp.com/vehicle/create", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newVehicle),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success addNewVehicle:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  const getVehicleList = () => {
    fetch("https://react-crm-api-deutsch.herokuapp.com/vehicle", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((result) => {
        console.log("Success getVehicleList:", result);
        setVehicleList(result);
        return true;
      })
      .catch((error) => {
        console.error("Error:", error);
        return false;
      });
  };
  const getVehicleListID = () => {
    fetch("https://react-crm-api-deutsch.herokuapp.com/vehicle", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((result) => {
        var vehicleTableArray = [];
        result.forEach((vehicle, key) => {
          vehicleTableArray.push({
            id: vehicle._id,
            plateNumber: vehicle.plateNumber,
          });
        });
        setVehicleListAutoComplete(vehicleTableArray);
        return true;
      })
      .catch((error) => {
        console.error("Error:", error);
        return false;
      });

    return false;
  };
  const getPersonalForTableData = () => {
    fetch("https://react-crm-api-deutsch.herokuapp.com/personal", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((result) => {
        var personalTableArray = [];
        result.forEach((personal, key) => {
          personalTableArray.push({
            id: personal._id,
            key: key,
            name: personal.name + " " + personal.surname,
            driverLisence: personal.driverLisence,
            address: personal.address,
            inventory: personal.inventory,
          });
        });
        setPersonalForTableData(personalTableArray);
        return true;
      })
      .catch((error) => {
        console.error("Error:", error);
        return false;
      });

    return false;
  };
  const getVehicleForTableData = () => {
    fetch("https://react-crm-api-deutsch.herokuapp.com/vehicle", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((result) => {
        console.log("Success getVehiclesTable:", result);
        var vehicleTableArray = [];
        result.forEach((vehicle, key) => {
          vehicleTableArray.push({
            key: key,
            plateNumber: vehicle.plateNumber,
            model: vehicle.model,
            id: vehicle._id,
            price:
              vehicle.price + (vehicle.priceCurrency == "euro" ? "€" : "$"),
            inquiryType: vehicle.inquiryType,
            tires: vehicle.tires,
            kilometers: vehicle.kilometers,
          });
        });
        setVehicleForTableData(vehicleTableArray);
        return true;
      })
      .catch((error) => {
        console.error("Error:", error);
        return false;
      });

    return false;
  };

  const updatePersonal = (id, set) => {
    console.log(set, "s", id);
    fetch("https://react-crm-api-deutsch.herokuapp.com/personal/update/" + id, {
      method: "PUT", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(set),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success: updatePersonal", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  const updateVehicle = (id, sets) => {
    fetch("https://react-crm-api-deutsch.herokuapp.com/vehicle/update/" + id, {
      method: "PUT", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sets),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success updateVehicle:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  const removePersonal = (id) => {
    fetch("https://react-crm-api-deutsch.herokuapp.com/personal/delete/" + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success removePersonal:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  const removeVehicle = (id) => {
    fetch("https://react-crm-api-deutsch.herokuapp.com/vehicle/delete/" + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success removeVehicle:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  const getPersonalList = async () => {
    fetch("https://react-crm-api-deutsch.herokuapp.com/personal", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((result) => {
        var personalTableArray = [];
        result.forEach((personal, key) => {
          personalTableArray.push({
            id: personal._id,
            name: personal.name + " " + personal.surname,
          });
        });
        setPersonalListAutoComplete(personalTableArray);
        return true;
      })
      .catch((error) => {
        console.error("Error:", error);
        return false;
      });

    return false;
  };

  const getManufacturerList = () => {
    var newResults = [];
    vehicleBrands.map((element) => {
      if (
        !newResults.includes(element.name) &&
        element.Mfr_CommonName != null
      ) {
        newResults.push({ element: element.name });
      }
    });
    setManifacturers(newResults);

    // fetch(
    //   "  https://vpic.nhtsa.dot.gov/api/vehicles/getallmanufacturers?format=json",
    //   {
    //     method: "GET",
    //   }
    // )
    //   .then((response) => response.json())
    //   .then((result) => {
    //     console.log(result);
    //     debugger;
    //     var newResults = [];
    //     result.Results.map((element) => {
    //       if (
    //         !newResults.includes(element.Mfr_CommonName) &&
    //         element.Mfr_CommonName != null
    //       ) {
    //         newResults.push({ element: element.Mfr_CommonName });
    //       }
    //     });
    //     setManifacturers(newResults);
    //     return true;
    //   })
    //   .catch((error) => {
    //     console.error("Error:", error);
    //     return false;
    //   });

    // return false;
  };
  const contextValue = {
    personalList,
    vehicleList,
    selectedPersonal,
    personalForTableData,
    vehicleForTableData,
    singlePersonal,
    manifacturers,
    parentPageName,
    pageName,
    singleVehicle,
    userLogin,
    personalCount,
    personalListAutoComplete,
    vehicleListAutoComplete,
    vehicleCount,
    nonActiveVehicleCount,
    getNonActiveVehicle,
    setVehicleListAutoComplete,
    setPersonalListAutoComplete,
    getPersonalCount,
    setPersonalCount,
    setUserLogin,
    addNewVehicle,
    getVehicleForTableData,
    setPersonalList,
    getVehicleListID,
    getVehicleList,
    setVehicleList,
    setSelectedPersonal,
    getPersonalList,
    getPersonalForTableData,
    newPersonalHandle,
    addNewPersonal,
    newVehicleHandle,
    setPageName,
    setParentPageName,
    updatePersonal,
    getSinglePersonal,
    getManufacturerList,
    removePersonal,
    getSingleVehicle,
    updateVehicle,
    removeVehicle,
    getVehicleCount,
  };

  return (
    <MainContext.Provider value={contextValue}>{children}</MainContext.Provider>
  );
};
