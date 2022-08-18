import React, { useEffect, useState } from "react";
import { Space, Table, Tag } from "antd";
import { getUsers } from "../Axios/user.js";
import columns from "../Components/UserColumns/columns";
import RegisterUser from "../Components/RegisterUser";

const User = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        // STEP 1：在 useEffect 中定義 async function 取名為 fetchData
        const fetchData = async () => {
            const data = await Promise.all([getUsers()]); // STEP 2：使用 Promise.all 搭配 await 等待兩個 API 都取得回應後才繼續
            setUsers(data[0]);
        };
        fetchData(); // STEP 5：呼叫 fetchData 這個方法
    }, []);

    const style = {
        margin: "20px auto ",
        width: "90%",
    };

    return (
        <div>
            <RegisterUser/>
            <Table columns={columns} dataSource={users} style={style} />
        </div>
    );
};

export default User;
