import React, { useEffect, useState } from "react";
import { Space, Table, Tag } from "antd";
import { deleteUser } from "./../Axios/user.js";
import { getUsers } from "../Axios/user.js";
import RegisterUser from "../Components/RegisterUser";

const User = () => {
  const [users, setUsers] = useState([]);

  const deletenotstatususer = (id) => {
    setUsers(users.filter((user) => user._id !== id));
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await Promise.all([getUsers()]);
      setUsers(data[0].filter((user) => user.status === true));
    };
    fetchData();
  }, []);

  const columns = [
    {
      title: "FirstName",
      dataIndex: "firstName",
      key: "firstName",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "LastName",
      dataIndex: "lastName",
      key: "lastName",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a
            style={{ color: "#fc86ad" }}
            onClick={async () => {
              await deleteUser(record._id);
              deletenotstatususer(record._id);
            }}
          >
            Delete
          </a>
        </Space>
      ),
    },
  ];

  const style = {
    margin: "20px auto ",
    width: "90%",
  };

  return (
    <div>
      <RegisterUser users={users} setUsers={setUsers} />
      <Table columns={columns} dataSource={users} style={style} />
    </div>
  );
};

export default User;
