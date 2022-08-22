import React from "react";
import ReactDOM from "react-dom";
import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";

import { apiRegister } from "../Axios/auth";

const Register = () => {
    const onFinish = (values) => {
        apiRegister({
            username: values.username,
            password: values.password,
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
        });
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
                <Form.Item
                    name="firstName"
                    rules={[
                        {
                            required: true,
                            message: "Please input your firstName!",
                        },
                    ]}
                >
                    <Input
                        prefix={
                            <UserOutlined className="site-form-item-icon" />
                        }
                        type="firstName"
                        placeholder="firstName"
                    />
                </Form.Item>

                <Form.Item
                    name="lastName"
                    rules={[
                        {
                            required: true,
                            message: "Please input your lastName!",
                        },
                    ]}
                >
                    <Input
                        prefix={
                            <UserOutlined className="site-form-item-icon" />
                        }
                        type="lastName"
                        placeholder="lastName"
                    />
                </Form.Item>

                <Form.Item
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: "Please input your email!",
                        },
                    ]}
                >
                    <Input
                        prefix={
                            <MailOutlined className="site-form-item-icon" />
                        }
                        type="email"
                        placeholder="email"
                    />
                </Form.Item>

                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        className="login-form-button"
                    >
                        註冊
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default Register;
