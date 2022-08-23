import React from "react";
import ReactDOM from "react-dom";
import { Form, Input, Button, Checkbox, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

import { useNavigate } from "react-router-dom";
import { apiLogin, apiLogin2 } from "../Axios/auth";
import { useCookies } from "react-cookie";

const Login = () => {
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(["cookie"]);
  const onFinish = (values) => {
    // apiLogin2({ username: values.username, password: values.password });
    apiLogin({ username: values.username, password: values.password }).then(
      (res) => {
        if (res.data._id) {
          setCookie("user", res.data, { path: "/" });
          navigate("/data");
          message.success("Login Success");
        } else {
          message.error(res.data.messages);
        }
      }
    );
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
              message: "請輸入帳號",
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
              message: "請輸入密碼~",
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="密碼"
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            登入
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
