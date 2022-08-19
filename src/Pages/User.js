import React, { useEffect, useState } from "react";
import { Space, Table, Tag } from "antd";
import { getUsers } from "../Axios/user.js";
import columns from "../Components/UserColumns/columns";
import RegisterUser from "../Components/RegisterUser";

const User = () => {
    const [users, setUsers] = useState([]);

    useEffect(async () => {
        const data = await getUsers();
        const newuser = [];
        data.map((item) => {
            if (item.status) {
                newuser.push(item);
            }
        });
        setUsers(newuser);
    }, []);

    const style = {
        margin: "20px auto ",
        width: "90%",
    };

    return (
        <div>
            <RegisterUser users={users} setUsers={setUsers}/>
            <Table columns={columns} dataSource={users} style={style} />
        </div>
    );
};

export default User;
