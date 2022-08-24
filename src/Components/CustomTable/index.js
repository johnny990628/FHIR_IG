import React from "react";
import { Table } from "antd";

const CustomTable = ({ data, columns, total, loading, Header }) => {
  return (
    <div style={{ width: "96%" }}>
      <Table
        dataSource={data}
        columns={columns}
        loading={loading}
        size="large"
        pagination={{
          position: ["bottomCenter", "topRight"],
          total,
          showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} `,
          showSizeChanger: true,
        }}
        title={Header}
      />
    </div>
  );
};

export default CustomTable;
