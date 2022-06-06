import React, { useContext, useEffect } from "react";
import PropTypes from "prop-types";
import "./index.css";
import { Tag, Space } from "antd";
import AntdTable from "../../components/organisms/AntdTable";
import upArrow from "../../assets/up-arrow.png";
import downArrow from "../../assets/arrow-down.png";
import DonutChart from "../../components/charts/DonutChart";
import MapChart from "../../components/charts/MapChart";
import { MainContext } from "../../api/MainContext";
import plateImg from "../../assets/plate.png";
import { useState } from "react";
import { Link } from "react-router-dom";
const VehicleMain = (props) => {
  const mainContext = useContext(MainContext);
  const [data, setData] = useState();

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Kennzeichen",
      dataIndex: "plateNumber",
      key: "plateNumber",
      render: (text) => {
        return (
          <div className="plateRender">
            <img src={plateImg} className="h-7 w-auto"></img>{" "}
            <span className="position-absolute top-5 left-7 h-2 fw-bold">
              {text}
            </span>
          </div>
        );
      },
    },
    {
      title: "Model",
      dataIndex: "model",
      key: "model",
    },
    {
      title: "Kaufwert",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Anschaffungsart",
      dataIndex: "inquiryType",
      key: "inquiryType",
    },
    {
      title: "Bereifung",
      key: "tires",
      dataIndex: "tires",
      render: (tag) => {
        var color =
          tag == "Winter" ? "#91d5ff" : tag == "Sommer" ? "#ffc069" : "#13c2c2";
        return (
          <Tag color={color} key={tag}>
            {tag.toUpperCase()}
          </Tag>
        );
      },
    },
    {
      title: "Kilometers",
      key: "kilometers",
      dataIndex: "kilometers",
    },
    {
      title: "Action",
      key: "id",
      render: (_, record) => (
        <Space size="middle">
          <Link to={"/fahrzeug-berarbeiten/" + record.id}>Edit</Link>
        </Space>
      ),
    },
  ];
  useEffect(() => {
    mainContext.getVehicleForTableData();
  }, []);
  useEffect(() => {
    setData(mainContext.vehicleForTableData);
    mainContext.setParentPageName("Fuhrpark");
    mainContext.setPageName("Fuhrpark");
  }, [mainContext.vehicleForTableData]);

  return (
    <div className="page-wrapper d-flex align-items-center justify-content-center flex-column position-relative">
      <div className="table-card mb-4 p-3">
        {data ? (
          <AntdTable columns={columns} data={data} itemsOnAPage={4} />
        ) : (
          ""
        )}
      </div>
      <h3 className="w-100 detail-main-header fw-bold">Statistiken</h3>
      <div className="bottom-detail-wrapper d-flex flex-row align-items-center justify-content-between ">
        <div className="detail-card mt-5  d-flex flex-column px-5 pt-4">
          <h2 className="detail-card-header fw-bold">
            Fahrzeugbelegungsquoten
          </h2>
          <div className="detail-text w-100 d-flex flex-row">
            <h3 className="fw-bold mt-2">215</h3>
            <div className="d-flex flex-column">
              <img className="arrow-icon" src={upArrow}></img>
              <p className="mb-0">aktiver Arbeiter (192 im letzten Quartal)</p>
            </div>
          </div>
          <div className="detail-text w-100 d-flex flex-row">
            <h3 className="fw-bold mt-2">15</h3>
            <div className="d-flex flex-column">
              <img className="arrow-icon" src={downArrow}></img>
              <p className="mb-0">Zahl der Arbeitnehmer, die kündigen</p>
            </div>
          </div>
          <div className="detail-text w-100 d-flex flex-row">
            <h3 className="fw-bold mt-2">16</h3>
            <div className="d-flex flex-column">
              <img className="arrow-icon" src={downArrow}></img>
              <p className="mb-0">(%) Mitarbeiterwachstumsrate</p>
            </div>
          </div>
        </div>
        <div className="detail-card mt-5  d-flex flex-column px-5 pt-4">
          <h2 className="detail-card-header fw-bold">ARBEITSKRÄFTE</h2>
          <div className="detail-chart-wrapper d-flex w-100 h-100 mt-2">
            <div className="detail-chart-container w-100 h-100 ">
              <DonutChart
                barColor={"#98ff66"}
                chartId={"progressOne"}
                chartTitle={"SLA RATING"}
                value={21}
              />
            </div>
            <div className="detail-chart-container w-100 h-100 ">
              <DonutChart
                barColor={"#6698ff"}
                chartId={"progressTwo"}
                chartTitle={"PBI Satisfaction"}
                value={76}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

VehicleMain.propTypes = {};

export default VehicleMain;
