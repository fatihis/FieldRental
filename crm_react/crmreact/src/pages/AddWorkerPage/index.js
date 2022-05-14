import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Input, Select, Button, Space, Checkbox, Row, Col } from "antd";
import { PoweroffOutlined } from "@ant-design/icons";
import "./index.css";
import FormInputContainer from "../../components/molecules/FormInputContainer";
const AddWorkerPage = (props) => {
  const [nameState, setnameState] = useState();
  const [vornameState, setVornameState] = useState();

  const [hasVehicle, setHasVehicle] = useState();
  const [currentLocation, setCurrentLocation] = useState();
  const [vehicleListState, setVehicleListState] = useState();
  const [isAssigned, setIsAssigned] = useState();
  const [isInsertSucceded, setIsInsertSucceded] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [vehicle, setVehicle] = useState();
  const [vehiclePos, setVehiclePos] = useState(false);

  const { Option } = Select;
  const setVehicleFunc = (vehicles) => {
    fetch("https://localhost:44368/Vehicle/" + vehicles, {
      "Access-Control-Allow-Origin": "*",
    })
      .then((response) => response.json())
      .then((data) => {
        setVehicle(data);
      });
    setVehiclePos(true);
  };
  useEffect(() => {
    fetch("https://localhost:44368/Vehicle", {
      "Access-Control-Allow-Origin": "*",
    })
      .then((response) => response.json())
      .then((data) => {
        setVehicleListState(data);
      });
  }, []);

  // const addNewWorker = () => {
  //   setIsInsertSucceded(true);
  //   if (vehiclePos == false) {
  //     var newWorkerData = {
  //       id: 0,
  //       fullName: nameState,
  //       workerType: workerType,
  //       hasVehicle: hasVehicle,
  //       isActive: isActive,
  //       taskAssigned: isAssigned,
  //       currentLocation: currentLocation,
  //       assignedVehicle: {
  //         id: 0,
  //         modelType: "",
  //         yearOfRegistration: "",
  //         isActive: false,
  //         isAssigned: false,
  //         assignedTo: 0,
  //       },
  //     };
  //   } else {
  //     var newWorkerData = {
  //       id: 0,
  //       fullName: nameState,
  //       workerType: workerType,
  //       hasVehicle: hasVehicle,
  //       isActive: isActive,
  //       taskAssigned: isAssigned,
  //       currentLocation: currentLocation,
  //       assignedVehicle: vehicle,
  //     };
  //   }
  //   console.log(newWorkerData);
  //   fetch("https://localhost:44368/Worker/CreateNewWorker", {
  //     method: "POST", // or 'PUT'
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(newWorkerData),
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log("Success:", data);
  //       setTimeout(() => {
  //         setIsInsertSucceded(false);
  //       }, 1000);
  //     })
  //     .catch((error) => {
  //       setTimeout(() => {
  //         setIsInsertSucceded(false);
  //       }, 1000);
  //       console.error("Error:", error);
  //     });
  // };
  return (
    <div className="  mt-20 p-10  d-flex  flex-column align-items-center justify-content-center ">
      <h2 className=" fw-bold  text-left self-center font-semibold">
        Benutzer Anlegen
      </h2>
      <div className=" d-flex flex-row align-items-start justify-content-center ">
        <div className="form-column f-column-1  d-flex flex-column align-items-start justify-content-center">
          <h5>Persönliche Daten</h5>
          <FormInputContainer headerText={"Name"}>
            <Input
              bordered={false}
              placeholder="Name"
              onChange={(e) => setnameState(e.target.value)}
            />
          </FormInputContainer>
          <FormInputContainer headerText={"Vorname"}>
            <Input
              bordered={false}
              placeholder="Vorname"
              onChange={(e) => setVornameState(e.target.value)}
            />
          </FormInputContainer>
          <FormInputContainer headerText={"Strasse"}>
            <Input
              bordered={false}
              placeholder="Strasse"
              onChange={(e) => setVornameState(e.target.value)}
            />
          </FormInputContainer>
          <FormInputContainer headerText={"PLZ"}>
            <Input
              type={"number"}
              bordered={false}
              placeholder="PLZ"
              onChange={(e) => setVornameState(e.target.value)}
            />
          </FormInputContainer>
          <FormInputContainer headerText={"Wohnort"}>
            <Input
              bordered={false}
              placeholder="Wohnort"
              onChange={(e) => setVornameState(e.target.value)}
            />
          </FormInputContainer>
        </div>
        <div className="form-column f-column-2 d-flex flex-column align-items-start justify-content-center">
          <div>
            <h5>Konfektion</h5>
            <div className="form-column f-column-1  d-flex flex-column align-items-start justify-content-center">
              <FormInputContainer headerText={"Arbeitskleidung Grösse"}>
                <Select
                  defaultValue="L"
                  bordered={false}
                  style={{ width: "100%" }}
                  onChange={(e) => setHasVehicle(e)}
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
              </FormInputContainer>
              <FormInputContainer headerText={"Schuhgrösse"}>
                <Select
                  defaultValue="42"
                  style={{ width: 300 }}
                  bordered={false}
                  onChange={(e) => setHasVehicle(e)}
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
              </FormInputContainer>
            </div>
          </div>
          <div>
            <h5>Ausbildung</h5>
            <div className="form-column f-column-1  d-flex flex-column align-items-start justify-content-center">
              <FormInputContainer headerText={"Schulabluss"}>
                <Select
                  mode="multiple"
                  allowClear
                  style={{ width: "100%" }}
                  bordered={false}
                  placeholder="Schulabluss"
                >
                  <Option value="Hauptschule">Hauptschule</Option>
                  <Option value="Realschule">Realschule</Option>
                  <Option value="Abitur">Abitur</Option>
                  <Option value="Uni">Uni</Option>
                </Select>
              </FormInputContainer>
              <FormInputContainer headerText={"Zertifikate"}>
                <Select
                  defaultValue="Z1"
                  bordered={false}
                  style={{ width: "100%" }}
                  onChange={(e) => setHasVehicle(e)}
                >
                  <Option value="Z1">Z1</Option>
                  <Option value="Z2">Z2</Option>
                  <Option value="Z3">Z3</Option>
                  <Option value="Z4">Z4</Option>
                </Select>
              </FormInputContainer>
            </div>
          </div>

          {/* {vehicleListState != undefined ? (
            <Select
              placeholder="Select a Vehicle"
              style={{ width: 220 }}
              onChange={(e) => setVehicleFunc(e)}
            >
              {vehicleListState.map((element) => {
                return (
                  <Option
                    disabled={element.isAssigned == true ? true : false}
                    value={element.id}
                  >
                    {element.id + " : " + element.modelType}
                  </Option>
                );
              })}
            </Select>
          ) : null} */}
        </div>
        <div className="form-column f-column-3  d-flex flex-column align-items-start justify-content-center">
          <div>
            <h5>Fähigkeit zu fahren</h5>
            <div className="form-column f-column-1  d-flex flex-column align-items-start justify-content-center">
              <FormInputContainer headerText={"Führerschein"}>
                <Select
                  mode="multiple"
                  allowClear
                  style={{ width: "100%" }}
                  bordered={false}
                  placeholder="Führerschein"
                >
                  <Option value="Klasse A">Klasse A</Option>
                  <Option value="Klasse B">Klasse B</Option>
                  <Option value="Klasse C">Klasse C</Option>
                  <Option value="Klasse D">Klasse D</Option>
                  <Option value="Klasse E">Klasse E</Option>
                </Select>
              </FormInputContainer>
            </div>
            <h5>Inventar</h5>
            <div className="form-column f-column-1  d-flex flex-column align-items-start justify-content-center">
              <FormInputContainer headerText={"Inventar"}>
                <Checkbox.Group style={{ width: "100%" }}>
                  <Row>
                    <Col span={8}>
                      <Checkbox value="Laptop">Laptop</Checkbox>
                    </Col>
                    <Col span={8}>
                      <Checkbox value="Firmenwagen">Firmenwagen</Checkbox>
                    </Col>
                  </Row>
                  <Col span={8}>
                    <Checkbox value="Handy">Handy</Checkbox>
                  </Col>
                </Checkbox.Group>
              </FormInputContainer>
              <Space style={{ width: 220 }}>
                <Button type="primary" loading={isInsertSucceded}>
                  ADD
                </Button>
              </Space>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

AddWorkerPage.propTypes = {};

export default AddWorkerPage;
