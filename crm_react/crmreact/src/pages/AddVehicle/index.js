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
  AutoComplete,
} from "antd";
import { AiOutlineEuroCircle, AiOutlineDollarCircle } from "react-icons/ai";
import { PoweroffOutlined } from "@ant-design/icons";
import "./index.css";
import FormInputContainer from "../../components/molecules/FormInputContainer";
import { useContext } from "react";
import { MainContext } from "../../api/MainContext";
const AddVehicle = (props) => {
  const [isInsertSucceded, setIsInsertSucceded] = useState(false);
  const [currency, setCurrency] = useState("euro");
  const [manifacturerListLocal, setManifacturerListLocal] = useState();
  const {
    newVehicleHandle,
    addNewVehicle,
    getManufacturerList,
    manifacturers,
  } = useContext(MainContext);
  const { Option } = Select;

  const euroDollarDropdown = (
    <Menu
      items={[
        {
          label: (
            <Button
              onClick={() => {
                setCurrency("euro");
                newVehicleHandle("priceCurrency", "euro");
              }}
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
              onClick={() => {
                setCurrency("dollar");
                newVehicleHandle("priceCurrency", "dollar");
              }}
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
  const searchCar = (e) => {
    setManifacturerListLocal(
      manifacturers.filter((elem) => {
        if (elem.element.includes(e)) {
          return true;
        }
      })
    );
  };
  useEffect(() => {
    getManufacturerList();
  }, []);

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
              onChange={(e) => newVehicleHandle("inquiryType", e)}
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
                onChange={(e) => newVehicleHandle("price", e.target.value)}
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
                  onChange={(e, dateString) =>
                    newVehicleHandle("timeBegin", dateString)
                  }
                />
              </FormInputContainer>
              <FormInputContainer headerText={"Ende"}>
                <DatePicker
                  onChange={(e, dateString) =>
                    newVehicleHandle("timeEnd", dateString)
                  }
                  placeholder="Datum auswählen"
                  style={{ width: "100%" }}
                />
              </FormInputContainer>
            </div>
          </div>
        </div>
        <div className="form-column f-column-2 d-flex flex-column align-items-start justify-content-center">
          <div>
            <h5>Allgemeine Information</h5>
            <FormInputContainer headerText={"Kennzeichen"}>
              <Input
                bordered={false}
                onChange={(e) =>
                  newVehicleHandle("plateNumber", e.target.value)
                }
              />
            </FormInputContainer>

            <FormInputContainer headerText={"Marke"}>
              <Input
                placeholder="Marke"
                bordered={false}
                style={{ width: "100%" }}
                onChange={(e) =>
                  newVehicleHandle("manifacturer", e.target.value)
                }
              ></Input>
            </FormInputContainer>

            {manifacturerListLocal != undefined ? (
              <FormInputContainer headerText={"Marke"}>
                <AutoComplete
                  options={manifacturerListLocal}
                  style={{ width: "100%" }}
                  onSearch={(e) => searchCar(e)}
                  onSelect={(e) => newVehicleHandle("manifacturer", e)}
                  placeholder="control mode"
                />
              </FormInputContainer>
            ) : (
              ""
            )}
            <FormInputContainer headerText={"Model"}>
              <Input
                bordered={false}
                placeholder="Model"
                onChange={(e) => newVehicleHandle("model", e.target.value)}
              />
            </FormInputContainer>
            <FormInputContainer headerText={"Jahr"}>
              <Input
                bordered={false}
                placeholder="Jahr"
                type={"number"}
                onChange={(e) => newVehicleHandle("year", e.target.value)}
              />
            </FormInputContainer>
            <h5>Raten</h5>
            <div className="form-column f-column-1  d-flex flex-column align-items-start justify-content-center">
              <FormInputContainer headerText={"Monatliche Rate"}>
                <Input
                  bordered={false}
                  placeholder="Monatliche Rate"
                  type={"number"}
                  onChange={(e) =>
                    newVehicleHandle("monthlyPrice", e.target.value)
                  }
                />
              </FormInputContainer>
              <FormInputContainer headerText={"Schlussrate"}>
                <Input
                  bordered={false}
                  placeholder="Schlussrate"
                  type={"number"}
                  onChange={(e) => newVehicleHandle("lastPay", e.target.value)}
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
            <h5>TÜV</h5>

            <FormInputContainer headerText={"Restwert"}>
              <DatePicker
                placeholder="Datum auswählen"
                style={{ width: "100%" }}
                picker="month"
                onChange={(e, dateString) =>
                  newVehicleHandle("TUVdate", dateString)
                }
              />
            </FormInputContainer>
            <div>
              <h5>Inspektion</h5>
              <FormInputContainer headerText={"letzte Inspektion"}>
                <DatePicker
                  placeholder="Datum auswählen"
                  style={{ width: "100%" }}
                  onChange={(e, dateString) =>
                    newVehicleHandle("lastInspection", dateString)
                  }
                />
              </FormInputContainer>
              <FormInputContainer headerText={"nächste Inspektion"}>
                <DatePicker
                  placeholder="Datum auswählen"
                  style={{ width: "100%" }}
                  onChange={(e, dateString) =>
                    newVehicleHandle("nextInspection", dateString)
                  }
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
                  onChange={(e) => newVehicleHandle("tires", e)}
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
                  onChange={(e) =>
                    newVehicleHandle("kilometers", e.target.value)
                  }
                />
              </FormInputContainer>
            </div>
            <Space style={{ width: 220 }}>
              <Button
                onClick={addNewVehicle}
                type="primary"
                loading={isInsertSucceded}
              >
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
