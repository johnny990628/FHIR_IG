import React, { useState, useEffect, useRef } from "react";
import "antd/dist/antd.css";
import { Space, Table, Tag, Button, Modal, Input, message, Badge } from "antd";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";
import { getUsers, deleteUser, putUser } from "../../Axios/user";

const RegisterUser = (props) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [notstatususer, setNotstatususer] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [searchedColumn, setSearchedColumn] = useState("");
    const searchInput = useRef(null);
    const deletemessage = () => {
        message.success(`刪除成功`);
    };

    const success = () => {
        message.success("認證成功");
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
                    onPressEnter={() =>
                        handleSearch(selectedKeys, confirm, dataIndex)
                    }
                    style={{
                        marginBottom: 8,
                        display: "block",
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() =>
                            handleSearch(selectedKeys, confirm, dataIndex)
                        }
                        icon={<SearchOutlined />}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() =>
                            clearFilters && handleReset(clearFilters)
                        }
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
            record[dataIndex]
                .toString()
                .toLowerCase()
                .includes(value.toLowerCase()),
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
            render: (text) => <text>{text}</text>,
        },
        {
            title: "姓氏",
            dataIndex: "firstName",
            key: "firstName",
            render: (text) => <text>{text}</text>,
        },
        {
            title: "名字",
            dataIndex: "lastName",
            key: "lastName",
            render: (text) => <text>{text}</text>,
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
            render: (text) => <p>{text}</p>,
        },
        {
            title: "建立時間",
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
                    <text>{`${date.getFullYear()}/${
                        date.getMonth() + 1
                    }/${date.getDate()}_${date.getHours()}:${date.getMinutes()}`}</text>
                );
            },
        },
        {
            title: "操作",
            key: "action",
            render: (_, record) => (
                <>
                    <Space size="middle">
                        <a
                            style={{ color: "#32a852" }}
                            onClick={async () => {
                                record.status = true;
                                await putUser(record);
                                deletenotstatususer(record._id);
                                addUser(record);
                                success();
                            }}
                        >
                            認可
                        </a>
                        <a
                            style={{ color: "#fc86ad" }}
                            onClick={async () => {
                                await deleteUser(record._id);
                                deletenotstatususer(record._id);
                                deletemessage();
                            }}
                        >
                            Delete
                        </a>
                    </Space>
                </>
            ),
        },
    ];

    const deletenotstatususer = (id) => {
        setNotstatususer(notstatususer.filter((user) => user._id !== id));
    };

    useEffect(() => {
        // STEP 1：在 useEffect 中定義 async function 取名為 fetchData
        const fetchData = async () => {
            const data = await Promise.all([getUsers()]); // STEP 2：使用 Promise.all 搭配 await 等待兩個 API 都取得回應後才繼續
            const notstatususerData = [];
            data[0].map((item) => {
                if (!item.status) {
                    notstatususerData.push(item);
                }
            });
            setNotstatususer(notstatususerData);
        };
        fetchData(); // STEP 5：呼叫 fetchData 這個方法
    }, []);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const addUser = (user) => {
        user._createTime = new Date();
        console.log("adduser");
        props.setUsers((puser = props.users) => [...puser, user]);
    };

    return (
        <div
            style={{
                alignItems: "center",
                justifyContent: "center",
                display: "flex",
            }}
        >   
            <Badge count={notstatususer.length} style={{ marginTop: "10px" }}>
                <Button
                    type="primary"
                    onClick={showModal}
                    style={{  marginTop: "10px" ,width:"400px"}}
                >
                    註冊認證
                </Button>
            </Badge>
            <Modal
                title=" 註冊認證"
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                width="90%"
            >
                <Table columns={columns} dataSource={notstatususer} />
            </Modal>
        </div>
    );
};

export default RegisterUser;
