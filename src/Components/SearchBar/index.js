import { Button, Form, Input, Space } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchIG } from "../../Redux/Slices/Data";

const SearchBar = () => {
  const [form] = Form.useForm();

  const { isOpen, data, type } = useSelector((state) => state.modal);
  const dispatch = useDispatch();

  const onFinish = (formData) => {
    dispatch(fetchIG(formData));
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
      label: "Country",
      name: "country",
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
        padding: "1rem",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Form
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="inline"
        form={form}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Space>
          {formModel.map(({ label, name, rules, input, childrens }) => (
            <Form.Item key={name} label={label} name={name} rules={rules}>
              {input}
            </Form.Item>
          ))}
        </Space>
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Search
          </Button>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button htmlType="button" onClick={onReset}>
            Reset
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SearchBar;
