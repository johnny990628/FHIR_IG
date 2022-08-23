import React from "react";
import { Button, Table, Pagination } from "antd";
import { useDispatch } from "react-redux";
import { openModal } from "../../Redux/Slices/Modal";

const CustomTable = ({ data, columns, total }) => {
  const dispatch = useDispatch();

  const handleCreate = () => {
    dispatch(openModal({ type: "create" }));
  };

  return (
    <div style={{ width: "100%" }}>
      <Table
        dataSource={data}
        columns={columns}
        size="middle"
        pagination={{
          position: ["bottomCenter", "topRight"],
          total,
          showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} `,
          showSizeChanger: true,
        }}
      />
    </div>
  );
};

export default CustomTable;
