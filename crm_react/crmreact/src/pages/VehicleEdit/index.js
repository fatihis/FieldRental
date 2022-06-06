import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { MainContext } from "../../api/MainContext";
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

import EditInputContainer from "../../components/molecules/EditInputContainer";
import { useParams, useNavigate } from "react-router-dom";
import "./index.css";
const VehicleEdit = (props) => {
  const mainContext = useContext(MainContext);
  const { Option } = Select;
  const [isEditable, setisEditable] = useState(true);
  const [buttonName, setButtonName] = useState("EDIT");
  const [changedAttributes, setChangedAttributes] = useState();
  const [buttonUsed, setButtonUsed] = useState(false);
  const [currency, setCurrency] = useState("euro");
  const {
    updateVehicle,
    getSingleVehicle,
    setParentPageName,
    setPageName,
    removeVehicle,

    singleVehicle,
  } = useContext(MainContext);
  let { id } = useParams();
  let navigate = useNavigate();

  const editeHandle = () => {
    if (buttonName === "SAVE") {
      updateVehicle(id, changedAttributes);
      setButtonUsed(true);
    }
    setisEditable(!isEditable);
    setButtonName(buttonName == "EDIT" ? "SAVE" : "EDIT");
  };
  useEffect(() => {
    navigate("../fahrzeug-berarbeiten/" + id, { replace: true });
  }, [buttonUsed]);

  useEffect(() => {
    getSingleVehicle(id);
    setPageName("Fuhrpark");
    setParentPageName("Fahrzeug Berarbeiten");
  }, []);

  const [choosen, setChoosen] = useState({
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
  });
  useEffect(() => {
    console.log(singleVehicle);

    setChoosen(singleVehicle);
    // setCurrency(choosen.priceCurrency);
  }, [singleVehicle]);

  const updateVehicleHandle = (field, value) => {
    var updateElement = {
      [field]: value,
    };
    setChangedAttributes(updateElement);
  };
  const euroDollarDropdown = (
    <Menu
      items={[
        {
          label: (
            <Button
              onClick={() => {
                setCurrency("euro");
                updateVehicleHandle("priceCurrency", "euro");
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
                updateVehicleHandle("priceCurrency", "dollar");
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
                removeVehicle(id);
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
              <EditInputContainer headerText={""}>
                <Select
                  value={choosen.inquiryType}
                  bordered={false}
                  disabled={isEditable}
                  style={{ width: "100%" }}
                  onChange={(e) => updateVehicleHandle("inquiryType", e)}
                >
                  <Option value="geleast">Geleast</Option>
                  <Option value="Finaziert">Finaziert</Option>
                  <Option value="Barkauf">Barkauf</Option>
                  <Option value="Mietkauf">Mietkauf</Option>
                </Select>
              </EditInputContainer>
              <hr class="rounded-separator"></hr>
              <EditInputContainer headerText={"Kaufwert"}>
                <div className="d-flex ">
                  <Input
                    value={choosen.price}
                    bordered={false}
                    disabled={isEditable}
                    placeholder="Kaufwert"
                    type={"number"}
                    onChange={(e) =>
                      updateVehicleHandle("price", e.target.value)
                    }
                  />
                  <div className="w-20 d-flex align-items-center justify-content-center">
                    <Dropdown className="d-flex" overlay={euroDollarDropdown}>
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
              </EditInputContainer>
              <EditInputContainer headerText={"Datum auswählen Beginn"}>
                <DatePicker
                  disabled={isEditable}
                  placeholder={choosen.timeBegin}
                  style={{ width: "100%" }}
                  onChange={(e, dateString) =>
                    updateVehicleHandle("timeBegin", dateString)
                  }
                />
              </EditInputContainer>
              <EditInputContainer headerText={"Datum auswählen Ende"}>
                <DatePicker
                  onChange={(e, dateString) =>
                    updateVehicleHandle("timeEnd", dateString)
                  }
                  disabled={isEditable}
                  placeholder={choosen.timeEnd}
                  style={{ width: "100%" }}
                />
              </EditInputContainer>
              <EditInputContainer headerText={"Monatliche Rate"}>
                <Input
                  bordered={false}
                  placeholder="Monatliche Rate"
                  value={choosen.monthlyPrice}
                  disabled={isEditable}
                  type={"number"}
                  onChange={(e) =>
                    updateVehicleHandle("monthlyPrice", e.target.value)
                  }
                />
              </EditInputContainer>
              <EditInputContainer headerText={"Schlussrate"}>
                <Input
                  bordered={false}
                  placeholder="Schlussrate"
                  disabled={isEditable}
                  type={"number"}
                  value={choosen.lastPay}
                  onChange={(e) =>
                    updateVehicleHandle("lastPay", e.target.value)
                  }
                />
              </EditInputContainer>
            </div>
          </div>
          <div className="field-wrapper flex-1 w-100 h-100 p-10">
            <EditInputContainer headerText={"Kennzeichen"}>
              <Input
                disabled={isEditable}
                bordered={false}
                value={choosen.plateNumber}
                onChange={(e) =>
                  updateVehicleHandle("plateNumber", e.target.value)
                }
              />
            </EditInputContainer>

            <EditInputContainer headerText={"Marke"}>
              <Input
                placeholder="Marke"
                disabled={isEditable}
                bordered={false}
                style={{ width: "100%" }}
                value={choosen.manifacturer}
                onChange={(e) =>
                  updateVehicleHandle("manifacturer", e.target.value)
                }
              ></Input>
            </EditInputContainer>
            <div className="form-column f-column-1  d-flex flex-column align-items-start justify-content-center">
              <EditInputContainer headerText={"Model"}>
                <Input
                  bordered={false}
                  disabled={isEditable}
                  placeholder="Model"
                  value={choosen.model}
                  onChange={(e) => updateVehicleHandle("model", e.target.value)}
                />
              </EditInputContainer>
              <EditInputContainer headerText={"Jahr"}>
                <Input
                  bordered={false}
                  disabled={isEditable}
                  placeholder="Jahr"
                  value={choosen.year}
                  type={"number"}
                  onChange={(e) => updateVehicleHandle("year", e.target.value)}
                />
              </EditInputContainer>
            </div>
          </div>
          <div className="field-wrapper flex-1 w-100 h-100 p-10">
            <EditInputContainer headerText={"Restwert TUV"}>
              <DatePicker
                placeholder={choosen.TUVdate}
                disabled={isEditable}
                style={{ width: "100%" }}
                picker="month"
                onChange={(e, dateString) =>
                  updateVehicleHandle("TUVdate", dateString)
                }
              />
            </EditInputContainer>
            <hr class="rounded-separator"></hr>

            <div>
              <EditInputContainer headerText={"Kilometerstand"}>
                <Input
                  bordered={false}
                  disabled={isEditable}
                  placeholder="Kilometerstand"
                  type={"number"}
                  value={choosen.kilometers}
                  onChange={(e) =>
                    updateVehicleHandle("kilometers", e.target.value)
                  }
                />
              </EditInputContainer>
            </div>
            <EditInputContainer headerText={"letzte Inspektion"}>
              <DatePicker
                placeholder={choosen.lastInspection}
                disabled={isEditable}
                style={{ width: "100%" }}
                onChange={(e, dateString) =>
                  updateVehicleHandle("lastInspection", dateString)
                }
              />
            </EditInputContainer>
            <EditInputContainer headerText={"nächste Inspektion"}>
              <DatePicker
                disabled={isEditable}
                placeholder={choosen.nextInspection}
                style={{ width: "100%" }}
                onChange={(e, dateString) =>
                  updateVehicleHandle("nextInspection", dateString)
                }
              />
            </EditInputContainer>
            <hr class="rounded-separator"></hr>

            <div>
              <EditInputContainer headerText={"Bereifung"}>
                <Select
                  value={choosen.tires}
                  disabled={isEditable}
                  defaultValue="Allwetter"
                  style={{ width: 300 }}
                  bordered={false}
                  onChange={(e) => updateVehicleHandle("tires", e)}
                >
                  <Option value="Sommer">Sommer</Option>
                  <Option value="Winter">Winter</Option>
                  <Option value="Allwetter">Allwetter</Option>
                </Select>
              </EditInputContainer>
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
VehicleEdit.propTypes = {};

export default VehicleEdit;
