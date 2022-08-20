import React, { useEffect, useState } from "react";
import { Space, Table, Tag, Button } from "antd";
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
                <>
                    <EditUser record={record} users={users} setUsers={setUsers} />
                    <Button danger 
                        type="text"
                        style={{marginLeft: "5px"}}
                        onClick={async () => {
                            await deleteUser(record._id);
                            deletenotstatususer(record._id);
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
