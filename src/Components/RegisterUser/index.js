import React, { useState } from "react";
import "antd/dist/antd.css";
import { Space, Table, Tag, Button, Modal } from "antd";
import columns from "./columns";

const RegisterUser = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [users, setUsers] = useState([]);
    const [notstatususer, setNotstatususer] = useState([]);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const style = {
        margin: "0px auto ",
        width: "100%",
    };

    return (
        <div style={{alignItems: "center",justifyContent:"center",display: "flex"}}>
            <Button type="primary" onClick={showModal} style={{ width: "20%",marginTop: "10px",}} >
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
