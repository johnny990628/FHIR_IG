import React, { useEffect, useState, useRef } from "react";
import { Space, Table, Tag, Button, message, Input, Popconfirm } from "antd";
import Highlighter from "react-highlight-words";
import { SearchOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import Cookies from "universal-cookie";
import { deleteUser } from "./../Axios/user.js";
import { getUsers } from "../Axios/user.js";
import RegisterUser from "../Components/RegisterUser";
import EditUser from "../Components/EditUser";

const AdminUser = (props) => {
  const [users, setUsers] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);

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

  const deletemessage = (username) => {
    message.success(`${username}刪除成功`);
  };

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div
        style={{
          padding: 8,
        }}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1890ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: "帳號",
      dataIndex: "username",
      key: "username",
      ...getColumnSearchProps("username"),
      render: (text) => <p>{text}</p>,
    },
    {
      title: "姓氏",
      dataIndex: "firstName",
      key: "firstName",
      render: (text) => <p>{text}</p>,
    },
    {
      title: "名字",
      dataIndex: "lastName",
      key: "lastName",
      render: (text) => <p>{text}</p>,
    },
    {
      title: "帳號建立時間",
      dataIndex: "_createTime",
      key: "_createTime",
      sorter: (a, b) => {
        var aTime = new Date(a._createTime);
        var bTime = new Date(b._createTime);
        return aTime.getTime() - bTime.getTime();
      },
      render: (text, user) => {
        var date = new Date(user._createTime);
        date.setHours(date.getHours() - 8);
        return (
          <p>{`${date.getFullYear()}/${
            date.getMonth() + 1
          }/${date.getDate()}_${date.getHours()}:${date.getMinutes()}`}</p>
        );
      },
    },
    {
      title: "帳號類別",
      dataIndex: "userType",
      key: "userType",
      filters: [
        {
          text: "admin",
          value: "admin",
        },
        {
          text: "normal",
          value: "normal",
        },
      ],
      filterMode: "two",
      onFilter: (value, record) => record.userType.startsWith(value),
    },
    {
      title: "操作",
      key: "action",
      render: (_, record) => (
        <>
          <EditUser record={record} users={users} setUsers={setUsers} setisAdminUser={props.setisAdminUser}/>
          <Popconfirm
            placement="topRight"
            title="確定要刪除?"
            onConfirm={async () => {
              if (record.userType === "admin") {
                message.error("管理員不能刪除");
              } else {
                await deleteUser(record._id);
                deletenotstatususer(record._id);
                deletemessage(record.username);
              }
            }}
            okText="是"
            cancelText="否"
            icon={<QuestionCircleOutlined style={{ color: "red" }} />}
          >
            <Button
              danger
              type="text"
              style={{ marginLeft: "5px" }}
              disabled={record.userType === "admin"}
            >
              刪除
            </Button>
          </Popconfirm>
        </>
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

const NotAdminUser = () => {
  return (
    <div>
      <h1>您沒有權限</h1>
    </div>
  );
};

const User = () => {
  const [isAdminUser, setisAdminUser] = useState("normal");

  useEffect(() => {
    const cookies = new Cookies();

    if (cookies.get("user")) {
      setisAdminUser(cookies.get("user").userType);
    } else {
      setisAdminUser("normal");
    }
  }, []);

  return (
    <div>{isAdminUser === "admin" ? <AdminUser setisAdminUser={setisAdminUser}/> : <NotAdminUser />}</div>
  );
};

export default User;
