import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./index.css";
import { Tag, Space } from "antd";
import AntdTable from "../../components/organisms/AntdTable";
import upArrow from "../../assets/up-arrow.png";
import downArrow from "../../assets/arrow-down.png";
import DonutChart from "../../components/charts/DonutChart";
import { MainContext } from "../../api/MainContext";
import { Link } from "react-router-dom";
const PersonalMain = (props) => {
  const mainContext = useContext(MainContext);
  const [data, setData] = useState();
  const colors = ["#ac92eb", "#4fc1e8", "#a0d568", "#ffce54", "#ed5564"];

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Driver License",
      dataIndex: "driverLisence",
      key: "driverLisence",
      render: (tags) => (
        <>
          {tags.map((tag, idx) => {
            let color = colors[idx];
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Inventory",
      key: "inventory",
      dataIndex: "inventory",
      render: (tags) => (
        <>
          {tags.map((tag) => {
            let color = tag.length > 5 ? "geekblue" : "green";
            if (tag === "Handy") {
              color = "volcano";
            }
            if (tag === "Laptop") {
              color = "blue";
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: "Action",
      key: "id",
      render: (_, record) => (
        <Space size="middle">
          <Link to={"/benutzerverwaltung/" + record.id}>Edit</Link>
        </Space>
      ),
    },
  ];
  useEffect(() => {
    mainContext.setPageName("Personal");
    mainContext.setParentPageName("Personal");
    mainContext.getPersonalForTableData();
  }, []);
  useEffect(() => {
    setData(mainContext.personalForTableData);
  }, [mainContext.personalForTableData]);

  // const data = [
  //   {
  //     key: "1",
  //     name: "John Brown",
  //     age: 32,
  //     address: "New York No. 1 Lake Park",
  //     tags: ["nice", "developer"],
  //   },
  //   {
  //     key: "2",
  //     name: "Jim Green",
  //     age: 42,
  //     address: "London No. 1 Lake Park",
  //     tags: ["loser"],
  //   },
  //   {
  //     key: "3",
  //     name: "Joe Black",
  //     age: 32,
  //     address: "Sidney No. 1 Lake Park",
  //     tags: ["cool", "teacher"],
  //   },
  //   {
  //     key: "4",
  //     name: "Joe Black",
  //     age: 32,
  //     address: "Sidney No. 1 Lake Park",
  //     tags: ["cool", "teacher"],
  //   },
  //   {
  //     key: "5",
  //     name: "Joe Black",
  //     age: 32,
  //     address: "Sidney No. 1 Lake Park",
  //     tags: ["cool", "teacher"],
  //   },
  //   {
  //     key: "6",
  //     name: "Joe Black",
  //     age: 32,
  //     address: "Sidney No. 1 Lake Park",
  //     tags: ["cool", "teacher"],
  //   },
  //   {
  //     key: "7",
  //     name: "Joe Black",
  //     age: 32,
  //     address: "Sidney No. 1 Lake Park",
  //     tags: ["cool", "teacher"],
  //   },
  //   {
  //     key: "8",
  //     name: "Joe Black",
  //     age: 32,
  //     address: "Sidney No. 1 Lake Park",
  //     tags: ["cool", "teacher"],
  //   },
  //   {
  //     key: "9",
  //     name: "Joe Black",
  //     age: 32,
  //     address: "Sidney No. 1 Lake Park",
  //     tags: ["cool", "teacher"],
  //   },
  // ];
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
          <h2 className="detail-card-header fw-bold">ARBEITSKRÄFTE</h2>
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
                chartId={"progressOne"}
                chartTitle={"SLA RATING"}
                value={21}
                barColor={"#ffff66"}
              />
            </div>
            <div className="detail-chart-container w-100 h-100 ">
              <DonutChart
                chartId={"progressTwo"}
                chartTitle={"PBI Satisfaction"}
                value={76}
                barColor={"#6698ff"}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

PersonalMain.propTypes = {};

export default PersonalMain;
