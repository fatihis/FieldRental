import React from "react";
import PropTypes from "prop-types";
import { Table } from "antd";
const AntdTable = ({ data, columns, itemsOnAPage }) => {
  return (
    <div>
      <Table
        columns={columns}
        pagination={{ pageSize: itemsOnAPage }}
        dataSource={data}
      />
    </div>
  );
};

AntdTable.propTypes = {};

export default AntdTable;
