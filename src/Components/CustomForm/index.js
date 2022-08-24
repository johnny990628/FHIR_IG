import React, { useEffect, useState, useRef } from "react";
import {
  Button,
  Form,
  Input,
  Space,
  Collapse,
  Switch,
  InputNumber,
  Divider,
  message,
} from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { createIG, updateIG } from "../../Redux/Slices/Data";
import { closeModal } from "../../Redux/Slices/Modal";

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
    }
  }, [data]);

  const onFinish = (formData) => {
    if (type === "create") {
      dispatch(createIG(formData));
    }
    if (type === "edit") {
      dispatch(
        updateIG({
          id: data._id,
          data: formData,
        })
      );
    }
    message.success(`${type === "create" ? "Create" : "Update"} Success`);
    dispatch(closeModal());
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const CustomCollapse = ({ name, subFields }) => {
    return (
      <Input.Group>
        {subFields.map((field) => (
          <>
            {field.input.type === "switch" && (
              <Form.Item
                key={field.name}
                label={field.label}
                name={[name, field.name]}
                valuePropName="checked"
              >
                <Switch placeholder={field.label} />
              </Form.Item>
            )}
            {field.input.type === "number" && (
              <Form.Item key={field.name} name={[name, field.name]} noStyle>
                <Input
                  style={{
                    width: "25%",
                    marginRight: ".3rem",
                  }}
                  placeholder={field.label}
                />
              </Form.Item>
            )}
          </>
        ))}
      </Input.Group>
    );
  };

  const formModel = [
    {
      label: "Name",
      name: "name",
      input: {
        type: "text",
        placeholder: "Name",
        rules: [
          {
            required: true,
            message: "Please input name !",
          },
        ],
      },
    },
    {
      label: "Category",
      name: "category",
      input: {
        type: "text",
        placeholder: "Category",
        rules: [
          {
            required: true,
            message: "Please input category !",
          },
        ],
      },
    },
    {
      label: "Description",
      name: "description",
      input: {
        type: "text",
        placeholder: "Description",
        rules: [
          {
            required: true,
            message: "Please input description !",
          },
        ],
      },
    },
    {
      label: "Authority",
      name: "authority",
      input: {
        type: "text",
        placeholder: "Authority",
        rules: [
          {
            required: true,
            message: "Please input authority !",
          },
        ],
      },
    },
    {
      label: "Country",
      name: "country",
      input: {
        type: "text",
        placeholder: "Country",
        props: { showCount: true, maxLength: 2 },
        rules: [
          {
            required: true,
            message: "Please input authority !",
          },
        ],
      },
    },
    {
      label: "Npm-Name",
      name: "npm-name",
      input: {
        type: "text",
        placeholder: "Npm-Name",
        rules: [],
      },
    },
    {
      label: "History",
      name: "history",
      input: {
        type: "text",
        placeholder: "History",
        rules: [],
      },
    },
    {
      label: "CI_Build",
      name: "ci-build",
      input: {
        type: "text",
        placeholder: "CI_Build",
        rules: [],
      },
    },
    {
      label: "Canonical",
      name: "canonical",
      input: {
        type: "text",
        placeholder: "Canonical",
        rules: [],
      },
    },
    {
      label: "Language",
      name: "language",
      input: {
        type: "dynamic",
        placeholder: "Language",
        props: { name: "language", label: "Language" },
        rules: [],
      },
    },
    {
      label: "Editions",
      name: "editions",
      input: {
        type: "dynamicNest",
        placeholder: "Editions",
        props: { name: "editions" },
        rules: [],
        subFields: [
          {
            label: "Name",
            name: "name",
            input: {
              type: "text",
              placeholder: "Name",
              rules: [
                {
                  required: true,
                  message: "Please input editions-name !",
                },
              ],
            },
          },
          {
            label: "IG-Version",
            name: "ig-version",
            input: {
              type: "text",
              placeholder: "IG-Version",
              rules: [
                {
                  required: true,
                  message: "Please input ig-version !",
                },
              ],
            },
          },
          {
            label: "FHIR-Version",
            name: "fhir-version",
            input: {
              type: "text",
              placeholder: "FHIR-Version",
              rules: [
                {
                  required: true,
                  message: "Please input fhir-version !",
                },
              ],
            },
          },
          {
            label: "Package",
            name: "package",
            input: {
              type: "text",
              placeholder: "Package",
              rules: [
                {
                  required: true,
                  message: "Please input package !",
                },
              ],
            },
          },
          {
            label: "URL",
            name: "url",
            input: {
              type: "text",
              placeholder: "URL",
              rules: [
                {
                  required: true,
                  message: "Please input url !",
                },
              ],
            },
          },
        ],
      },
    },
    {
      label: "Implementations",
      name: "implementations",
      input: {
        type: "dynamicNest",
        placeholder: "Editions",
        props: { name: "implementations" },
        rules: [],
        subFields: [
          {
            label: "Name",
            name: "name",
            input: {
              type: "text",
              placeholder: "Name",
              rules: [
                {
                  required: true,
                  message: "Please input name !",
                },
              ],
            },
          },
          {
            label: "Type",
            name: "type",
            input: {
              type: "text",
              placeholder: "Type",
              rules: [
                {
                  required: true,
                  message: "Please input type !",
                },
              ],
            },
          },
          {
            label: "URL",
            name: "url",
            input: {
              type: "text",
              placeholder: "URL",
              rules: [
                {
                  required: true,
                  message: "Please input url !",
                },
              ],
            },
          },
        ],
      },
    },
    {
      label: "Analysis",
      name: "analysis",
      input: {
        type: "collapse",
        placeholder: "Analysis",
        props: { name: "analysis" },
        rules: [],
        subFields: [
          {
            label: "Content",
            name: "content",
            input: {
              type: "switch",
              rules: [],
            },
          },
          {
            label: "Rest",
            name: "rest",
            input: {
              type: "switch",
              rules: [],
            },
          },
          {
            label: "Documents",
            name: "documents",
            input: {
              type: "switch",
              rules: [],
            },
          },
          {
            label: "ClinicalCode",
            name: "clinicalCode",
            input: {
              type: "switch",
              rules: [],
            },
          },
          {
            label: "MedsMgmt",
            name: "medsMgmt",
            input: {
              type: "switch",
              rules: [],
            },
          },
          {
            label: "Profiles",
            name: "profiles",
            input: {
              type: "number",
              rules: [],
            },
          },
          {
            label: "Extensions",
            name: "extensions",
            input: {
              type: "number",
              rules: [],
            },
          },
          {
            label: "Operations",
            name: "operations",
            input: {
              type: "number",
              rules: [],
            },
          },
          {
            label: "Valuesets",
            name: "valuesets",
            input: {
              type: "number",
              rules: [],
            },
          },
          {
            label: "CodeSystems",
            name: "codeSystems",
            input: {
              type: "number",
              rules: [],
            },
          },
          {
            label: "Examples",
            name: "examples",
            input: {
              type: "number",
              rules: [],
            },
          },
        ],
      },
    },
  ];

  const DynamicForm = ({ label, name }) => {
    return (
      <Form.List label={label} name={name}>
        {(fields, { add, remove }) => (
          <>
            {fields.map((field, index) => (
              <Form.Item required={false} key={field.key}>
                <Form.Item
                  {...field}
                  validateTrigger={["onChange", "onBlur"]}
                  rules={[
                    {
                      required: true,
                      message: "Please fill or delete this field.",
                    },
                  ]}
                  noStyle
                >
                  <Input
                    style={{
                      width: "40%",
                      marginRight: "1rem",
                    }}
                    placeholder={label}
                  />
                </Form.Item>

                <MinusCircleOutlined
                  className="dynamic-delete-button"
                  onClick={() => remove(field.name)}
                />
              </Form.Item>
            ))}
            <Form.Item>
              <Button
                type="dashed"
                onClick={() => add()}
                block
                icon={<PlusOutlined />}
              >
                新增欄位
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
    );
  };

  const DynamicFormNest = ({ name, subFields }) => {
    return (
      <Form.List name={name}>
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <Space
                key={key}
                style={{ display: "flex", marginBottom: 8 }}
                align="baseline"
              >
                {subFields.map((field) => (
                  <Form.Item
                    {...restField}
                    key={field.name}
                    name={[name, field.name]}
                    rules={[
                      {
                        required: true,
                        message: "Please fill this field.",
                      },
                    ]}
                  >
                    <Input placeholder={field.input.placeholder} />
                  </Form.Item>
                ))}

                <MinusCircleOutlined onClick={() => remove(name)} />
              </Space>
            ))}
            <Form.Item>
              <Button
                type="dashed"
                onClick={() => add()}
                block
                icon={<PlusOutlined />}
              >
                新增欄位
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
    );
  };

  return (
    <Form
      name="text"
      labelCol={{
        span: 4,
      }}
      wrapperCol={{
        span: 18,
      }}
      form={form}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      labelAlign="right"
    >
      {formModel.map(({ label, name, input }) => (
        <>
          {input.type === "text" && (
            <Form.Item key={name} label={label} name={name} rules={input.rules}>
              <Input placeholder={input.placeholder} {...input.props} />
            </Form.Item>
          )}

          {input.type === "dynamic" && (
            <Form.Item key={name} label={label} name={name} rules={input.rules}>
              <DynamicForm {...input.props} />
            </Form.Item>
          )}
          {input.type === "dynamicNest" && (
            <Form.Item key={name} label={label} name={name} rules={input.rules}>
              <DynamicFormNest subFields={input.subFields} {...input.props} />{" "}
            </Form.Item>
          )}
          {input.type === "collapse" && (
            <Form.Item key={name} label={label} name={name} rules={input.rules}>
              <CustomCollapse subFields={input.subFields} {...input.props} />
            </Form.Item>
          )}
          <Divider />
        </>
      ))}

      <Form.Item
        wrapperCol={{ offset: 2, span: 20 }}
        style={{ marginTop: "3rem" }}
      >
        <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
          提交
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CustomForm;
