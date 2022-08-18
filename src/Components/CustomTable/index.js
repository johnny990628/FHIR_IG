import React from "react";
import { Table } from "antd";

const CustomTable = ({ data, columns }) => {
  return (
    <div style={{ width: "100%" }}>
      <Table dataSource={data} columns={columns} size="middle" />
    </div>
  );
};

export default CustomTable;
