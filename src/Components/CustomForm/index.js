import React, { useEffect, useState, useRef } from "react";
import {
  Button,
  Form,
  Input,
  Space,
  Tag,
  Tooltip,
  Collapse,
  Switch,
  InputNumber,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { addData, editData } from "../../Redux/Slices/Data";
import {
  closeModal,
  openModal,
  updateFormData,
  switchForm,
} from "../../Redux/Slices/Modal";
import MultipleTags from "./MultipleTags";
import TagForm from "./TagForm";

const CustomForm = () => {
  const { isOpen, data, type, tag } = useSelector((state) => state.modal);
  const [form] = Form.useForm();
  const [analysisForm] = Form.useForm();

  const dispatch = useDispatch();

  useEffect(() => {
    if (!isOpen) {
      form.resetFields();
      analysisForm.resetFields();
    }
  }, [isOpen]);
  useEffect(() => {
    if (data) {
      form.setFieldsValue(data);
      analysisForm.setFieldsValue(data.analysis);
    }
  }, [data]);

  const onFinish = (formData) => {
    const analysisData = analysisForm.getFieldsValue();

    if (type === "create") {
      dispatch(addData({ data: { ...formData, analysis: analysisData } }));
    }
    if (type === "edit") {
      dispatch(editData({ data: { ...formData, analysis: analysisData } }));
    }
    dispatch(closeModal());
  };

  const handleTagClick = (tagType) => {
    dispatch(switchForm({ tag: tagType }));
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const CustomCollapse = () => {
    const { Panel } = Collapse;
    const fields = [
      {
        label: "Content",
        name: "content",
        input: <Switch />,
        rules: [],
      },
      {
        label: "Rest",
        name: "rest",
        input: <Switch />,
        rules: [],
      },
      {
        label: "Documents",
        name: "documents",
        input: <Switch />,
        rules: [],
      },
      {
        label: "ClinicalCode",
        name: "clinicalCode",
        input: <Switch />,
        rules: [],
      },
      {
        label: "MedsMgmt",
        name: "medsMgmt",
        input: <Switch />,
        rules: [],
      },
      {
        label: "Profiles",
        name: "profiles",
        input: <InputNumber />,
        rules: [],
      },
      {
        label: "Extensions",
        name: "extensions",
        input: <InputNumber />,
        rules: [],
      },
      {
        label: "Operations",
        name: "operations",
        input: <InputNumber />,
        rules: [],
      },
      {
        label: "Valuesets",
        name: "valuesets",
        input: <InputNumber />,
        rules: [],
      },
      {
        label: "CodeSystems",
        name: "codeSystems",
        input: <InputNumber />,
        rules: [],
      },
      {
        label: "Examples",
        name: "examples",
        input: <InputNumber />,
        rules: [],
      },
    ];
    return (
      <Collapse ghost>
        <Panel header="Analysis" key="1">
          <Form
            name="analysis"
            form={analysisForm}
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            labelAlign="left"
          >
            {fields.map((field) => (
              <Form.Item
                key={field.name}
                label={field.label}
                name={field.name}
                rules={field.rules}
                valuePropName={field.input.type["__ANT_SWITCH"] && "checked"}
              >
                {field.input}
              </Form.Item>
            ))}
          </Form>
        </Panel>
      </Collapse>
    );
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
      label: "Npm-Name",
      name: "npm-name",
      input: <Input />,
      rules: [],
    },
    {
      label: "History",
      name: "history",
      input: <Input />,
      rules: [],
    },
    {
      label: "CI_Build",
      name: "ci-build",
      input: <Input />,
      rules: [],
    },
    {
      label: "Canonical",
      name: "canonical",
      input: <Input />,
      rules: [],
    },
    {
      label: "Language",
      name: "language",
      input: <MultipleTags type="language" />,
      rules: [],
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
    {
      label: "Analysis",
      name: "analysis",
      input: <CustomCollapse />,
      rules: [],
    },
  ];

  const TagTootip = ({ item }) => {
    return (
      <div>
        {Object.entries(item).map(([key, value]) => (
          <div key={key}>{`${key} : ${value}`}</div>
        ))}
      </div>
    );
  };

  const IGForm = () => {
    return (
      <Form
        name="ig"
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
                <Button onClick={() => handleTagClick(name)}>
                  Edit {label}
                </Button>
                <div>
                  {data[name] &&
                    data[name].map((i) => (
                      <Tooltip
                        key={i.name + i["ig-version"]}
                        placement="top"
                        title={<TagTootip item={i} />}
                      >
                        <Tag style={{ marginBottom: ".5rem" }}>
                          {i.name}
                          {i["ig-version"] && i["ig-version"]}
                        </Tag>
                      </Tooltip>
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
            Submit
          </Button>
        </Form.Item>
      </Form>
    );
  };

  return <>{tag ? <TagForm type={tag} form={form} /> : <IGForm />}</>;
};

export default CustomForm;
