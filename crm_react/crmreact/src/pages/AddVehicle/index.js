import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  Input,
  Select,
  Button,
  Space,
  Checkbox,
  Row,
  Col,
  Menu,
  Dropdown,
  DatePicker,
} from "antd";

import { AiOutlineEuroCircle, AiOutlineDollarCircle } from "react-icons/ai";
import { PoweroffOutlined } from "@ant-design/icons";
import "./index.css";
import FormInputContainer from "../../components/molecules/FormInputContainer";
const AddVehicle = (props) => {
  const [nameState, setnameState] = useState();
  const [vornameState, setVornameState] = useState();
  const [hasVehicle, setHasVehicle] = useState();
  const [isInsertSucceded, setIsInsertSucceded] = useState(false);
  const [currency, setCurrency] = useState("euro");

  const { Option } = Select;

  const euroDollarDropdown = (
    <Menu
      items={[
        {
          label: (
            <Button
              onClick={() => setCurrency("euro")}
              className=" border-0"
              size={25}
            >
              <AiOutlineEuroCircle color="black" size={25} />
            </Button>
          ),
        },
        {
          label: (
            <Button
              onClick={() => setCurrency("dollar")}
              className=" border-0"
              size={25}
            >
              <AiOutlineDollarCircle color="black" size={25} />
            </Button>
          ),
        },
      ]}
    />
  );
  return (
    <div className="  mt-20 p-10  d-flex  flex-column align-items-center justify-content-center ">
      <h2 className="  fw-bold  text-left self-center font-semibold">
        Fahrzeug Anlegen
      </h2>
      <div className=" d-flex flex-row align-items-start justify-content-center ">
        <div className="form-column f-column-1  d-flex flex-column align-items-start justify-content-center">
          <h5>Anschaffungsart</h5>
          <FormInputContainer headerText={""}>
            <Select
              defaultValue="Geleast"
              bordered={false}
              style={{ width: "100%" }}
              onChange={(e) => setHasVehicle(e)}
            >
              <Option value="geleast">Geleast</Option>
              <Option value="Finaziert">Finaziert</Option>
              <Option value="Barkauf">Barkauf</Option>
              <Option value="Mietkauf">Mietkauf</Option>
            </Select>
          </FormInputContainer>
          <hr class="rounded-separator"></hr>
          <FormInputContainer headerText={"Kaufwert"}>
            <div className="d-flex ">
              <Input
                bordered={false}
                placeholder="Kaufwert"
                type={"number"}
                onChange={(e) => setVornameState(e.target.value)}
              />
              <div className="w-20 d-flex align-items-center justify-content-center">
                <Dropdown overlay={euroDollarDropdown}>
                  <a onClick={(e) => e.preventDefault()}>
                    <Space>
                      {currency == "euro" ? (
                        <AiOutlineEuroCircle color="black" size={25} />
                      ) : (
                        <AiOutlineDollarCircle color="black" size={25} />
                      )}
                    </Space>
                  </a>
                </Dropdown>
              </div>
            </div>
          </FormInputContainer>
          <div>
            <h5>Laufzeit</h5>
            <div className="form-column f-column-1  d-flex flex-column align-items-start justify-content-center">
              <FormInputContainer headerText={"Beginn"}>
                <DatePicker
                  placeholder="Datum auswählen"
                  style={{ width: "100%" }}
                />
              </FormInputContainer>
              <FormInputContainer headerText={"Ende"}>
                <DatePicker
                  placeholder="Datum auswählen"
                  style={{ width: "100%" }}
                />
              </FormInputContainer>
            </div>
          </div>
        </div>
        <div className="form-column f-column-2 d-flex flex-column align-items-start justify-content-center">
          <div>
            <h5>Raten</h5>
            <div className="form-column f-column-1  d-flex flex-column align-items-start justify-content-center">
              <FormInputContainer headerText={"Monatliche Rate"}>
                <Input
                  bordered={false}
                  placeholder="Monatliche Rate"
                  type={"number"}
                  onChange={(e) => setVornameState(e.target.value)}
                />
              </FormInputContainer>
              <FormInputContainer headerText={"Schlussrate"}>
                <Input
                  bordered={false}
                  placeholder="Schlussrate"
                  type={"number"}
                  onChange={(e) => setVornameState(e.target.value)}
                />
              </FormInputContainer>
              <h5>TÜV</h5>

              <FormInputContainer headerText={"Restwert"}>
                <DatePicker
                  placeholder="Datum auswählen"
                  style={{ width: "100%" }}
                  picker="month"
                />
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
            <div>
              <h5>Inspektion</h5>
              <FormInputContainer headerText={"letzte Inspektion"}>
                <DatePicker
                  placeholder="Datum auswählen"
                  style={{ width: "100%" }}
                />
              </FormInputContainer>
              <FormInputContainer headerText={"nächste Inspektion"}>
                <DatePicker
                  placeholder="Datum auswählen"
                  style={{ width: "100%" }}
                />
              </FormInputContainer>
            </div>
            <hr class="rounded-separator"></hr>

            <div>
              <FormInputContainer headerText={"Bereifung"}>
                <Select
                  defaultValue="Allwetter"
                  style={{ width: 300 }}
                  bordered={false}
                  onChange={(e) => setHasVehicle(e)}
                >
                  <Option value="Sommer">Sommer</Option>
                  <Option value="Winter">Winter</Option>
                  <Option value="Allwetter">Allwetter</Option>
                </Select>
              </FormInputContainer>
            </div>
            <hr class="rounded-separator"></hr>

            <div>
              <FormInputContainer headerText={"Kilometerstand"}>
                <Input
                  bordered={false}
                  placeholder="Kilometerstand"
                  type={"number"}
                  onChange={(e) => setVornameState(e.target.value)}
                />
              </FormInputContainer>
            </div>
            <Space style={{ width: 220 }}>
              <Button type="primary" loading={isInsertSucceded}>
                ADD
              </Button>
            </Space>
          </div>
        </div>
      </div>
    </div>
  );
};

AddVehicle.propTypes = {};

export default AddVehicle;
