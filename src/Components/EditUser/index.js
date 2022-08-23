import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";
import { Button, Modal } from "antd";
import { putUser } from "../../Axios/user";
import { Input, Checkbox, message } from "antd";

const EditUser = (props) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [user, setUser] = useState({});
    const [password, setPassword] = useState("");

    useEffect(() => {
        const data = {};
        data._id = props.record._id;
        data.firstName = props.record.firstName;
        data.lastName = props.record.lastName;
        data.email = props.record.email;
        data.username = props.record.username;
        data._createTime = props.record._createTime;
        data.userType = props.record.userType;

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
        if (props.record.userType === "admin") {
            message.success("關閉檢視");
        } else {
            if (password.trim() !== "") {
                user.password;
            }
            const data = [];
            props.users.map((item) => {
                if (item._id === user._id) {
                    data.push(user);
                } else {
                    data.push(item);
                }
            });

            if (props.record.username === user.username) {
                props.setUsers(data);
                putUser(user);
                success();
            } else {
                var sum = 0;
                props.users.map((item) => {
                    if (item.username === user.username) {
                        sum++;
                    }
                });
                if (sum > 0) {
                    message.error("用戶名已存在");
                    user.username = props.record.username;
                } else {
                    props.setUsers(data);
                    putUser(user);
                    success();
                }
            }
        }
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        if (props.record.userType === "admin") {
            message.success("關閉檢視");
        } else {
            const data = {};
            data._id = user._id;
            data.firstName = props.record.firstName;
            data.lastName = props.record.lastName;
            data.email = props.record.email;
            data.username = props.record.username;
            setUser(data);
            error();
        }
        setIsModalVisible(false);
    };

    const Inputstyle = {
        marginBottom: "10px",
        width: "70%",
    };

    const ModalAdmonRender = () => {
        return (
            <>
                <p>帳號：{user.username}</p>
                <p>姓名：{user.firstName}</p>
                <p>名子：{user.lastName}</p>
                <p>信箱：{user.email}</p>
            </>
        );
    };

    return (
        <>
            {props.record.userType === "admin" ? (
                <Button type="primary" onClick={showModal}>
                    檢視
                </Button>
            ) : (
                <Button type="primary" onClick={showModal}>
                    編輯
                </Button>
            )}
            <Modal
                title="檢視/編輯"
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                {props.record.userType === "admin" ? (
                    <ModalAdmonRender />
                ) : (
                    <>
                        <p>
                            帳號：
                            <Input
                                placeholder="帳號"
                                value={user.username}
                                onChange={(e) => {
                                    setUser({
                                        ...user,
                                        username: e.target.value,
                                    });
                                }}
                                style={Inputstyle}
                            />
                        </p>
                        <p>
                            姓名：
                            <Input
                                placeholder="姓氏"
                                value={user.firstName}
                                onChange={(e) => {
                                    setUser({
                                        ...user,
                                        firstName: e.target.value,
                                    });
                                }}
                                style={Inputstyle}
                            />
                        </p>
                        <p>
                            名子：
                            <Input
                                placeholder="名子"
                                value={user.lastName}
                                onChange={(e) => {
                                    setUser({
                                        ...user,
                                        lastName: e.target.value,
                                    });
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
                    </>
                )}
            </Modal>
        </>
    );
};

export default EditUser;
