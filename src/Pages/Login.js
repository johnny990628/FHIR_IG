import React from "react";
import ReactDOM from "react-dom";
import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

import { apiLogin2 } from "../Axios/auth";

const Login = () => {
    const onFinish = (values) => {
        apiLogin2({ username: values.username, password: values.password });
    };

    return (
        <div
            style={{
                margin: "50px auto",
                width: "60%",
                backgroundColor: "#FFFFFF",
                padding: "20px",
                borderRadius: "10px",
                boxShadow: "1px 1px 9px #888888",
            }}
        >
            <Form
                name="normal_login"
                className="login-form"
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
            >
                <Form.Item
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: "Please input your Username!",
                        },
                    ]}
                >
                    <Input
                        prefix={
                            <UserOutlined className="site-form-item-icon" />
                        }
                        placeholder="Username"
                    />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: "Please input your Password!",
                        },
                    ]}
                >
                    <Input
                        prefix={
                            <LockOutlined className="site-form-item-icon" />
                        }
                        type="password"
                        placeholder="Password"
                    />
                </Form.Item>

                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        className="login-form-button"
                    >
                        Log in
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default Login;
