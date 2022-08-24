import React from "react";
import { Button, Table, Pagination } from "antd";
import { useDispatch } from "react-redux";
import { openModal } from "../../Redux/Slices/Modal";

const CustomTable = ({ data, columns, total, loading, header }) => {
  const dispatch = useDispatch();

  return (
    <div style={{ width: "96%" }}>
      <Table
        dataSource={data}
        columns={columns}
        loading={loading}
        size="middle"
        pagination={{
          position: ["bottomCenter", "topRight"],
          total,
          showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} `,
          showSizeChanger: true,
        }}
        title={header}
      />
    </div>
  );
};

export default CustomTable;
