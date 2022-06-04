import React, { useContext, useEffect } from "react";
import PropTypes from "prop-types";
import DashboardCard from "../../components/molecules/DashboardCard";
import { GrUserWorker, GrAlert, GrAnalytics } from "react-icons/gr";
import MapChart from "../../components/charts/MapChart";
import DonutChart from "../../components/charts/DonutChart";
import AntdTable from "../../components/organisms/AntdTable";
import { Tag, Space } from "antd";

import "./index.css";
import SortableBarChart from "../../components/charts/SortableBarChart";
import { MainContext } from "../../api/MainContext";
const Home = (props) => {
  const { setParentPageName, setPageName, getManufacturerList } =
    useContext(MainContext);
  useEffect(() => {
    setParentPageName("Übersicht");
    setPageName("");
    getManufacturerList();
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Tags",
      key: "tags",
      dataIndex: "tags",
      render: (tags) => (
        <>
          {tags.map((tag) => {
            let color = tag.length > 5 ? "geekblue" : "green";
            if (tag === "loser") {
              color = "volcano";
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
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <a>Delete</a>
        </Space>
      ),
    },
  ];

  const data = [
    {
      key: "1",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
      tags: ["nice", "developer"],
    },
    {
      key: "2",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      tags: ["loser"],
    },
    {
      key: "3",
      name: "Joe Black",
      age: 32,
      address: "Sidney No. 1 Lake Park",
      tags: ["cool", "teacher"],
    },
    {
      key: "4",
      name: "Joe Black",
      age: 32,
      address: "Sidney No. 1 Lake Park",
      tags: ["cool", "teacher"],
    },
    {
      key: "5",
      name: "Joe Black",
      age: 32,
      address: "Sidney No. 1 Lake Park",
      tags: ["cool", "teacher"],
    },
    {
      key: "6",
      name: "Joe Black",
      age: 32,
      address: "Sidney No. 1 Lake Park",
      tags: ["cool", "teacher"],
    },
    {
      key: "7",
      name: "Joe Black",
      age: 32,
      address: "Sidney No. 1 Lake Park",
      tags: ["cool", "teacher"],
    },
    {
      key: "8",
      name: "Joe Black",
      age: 32,
      address: "Sidney No. 1 Lake Park",
      tags: ["cool", "teacher"],
    },
    {
      key: "9",
      name: "Joe Black",
      age: 32,
      address: "Sidney No. 1 Lake Park",
      tags: ["cool", "teacher"],
    },
  ];
  return (
    <div className="homepage-wrapper flex flex-col ">
      <div className="home-left-side-top-left flex items-center px-5 gap-5 py-4 flex-1 w-auto h-full border-r-4 border-b-4">
        <div className="d-flex flex-col gap-2 flex-1">
          <DashboardCard
            cardImage={<GrUserWorker size={40} />}
            cardHeader={"Active Workers"}
            cardText={"131"}
            cardBg={"rgba(217,241,242)"}
          />
          <DashboardCard
            cardImage={<GrAlert size={40} />}
            cardHeader={"Open Issues"}
            cardText={"12"}
            cardBg={"rgb(255,244,230)"}
          />
          <DashboardCard
            cardImage={<GrAnalytics size={40} />}
            cardHeader={"First Quarter Turnover"}
            cardText={"301.101$"}
            cardBg={"rgb(254,251,229)"}
          />
        </div>
        <div className="flex-2 rounded-md  h-full ">
          <MapChart />
        </div>
        <div className="flex-2 h-full">
          <AntdTable itemsOnAPage={5} columns={columns} data={data} />
        </div>
      </div>
      <div className="h-100 w-100 d-flex gap-4 px-5 py-1">
        <div className="detail-chart-containers p-4  mt-2 w-72">
          <DonutChart
            chartId={"progressTwo"}
            chartTitle={"PBI Satisfaction"}
            value={76}
          />
        </div>
        <div className="detail-chart-containers p-4  mt-2 w-72">
          <DonutChart
            chartId={"progressOne"}
            chartTitle={"Vehicle Using Rate"}
            value={76}
            barColor={"red"}
          />
        </div>
        <div className="d-flex items-center justify-center h-100">
          <div class="vl py-6"></div>
        </div>
        <SortableBarChart chartId={"bottomBarChart"} />
      </div>
    </div>
  );
};

Home.propTypes = {};

export default Home;
