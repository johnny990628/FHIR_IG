import React, { useEffect, useState, useRef } from "react";
import {
  Button,
  Form,
  Input,
  Space,
  AutoComplete,
  Switch,
  Tooltip,
  Divider,
  message,
} from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { createIG, updateIG } from "../../Redux/Slices/Data";
import { closeModal } from "../../Redux/Slices/Modal";

const CustomForm = () => {
  const { isOpen, data, type } = useSelector((state) => state.modal);
  const { category, authority } = useSelector((state) => state.data);
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
    message.success(`${type === "create" ? "新增" : "更新"} 成功`);
    dispatch(closeModal());
  };

  const onFinishFailed = (errorInfo) => {
    console.log(errorInfo);
    message.error("提交失敗!必要欄位未填");
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
            {field.input.type === "text" && (
              <Form.Item
                key={field.name}
                label={field.label}
                name={[name, field.name]}
              >
                <Input
                  style={{
                    width: "25%",
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
                  <Tooltip key={field.name} title={field.label}>
                    <Form.Item
                      {...restField}
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
                  </Tooltip>
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

  const SelectInput = ({ name, placeholder, options }) => {
    const { Option } = AutoComplete;

    const [value, setValue] = useState("");

    const handleChange = (newValue) => {
      setValue(newValue);
    };

    return (
      <Form.Item name={name}>
        <AutoComplete
          showArrow
          onChange={handleChange}
          value={value}
          placeholder={placeholder}
        >
          {options.map((option) => (
            <Option key={option}>{option}</Option>
          ))}
        </AutoComplete>
      </Form.Item>
    );
  };

  const formModel = [
    {
      label: "名稱(Name)",
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
      label: "描述(Description)",
      name: "description",
      input: {
        type: "textArea",
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
      label: "類別(Category)",
      name: "category",
      input: {
        type: "select",
        placeholder: "Category",
        props: { name: "category", placeholder: "Category" },
        rules: [
          {
            required: true,
            message: "Please input category !",
          },
        ],
        options: category,
      },
    },
    {
      label: "單位(Authority)",
      name: "authority",
      input: {
        type: "select",
        placeholder: "Authority",
        props: { name: "authority", placeholder: "Authority" },
        rules: [
          {
            required: true,
            message: "Please input authority !",
          },
        ],
        options: authority,
      },
    },
    {
      label: "國家(Country)",
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
      label: "歷史(History)",
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
      label: "標準(Canonical)",
      name: "canonical",
      input: {
        type: "text",
        placeholder: "Canonical",
        rules: [],
      },
    },
    {
      label: "語言(Language)",
      name: "language",
      input: {
        type: "dynamic",
        placeholder: "Language",
        props: { name: "language", label: "Language" },
        rules: [],
      },
    },
    {
      label: "版本(Editions)",
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
      label: "實作(Implementations)",
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
      label: "分析(Analysis)",
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
              type: "text",
              rules: [],
            },
          },
          {
            label: "Extensions",
            name: "extensions",
            input: {
              type: "text",
              rules: [],
            },
          },
          {
            label: "Operations",
            name: "operations",
            input: {
              type: "text",
              rules: [],
            },
          },
          {
            label: "Valuesets",
            name: "valuesets",
            input: {
              type: "text",
              rules: [],
            },
          },
          {
            label: "CodeSystems",
            name: "codeSystems",
            input: {
              type: "text",
              rules: [],
            },
          },
          {
            label: "Examples",
            name: "examples",
            input: {
              type: "text",
              rules: [],
            },
          },
        ],
      },
    },
  ];

  return (
    <Form
      name="text"
      labelCol={{
        span: 5,
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
          {input.type === "textArea" && (
            <Form.Item key={name} label={label} name={name} rules={input.rules}>
              <Input.TextArea
                rows={4}
                placeholder={input.placeholder}
                {...input.props}
              />
            </Form.Item>
          )}
          {input.type === "select" && (
            <Form.Item key={name} label={label} name={name} rules={input.rules}>
              <SelectInput options={input.options} {...input.props} />
            </Form.Item>
          )}

          {input.type === "dynamic" && (
            <Form.Item key={name} label={label} name={name} rules={input.rules}>
              <DynamicForm {...input.props} />
            </Form.Item>
          )}
          {input.type === "dynamicNest" && (
            <Form.Item key={name} label={label} name={name} rules={input.rules}>
              <DynamicFormNest subFields={input.subFields} {...input.props} />
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
