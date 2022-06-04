import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { MainContext } from "../../api/MainContext";
import { Input, Select, Button, Space, Checkbox, Row, Col } from "antd";

import EditInputContainer from "../../components/molecules/EditInputContainer";
import { useParams, useNavigate } from "react-router-dom";
import "./index.css";
const VehicleDetails = (props) => {
  const mainContext = useContext(MainContext);
  const { Option } = Select;
  const [isEditable, setisEditable] = useState(true);
  const [buttonName, setButtonName] = useState("EDIT");
  const [changedAttributes, setChangedAttributes] = useState();
  const [buttonUsed, setButtonUsed] = useState(false);
  const {
    updatePersonal,
    getSinglePersonal,
    singlePersonal,
    setParentPageName,
    setPageName,
    vehicleList,
    removePersonal,
  } = useContext(MainContext);
  let { id } = useParams();
  let navigate = useNavigate();

  const editeHandle = () => {
    if (buttonName === "SAVE") {
      updatePersonal(id, changedAttributes);
      setButtonUsed(true);
    }
    setisEditable(!isEditable);
    setButtonName(buttonName == "EDIT" ? "SAVE" : "EDIT");
  };
  useEffect(() => {
    navigate("../benutzerverwaltung/" + id, { replace: true });
  }, [buttonUsed]);

  useEffect(() => {
    debugger;
    const personal = getSinglePersonal(id);
    console.log(personal, "got");
    setParentPageName("Personal");
    setPageName("Benutzerverwaltung");
  }, []);
  useEffect(() => {
    setChoosen(singlePersonal);
    debugger;
    console.log(singlePersonal);
  }, [singlePersonal]);

  const [choosen, setChoosen] = useState({
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
    vehicleId: 0,
  });
  const [vehicleListLocal, setVehicleListLocal] = useState();
  useEffect(() => {
    setVehicleListLocal(vehicleList);
  }, [vehicleList]);
  const updatePersonalHandle = (field, value) => {
    var updateElement = {
      [field]: value,
    };
    setChangedAttributes(updateElement);
  };
  return (
    <div className="w-100 h-100 px-10 py-10 ">
      <div className="d-flex ">
        <div className=" w-52 h-52 p-5 bg-slate-100 flex align-items-center justify-center">
          photos belki
        </div>
        <div className="d-flex align-items-end pb-4">
          {" "}
          <Space
            style={{
              width: 220,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Button
              style={{ width: 120, height: 40 }}
              type="primary"
              danger
              onClick={() => {
                removePersonal(id);
                setButtonUsed(true);
                setTimeout(() => {
                  window.location.reload();
                }, 2000);
              }}
              loading={false}
            >
              löschen
            </Button>
          </Space>
        </div>
        <div className="d-flex align-items-end gap-3 pb-3">
          <a href="#issues">Ausgaben</a>
          <a href="#issues">Anmerkungen</a>
        </div>
      </div>
      {choosen != undefined ? (
        <div className="container-ro rounded-sm w-100 h-100  flex bg-slate-200  ">
          <div className="field-wrapper flex-1 w-100 h-100 p-10">
            <div className="field-container w-100 h-28 flex flex-col">
              <EditInputContainer headerText={"Name"}>
                <Input
                  bordered={false}
                  placeholder="Name"
                  onChange={(e) => updatePersonalHandle("name", e.target.value)}
                  defaultValue={choosen.name}
                  disabled={isEditable}
                />
              </EditInputContainer>
              <EditInputContainer headerText={"Vorname"}>
                <Input
                  bordered={false}
                  placeholder="Vorname"
                  defaultValue={choosen.surname}
                  disabled={isEditable}
                  onChange={(e) =>
                    updatePersonalHandle("surname", e.target.value)
                  }
                />
              </EditInputContainer>
              <EditInputContainer headerText={"Strasse"}>
                <Input
                  bordered={false}
                  placeholder="Strasse"
                  defaultValue={choosen.address}
                  disabled={isEditable}
                  onChange={(e) =>
                    updatePersonalHandle("address", e.target.value)
                  }
                />
              </EditInputContainer>
              <EditInputContainer headerText={"PLZ"}>
                <Input
                  type={"number"}
                  bordered={false}
                  placeholder="PLZ"
                  defaultValue={choosen.postalCode}
                  disabled={isEditable}
                  onChange={(e) =>
                    updatePersonalHandle("postalCode", e.target.value)
                  }
                />
              </EditInputContainer>
              <EditInputContainer headerText={"Wohnort"}>
                <Input
                  bordered={false}
                  placeholder="Wohnort"
                  defaultValue={choosen.city}
                  disabled={isEditable}
                  onChange={(e) => updatePersonalHandle("city", e.target.value)}
                />
              </EditInputContainer>
            </div>
          </div>
          <div className="field-wrapper flex-1 w-100 h-100 p-10">
            <EditInputContainer headerText={"Arbeitskleidung Grösse"}>
              <Select
                bordered={false}
                style={{ width: "280px" }}
                defaultValue={choosen.clothSize}
                disabled={isEditable}
                onChange={(e) => updatePersonalHandle("clothSize", e)}
              >
                <Option value="XS">XS</Option>
                <Option value="S">S</Option>
                <Option value="M">M</Option>
                <Option value="L">L</Option>
                <Option value="XL">XL</Option>
                <Option value="XXL">XXL</Option>
                <Option value="3XL">3XL</Option>
                <Option value="4XL">4XL</Option>
              </Select>
            </EditInputContainer>
            <EditInputContainer headerText={"Schuhgrösse"}>
              <Select
                style={{ width: 300 }}
                bordered={false}
                defaultValue={choosen.shoeSize}
                disabled={isEditable}
                onChange={(e) => updatePersonalHandle("shoeSize", e)}
              >
                <Option value="36">36</Option>
                <Option value="36.5">36.5</Option>
                <Option value="37">37</Option>
                <Option value="37.5">37.5</Option>
                <Option value="38">38</Option>
                <Option value="39">39</Option>
                <Option value="39.5">39.5</Option>
                <Option value="40">40</Option>
                <Option value="40.5">40.5</Option>
                <Option value="41">41</Option>
                <Option value="41.5">41.5</Option>
                <Option value="42">42</Option>
                <Option value="42.5">42.5</Option>
                <Option value="43">43</Option>
                <Option value="43.5">43.5</Option>
                <Option value="44">44</Option>
                <Option value="44.5">44.5</Option>
                <Option value="45">45</Option>
                <Option value="45.5">45.5</Option>
                <Option value="46">46</Option>
              </Select>
            </EditInputContainer>
            <div className="form-column f-column-1  d-flex flex-column align-items-start justify-content-center">
              <EditInputContainer headerText={"Schulabluss"}>
                <Select
                  mode="multiple"
                  allowClear
                  style={{ width: "300px" }}
                  bordered={false}
                  placeholder="Schulabluss"
                  defaultValue={choosen.education}
                  disabled={isEditable}
                  onChange={(e) => updatePersonalHandle("education", e)}
                >
                  <Option value="Hauptschule">Hauptschule</Option>
                  <Option value="Realschule">Realschule</Option>
                  <Option value="Abitur">Abitur</Option>
                  <Option value="Uni">Uni</Option>
                </Select>
              </EditInputContainer>
              <EditInputContainer headerText={"Zertifikate"}>
                <Select
                  mode="multiple"
                  defaultValue={choosen.languageCertificate}
                  disabled={isEditable}
                  bordered={false}
                  style={{ width: "300px" }}
                  onChange={(e) =>
                    updatePersonalHandle("languageCertificate", e)
                  }
                >
                  <Option value="Z1">Z1</Option>
                  <Option value="Z2">Z2</Option>
                  <Option value="Z3">Z3</Option>
                  <Option value="Z4">Z4</Option>
                </Select>
              </EditInputContainer>
            </div>
          </div>
          <div className="field-wrapper flex-1 w-100 h-100 p-10">
            <EditInputContainer headerText={"Führerschein"}>
              <Select
                mode="multiple"
                allowClear
                style={{ width: "300px" }}
                bordered={false}
                defaultValue={choosen.driverLicense}
                disabled={isEditable}
                placeholder="Führerschein"
                onChange={(e) => updatePersonalHandle("driverLicense", e)}
              >
                <Option value="Klasse A">Klasse A</Option>
                <Option value="Klasse B">Klasse B</Option>
                <Option value="Klasse C">Klasse C</Option>
                <Option value="Klasse D">Klasse D</Option>
                <Option value="Klasse E">Klasse E</Option>
              </Select>
            </EditInputContainer>
            <EditInputContainer headerText={"Inventar"}>
              <Checkbox.Group
                style={{ width: "300px" }}
                onChange={(e) => updatePersonalHandle("inventory", e)}
              >
                <Row>
                  <Col span={8}>
                    <Checkbox
                      disabled={isEditable}
                      checked={choosen.inventory.includes("Laptop")}
                      value="Laptop"
                    >
                      Laptop
                    </Checkbox>
                  </Col>
                  <Col span={8}>
                    <Checkbox
                      disabled={isEditable}
                      checked={choosen.inventory.includes("Firmenwagen")}
                      value="Firmenwagen"
                    >
                      Firmenwagen
                    </Checkbox>
                  </Col>
                </Row>
                <Col span={8}>
                  <Checkbox
                    disabled={isEditable}
                    checked={choosen.inventory.includes("Handy")}
                    value="Handy"
                  >
                    Handy
                  </Checkbox>
                </Col>
              </Checkbox.Group>
            </EditInputContainer>
            {vehicleListLocal != undefined ? (
              <EditInputContainer headerText={"Firmenwagen"}>
                <Select
                  disabled={isEditable}
                  placeholder="Select a Vehicle"
                  style={{ width: 280 }}
                  defaultValue={choosen.vehicleId}
                  onChange={(e) => updatePersonalHandle("vehicleId", e)}
                >
                  {vehicleListLocal.map((element) => {
                    return (
                      <Option
                        disabled={element.isAssigned === true ? true : false}
                        value={element._id}
                      >
                        {element._id}
                      </Option>
                    );
                  })}
                </Select>
              </EditInputContainer>
            ) : (
              ""
            )}
            <Space
              style={{
                width: 220,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Button
                style={{ width: 120, height: 60 }}
                type="primary"
                onClick={() => {
                  editeHandle();
                }}
                loading={false}
              >
                {buttonName}
              </Button>
            </Space>
          </div>
        </div>
      ) : (
        <div>no data found</div>
      )}
    </div>
  );
};
// const [newVehicle, setNewVehicle] = useState({
//   price: 0,
//   priceCurrency: "",
//   inquiryType: "",
//   timeBegin: "",
//   timeEnd: "",
//   monthlyPrice: 0,
//   lastPay: 0,
//   TUVdate: "",
//   lastInspection: "",
//   nextInspection: "",
//   tires: "",
//   kilometers: 0,
// });
VehicleDetails.propTypes = {};

export default VehicleDetails;
