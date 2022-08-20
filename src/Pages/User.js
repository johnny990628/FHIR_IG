import React, { useEffect, useState } from "react";
import { Space, Table, Tag, Button, message } from "antd";
import { deleteUser } from "./../Axios/user.js";
import { getUsers } from "../Axios/user.js";
import RegisterUser from "../Components/RegisterUser";
import EditUser from "../Components/EditUser";

const User = () => {
    const [users, setUsers] = useState([
        // {
        //     _id: "32EE08BB-752E-478D-A27D-E46DC01ECF87",
        //     username: "root",
        //     email: "root@mail.com",
        //     firstName: "USER",
        //     lastName: "ROOT",
        //     userType: "admin",
        //     status: true,
        //     _createTime: "2022-08-17T14:58:59.370Z",
        //     _updaterId: null,
        //     _upTime: null,
        // },
    ]);

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
        message.success(`${username}修改成功`);
    };

    const columns = [
        {
            title: "username",
            dataIndex: "username",
            key: "username",
            render: (text) => <text>{text}</text>,
        },
        {
            title: "FirstName",
            dataIndex: "firstName",
            key: "firstName",
            render: (text) => <text>{text}</text>,
        },
        {
            title: "LastName",
            dataIndex: "lastName",
            key: "lastName",
            render: (text) => <text>{text}</text>,
        },
        {
            title: "_createTime",
            dataIndex: "_createTime",
            key: "_createTime",
            render: (text,user) => {
                var date = new Date(user._createTime);
                return (
                    <text>
                        {date.getFullYear()}-{date.getMonth()}-{date.getDay()}
                    </text>
                );
            },
        },
        {
            title: "userType",
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
            filterMode: "tree",
            onFilter: (value, record) => record.userType.startsWith(value),
        },
        {
            title: "Action",
            key: "action",
            render: (_, record) => (
                <>
                    <EditUser
                        record={record}
                        users={users}
                        setUsers={setUsers}
                    />
                    <Button
                        danger
                        type="text"
                        style={{ marginLeft: "5px" }}
                        onClick={async () => {
                            await deleteUser(record._id);
                            deletenotstatususer(record._id);
                            deletemessage(record.username);
                        }}
                    >
                        刪除
                    </Button>
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

export default User;
