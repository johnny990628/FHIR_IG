import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";
import { Button, Modal } from "antd";
import { Input, Checkbox, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { auth, logout } from "../../Redux/Slices/Auth";
import { putUser } from "../../Axios/user";

const EditUser = (props) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [user, setUser] = useState({});
    const dispatch = useDispatch();
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

    const error = () => {
        message.error("取消修改");
    };

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        checkinputData(props.record.userType);
        setIsModalVisible(false);
    };

    const checkinputData = (userType) => {
        if (userType === "admin") {
            message.success("關閉檢視");
        } else {
            const data = [];
            props.users.map((item) => {
                if (item._id === user._id) {
                    data.push(user);
                } else {
                    data.push(item);
                }
            });

            //如果不修改username就直接putUser
            if (props.record.username === user.username) {
                putUser(user)
                    .then((response) => {
                        message.success("修改成功");
                        props.setUsers(data); //更新props.users
                    })
                    .catch((error) => {
                        message.error("登入憑證已過期，請重新登入");
                        dispatch(logout());
                        props.setisAdminUser("normal");
                    });
            } else {
                //判斷是否有重複username
                var userRepeat = false;
                props.users.map((item) => {
                    if (item.username === user.username) {
                        userRepeat = true;
                    }
                });

                if (userRepeat) {
                    message.error("用戶名已存在");
                    user.username = props.record.username;
                } else {
                    putUser(user)
                        .then((response) => {
                            message.success("修改成功");
                            props.setUsers(data); //更新props.users
                        })
                        .catch((error) => {
                            message.error("登入憑證已過期，請重新登入");
                            dispatch(logout());
                            props.setisAdminUser("normal");
                        });
                }
            }
        }
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
                <p>名字：{user.lastName}</p>
                <p>信箱：{user.email}</p>
            </>
        );
    };

    return (
        <>
            {props.record.userType === "admin" ? (
                <Button type="primary" ghost onClick={showModal}>
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
                            名字：
                            <Input
                                placeholder="名字"
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
                    </>
                )}
            </Modal>
        </>
    );
};

export default EditUser;
