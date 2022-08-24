import React, { useEffect, useState } from "react";
import { Button, Form, Input, message, Select } from "antd";
import { SearchOutlined, DeleteOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { fetchIG, resetSearchData, searchData } from "../../Redux/Slices/Data";
import { useDebouncedCallback } from "use-debounce";

const SearchBar = () => {
  const [form] = Form.useForm();
  const [searchQuerys, setSearchQuerys] = useState({});
  const { category, authority } = useSelector((state) => state.data);
  const dispatch = useDispatch();

  const onFinish = (formData) => {
    // dispatch(fetchIG(formData));
    message.success("Search Complete");
  };

  const onReset = () => {
    form.resetFields();
    dispatch(fetchIG());
    setSearchQuerys({});
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onValuesChange = useDebouncedCallback((values) => {
    const hide = message.loading("搜尋中...", 0);
    const [key, value] = Object.entries(values)[0];

    let newQuery = searchQuerys;
    value ? (newQuery[key] = value) : delete newQuery[key];

    setSearchQuerys(newQuery);

    setTimeout(() => {
      Object.keys(newQuery).length !== 0
        ? dispatch(searchData(newQuery))
        : dispatch(resetSearchData());
      hide();
    }, 500);
  }, 400);

  const CustomSelect = ({ options, name }) => {
    const { Option } = Select;

    const onSearch = (value) => {
      console.log(value);
    };
    return (
      <Form.Item name={name}>
        <Select
          style={{ width: 130 }}
          showSearch
          optionFilterProp="children"
          onSearch={onSearch}
          filterOption={(input, option) =>
            option.children.toLowerCase().includes(input.toLowerCase())
          }
        >
          {options.map((option) => (
            <Option key={option} value={option}>
              {option}
            </Option>
          ))}
        </Select>
      </Form.Item>
    );
  };

  const formModel = [
    {
      label: "搜尋",
      name: "name",
      input: {
        type: "text",
        placeholder: "搜尋",
        props: {},
        rules: [],
      },
    },
    {
      label: "單位",
      name: "authority",
      input: {
        type: "select",
        placeholder: "單位",
        props: { name: "authority" },
        rules: [],
        options: authority,
      },
    },
    {
      label: "類別",
      name: "category",
      input: {
        type: "select",
        placeholder: "類別",
        props: { name: "category" },
        rules: [],
        options: category,
      },
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
          span: 8,
        }}
        wrapperCol={{
          span: 10,
        }}
        layout="inline"
        form={form}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        onValuesChange={onValuesChange}
        autoComplete="off"
      >
        {formModel.map(({ label, name, rules, input, childrens }) => (
          <>
            {input.type === "text" && (
              <Form.Item
                key={name}
                label={label}
                name={name}
                rules={rules}
                style={{
                  margin: ".3rem",
                  marginRight: 0,
                  marginLeft: 0,
                }}
                wrapperCol={{ sm: 16 }}
              >
                <Input placeholder={input.label} />
              </Form.Item>
            )}

            {input.type === "select" && (
              <Form.Item
                key={name}
                label={label}
                name={name}
                rules={rules}
                style={{
                  margin: ".3rem",
                }}
              >
                <CustomSelect options={input.options} {...input.props} />
              </Form.Item>
            )}
          </>
        ))}

        {/* <Form.Item
          style={{ margin: ".3rem", marginRight: ".5rem", marginLeft: "1rem" }}
        >
          <Button
            type="primary"
            htmlType="submit"
            icon={<SearchOutlined />}
          ></Button>
        </Form.Item> */}

        <Form.Item style={{ margin: ".3rem", marginLeft: "1rem" }}>
          <Button htmlType="button" onClick={onReset} icon={<DeleteOutlined />}>
            清除搜尋
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SearchBar;
