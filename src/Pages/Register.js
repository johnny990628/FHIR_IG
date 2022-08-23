import React from "react";
import ReactDOM from "react-dom";
import { Form, Input, Button, Checkbox, message } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";

import { apiRegister } from "../Axios/auth";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const onFinish = (formData) => {
    apiRegister(formData).then((res) => {
      if (res.data.status === 1) {
        navigate("/login");
        message.success(
          "Your application has been sent. Waiting for the administrator's approval"
        );
      } else {
        message.error(res.data.data);
      }
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
              message: "請輸入帳號~",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="帳號"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "請輸入密碼",
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="密碼"
          />
        </Form.Item>
        <Form.Item
          name="firstName"
          rules={[
            {
              required: true,
              message: "請輸入姓氏",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            type="firstName"
            placeholder="姓氏"
          />
        </Form.Item>

        <Form.Item
          name="lastName"
          rules={[
            {
              required: true,
              message: "請輸入名字",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            type="lastName"
            placeholder="名子"
          />
        </Form.Item>

        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "請輸入email!",
            },
          ]}
        >
          <Input
            prefix={<MailOutlined className="site-form-item-icon" />}
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
