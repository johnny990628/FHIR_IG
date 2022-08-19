import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";
import { Space, Table, Tag, Button, Modal } from "antd";
import { getUsers, deleteUser, putUser } from "../../Axios/user";

const RegisterUser = (props) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [notstatususer, setNotstatususer] = useState([]);
    console.log(props.users);
    const columns = [
        {
            title: "FirstName",
            dataIndex: "firstName",
            key: "firstName",
            render: (text) => <p>{text}</p>,
        },
        {
            title: "LastName",
            dataIndex: "lastName",
            key: "lastName",
            render: (text) => <p>{text}</p>,
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
            render: (text) => <p>{text}</p>,
        },
        {
            title: "CreateTime",
            dataIndex: "_createTime",
            key: "createTime",
            render: (text) => {
                {
                    var date = new Date(text);
                }
                return (
                    <p>{`${date.getFullYear()}-${
                        date.getMonth() + 1
                    }-${date.getDate()}_${date.getHours()}:${date.getMinutes()}`}</p>
                );
            },
        },
        {
            title: "Action",
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
                            }}
                        >
                            認可
                        </a>
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
        console.log("adduser")
        props.setUsers((puser = props.users) => [...puser, user]);
    };

    const style = {
        margin: "0px auto ",
        width: "100%",
    };

    return (
        <div
            style={{
                alignItems: "center",
                justifyContent: "center",
                display: "flex",
            }}
        >
            <Button
                type="primary"
                onClick={showModal}
                style={{ width: "20%", marginTop: "10px" }}
            >
                註冊認證
            </Button>
            <Modal
                title=" 註冊認證"
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                width="80%"
            >
                <Table
                    columns={columns}
                    dataSource={notstatususer}
                    style={style}
                />
            </Modal>
        </div>
    );
};

export default RegisterUser;
