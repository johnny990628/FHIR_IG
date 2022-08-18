import { Button, Form, Input, Space, Tag } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addData, editData } from "../../Redux/Slices/Data";
import { closeModal } from "../../Redux/Slices/Modal";
const CustomForm = () => {
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
      dispatch(editData({ data: { ...data, ...formData, id: data.id } }));
    }
    dispatch(closeModal());
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const formModel = [
    {
      label: "Name",
      name: "name",
      input: <Input />,
      rules: [
        {
          required: true,
          message: "Please input name !",
        },
      ],
    },
    {
      label: "History",
      name: "history",
      input: <Input />,
      rules: [
        {
          required: true,
          message: "Please input History !",
        },
      ],
    },
    {
      label: "Npm-name",
      name: "npm-name",
      input: <Input />,
      rules: [
        {
          required: true,
          message: "Please input npm-name !",
        },
      ],
    },
    {
      label: "Category",
      name: "category",
      input: <Input />,
      rules: [
        {
          required: true,
          message: "Please input category !",
        },
      ],
    },
    {
      label: "Description",
      name: "description",
      input: <Input />,
      rules: [
        {
          required: true,
          message: "Please input description !",
        },
      ],
    },
    {
      label: "Authority",
      name: "authority",
      input: <Input />,
      rules: [
        {
          required: true,
          message: "Please input authority !",
        },
      ],
    },
    {
      label: "Country",
      name: "country",
      input: <Input />,
      rules: [
        {
          required: true,
          message: "Please input country !",
        },
      ],
    },
    {
      label: "Editions",
      name: "editions",
      input: <></>,
      childrens: [
        {
          label: "Name",
          name: "editions[0].name",
          input: <Input />,
          rules: [
            {
              required: true,
              message: "Please input editions-name !",
            },
          ],
        },
        {
          label: "IG-Version",
          name: "ig-version",
          input: <Input />,
          rules: [
            {
              required: true,
              message: "Please input editions-ig-version !",
            },
          ],
        },
        {
          label: "Package",
          name: "package",
          input: <Input />,
          rules: [
            {
              required: true,
              message: "Please input editions-package !",
            },
          ],
        },
        {
          label: "URL",
          name: "editions[0].url",
          input: <Input />,
          rules: [
            {
              required: true,
              message: "Please input editions-URL !",
              rules: [],
            },
          ],
        },
      ],
    },

    {
      label: "Implementations",
      name: "implementations",
      input: <></>,
      childrens: [
        {
          label: "Name",
          name: "implementations[0].name",
          input: <Input />,
          rules: [
            {
              required: true,
              message: "Please input implementations-Name !",
              rules: [],
            },
          ],
        },
        {
          label: "Type",
          name: "type",
          input: <Input />,
          rules: [
            {
              required: true,
              message: "Please input implementations-Type !",
              rules: [],
            },
          ],
        },
        {
          label: "URL",
          name: "implementations[0].url",
          input: <Input />,
          rules: [
            {
              required: true,
              message: "Please input implementations-Url !",
              rules: [],
            },
          ],
        },
      ],
    },
  ];

  return (
    <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      form={form}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      {formModel.map(({ label, name, rules, input, childrens }) =>
        name === "implementations" || name === "editions" ? (
          <Form.Item key={name} label={label} name={name} rules={rules}>
            <Space direction="vertical">
              <Button>Edit {label}</Button>
              <div>
                {data[name] &&
                  data[name].map((i) => (
                    <Tag
                      key={i.name + i["ig-version"]}
                      style={{ marginBottom: ".5rem" }}
                    >
                      {`${i.name} `}
                      {i["ig-version"] && i["ig-version"]}
                    </Tag>
                  ))}
              </div>
            </Space>
          </Form.Item>
        ) : (
          <Form.Item key={name} label={label} name={name} rules={rules}>
            {input}
          </Form.Item>
        )
      )}

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          提交
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CustomForm;
