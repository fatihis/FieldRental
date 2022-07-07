import React, { useContext, useEffect, useState } from "react";
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
import { Link } from "react-router-dom";
const Home = (props) => {
  const [data, setData] = useState();
  const [localPersonalCount, setLocalPersonalCount] = useState(0);
  const {
    setParentPageName,
    personalCount,
    setPageName,
    getManufacturerList,
    getPersonalForTableData,
    getPersonalCount,
  } = useContext(MainContext);
  useEffect(() => {
    setParentPageName("Übersicht");
    setPageName("Übersicht");
    getManufacturerList();
    getPersonalCount();
    getPersonalForTableData();
  }, []);

  useEffect(() => {
    setLocalPersonalCount(personalCount);
  }, [personalCount]);

  const mainContext = useContext(MainContext);

  const colors = ["#ac92eb", "#4fc1e8", "#a0d568", "#ffce54", "#ed5564"];

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Führerschein",
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
      title: "Straße",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Inventar",
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
    setData(mainContext.personalForTableData);
  }, [mainContext.personalForTableData]);

  return (
    <div className="homepage-wrapper flex flex-col ">
      <div className="home-left-side-top-left flex items-center px-5 gap-5 py-4 flex-1 w-auto h-full border-r-4 border-b-4">
        <div className="d-flex flex-col gap-2 flex-1">
          <DashboardCard
            cardImage={<GrUserWorker size={40} />}
            cardHeader={"Aktiven Personal"}
            cardText={localPersonalCount}
            cardBg={"rgba(217,241,242)"}
          />
          <DashboardCard
            cardImage={<GrAlert size={40} />}
            cardHeader={"Aktive Offene Punkte"}
            cardText={"12"}
            cardBg={"rgb(255,244,230)"}
          />
          <DashboardCard
            cardImage={<GrAnalytics size={40} />}
            cardHeader={"Umsatz im ersten Quartal"}
            cardText={"301.101$"}
            cardBg={"rgb(254,251,229)"}
          />
        </div>
        <div className="flex-2 rounded-md  h-full ">
          <MapChart />
        </div>
        <div className="flex-2 h-full">
          {data ? (
            <AntdTable columns={columns} data={data} itemsOnAPage={3} />
          ) : (
            ""
          )}
        </div>
      </div>
      <div className="h-100 w-100 d-flex gap-4 px-5 py-1">
        <div className="detail-chart-containers p-4  mt-2 w-72">
          <DonutChart
            chartId={"progressTwo"}
            chartTitle={"PBI-Zufriedenheit"}
            value={76}
          />
        </div>
        <div className="detail-chart-containers p-4  mt-2 w-72">
          <DonutChart
            chartId={"progressOne"}
            chartTitle={"Fahrzeugnutzungsrate"}
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
