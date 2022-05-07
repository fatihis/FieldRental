import React from "react";
import PropTypes from "prop-types";
import { Table } from "antd";
const AntdTable = ({ data, columns }) => {
  return (
    <div>
      <Table columns={columns} dataSource={data} />
    </div>
  );
};

AntdTable.propTypes = {};

export default AntdTable;
