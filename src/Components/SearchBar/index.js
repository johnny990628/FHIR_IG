import React, { useEffect } from "react";
import { Button, Form, Input, message, Space } from "antd";
import { SearchOutlined, DeleteOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { fetchIG } from "../../Redux/Slices/Data";

const SearchBar = () => {
  const [form] = Form.useForm();

  const { isOpen, data, type } = useSelector((state) => state.modal);
  const dispatch = useDispatch();

  const onFinish = (formData) => {
    dispatch(fetchIG(formData));
    message.success("Search Complete");
  };

  const onReset = () => {
    form.resetFields();
    dispatch(fetchIG());
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const formModel = [
    {
      label: "Name",
      name: "name",
      input: <Input />,
      rules: [],
    },
    {
      label: "Authority",
      name: "authority",
      input: <Input />,
      rules: [],
    },
    {
      label: "Release",
      name: "release",
      input: <Input />,
      rules: [],
    },
    {
      label: "Category",
      name: "category",
      input: <Input />,
      rules: [],
    },
    {
      label: "Contents",
      name: "contents",
      input: <Input />,
      rules: [],
    },
  ];

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginLeft: "1rem",
      }}
    >
      <Form
        labelCol={{
          span: 10,
        }}
        wrapperCol={{
          span: 10,
        }}
        layout="inline"
        form={form}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        {formModel.map(({ label, name, rules, input, childrens }) => (
          <Form.Item
            key={name}
            label={label}
            name={name}
            rules={rules}
            style={{ margin: ".3rem" }}
          >
            {input}
          </Form.Item>
        ))}

        <Form.Item>
          <Button type="primary" htmlType="submit" icon={<SearchOutlined />}>
            搜尋
          </Button>
        </Form.Item>

        <Form.Item>
          <Button htmlType="button" onClick={onReset} icon={<DeleteOutlined />}>
            清除
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SearchBar;
