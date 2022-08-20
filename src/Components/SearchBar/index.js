import { Button, Form, Input, Space, Tag } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addData, editData } from "../../Redux/Slices/Data";
import { closeModal, openModal, switchForm } from "../../Redux/Slices/Modal";
const SearchBar = () => {
  const [form] = Form.useForm();

  const { isOpen, data, type } = useSelector((state) => state.modal);
  const dispatch = useDispatch();

  useEffect(() => {
    !isOpen && form.resetFields();
    data && form.setFieldsValue(data);
  }, [isOpen]);

  const onFinish = (formData) => {
    if (type === "create") {
      const id = Date.now();
      dispatch(addData({ data: { ...formData, id } }));
    }
    if (type === "edit") {
      dispatch(editData({ data: { ...formData } }));
    }
    dispatch(closeModal());
  };

  const handleTagClick = (type, data) => {
    dispatch(switchForm({ tag: type, tagData: data }));
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const formModel = [
    {
      label: "Search",
      name: "search",
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
        padding: "3rem",
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
        {formModel.map(({ label, name, rules, input, childrens }) => (
          <Form.Item
            key={name}
            label={label}
            name={name}
            rules={rules}
            style={{ padding: ".4rem" }}
          >
            {input}
          </Form.Item>
        ))}

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
      </Form>
    </div>
  );
};

export default SearchBar;
