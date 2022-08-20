import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";
import { Button, Modal } from "antd";
import { putUser } from "../../Axios/user";
import { Input, Checkbox, message } from "antd";

const EditUser = (props) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [user, setUser] = useState({});
    const [password, setPassword] = useState("");
    const [admin, setAdmin] = useState(false);
    const [adminDisabled, setAdminDisabled] = useState(false);

    useEffect(() => {
        const data = {};
        data._id = props.record._id;
        data.firstName = props.record.firstName;
        data.lastName = props.record.lastName;
        data.email = props.record.email;
        data.username = props.record.username;
        data._createTime = props.record._createTime;

        if (props.record.userType === "admin") {
            setAdmin(true);
            setAdminDisabled(true);
        }
        setUser(data);
    }, []);

    const success = () => {
        message.success("修改成功");
    };

    const error = () => {
        message.error("取消修改");
    };

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        if (password.trim() !== "") {
            user.password;
        }
        if (admin) {
            user.userType = "admin";
        } else {
            user.userType = "normal";
        }
        const data = [];
        props.users.map((item) => {
            if (item._id === user._id) {
                data.push(user);
            } else {
                data.push(item);
            }
        });
        props.setUsers(data);
        putUser(user);
        success();
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        const data = {};
        data._id = user._id;
        data.firstName = props.record.firstName;
        data.lastName = props.record.lastName;
        data.email = props.record.email;
        data.username = props.record.username;
        if (props.record.userType === "admin") {
            setAdmin(true);
        }
        setUser(data);
        //props.setUsers()
        error();
        setIsModalVisible(false);
    };

    const Inputstyle = {
        marginBottom: "10px",
        width: "70%",
    };

    return (
        <>
            <Button type="primary" onClick={showModal}>
                編輯
            </Button>
            <Modal
                title="Basic Modal"
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <p>
                    姓名：
                    <Input
                        placeholder="姓氏"
                        value={user.firstName}
                        onChange={(e) => {
                            setUser({ ...user, firstName: e.target.value });
                        }}
                        style={Inputstyle}
                    />
                </p>
                <p>
                    名稱：
                    <Input
                        placeholder="名稱"
                        value={user.lastName}
                        onChange={(e) => {
                            setUser({ ...user, lastName: e.target.value });
                        }}
                        style={Inputstyle}
                    />
                </p>
                <p>
                    信箱：
                    <Input
                        placeholder="信箱"
                        value={user.email}
                        onChange={(e) => {
                            setUser({ ...user, email: e.target.value });
                        }}
                        style={Inputstyle}
                    />
                </p>
                <p>
                    帳號：
                    <Input
                        placeholder="帳號"
                        value={user.username}
                        onChange={(e) => {
                            setUser({ ...user, username: e.target.value });
                        }}
                        style={Inputstyle}
                    />
                </p>
                <Checkbox
                    style={Inputstyle}
                    checked={admin}
                    disabled={adminDisabled}
                    onChange={(e) => {
                        setAdmin(e.target.checked);
                    }}
                >
                    管理者Admin
                </Checkbox>

                <p>
                    密碼：
                    <Input
                        placeholder="密碼"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                        style={Inputstyle}
                    />
                </p>
            </Modal>
        </>
    );
};

export default EditUser;
