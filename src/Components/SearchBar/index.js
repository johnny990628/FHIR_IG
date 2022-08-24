import React, { useEffect } from "react";
import { Button, Form, Input, message, Select } from "antd";
import { SearchOutlined, DeleteOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { fetchIG } from "../../Redux/Slices/Data";

const SearchBar = () => {
    const [form] = Form.useForm();

    const { category, authority } = useSelector((state) => state.data);
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

    const CustomSelect = ({ options }) => {
        const { Option } = Select;

        const onSearch = (value) => {
            console.log(value);
        };
        return (
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
                props: {},
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
                props: {},
                rules: [],
                options: category,
            },
        },
        {
            label: "篇目",
            name: "contents",
            input: {
                type: "text",
                placeholder: "篇目",
                props: {},
                rules: [],
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
                    span: 12,
                }}
                layout="inline"
                form={form}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
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
                                <CustomSelect
                                    options={input.options}
                                    {...input.props}
                                />
                            </Form.Item>
                        )}
                    </>
                ))}

                <Form.Item
                    style={{ margin: ".3rem", marginRight: '.5rem', marginLeft: '1rem' }}
                >
                    <Button
                        type="primary"
                        htmlType="submit"
                        icon={<SearchOutlined />}
                    ></Button>
                </Form.Item>

                <Form.Item style={{ margin: ".3rem" }}>
                    <Button
                        htmlType="button"
                        onClick={onReset}
                        icon={<DeleteOutlined />}
                    ></Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default SearchBar;
