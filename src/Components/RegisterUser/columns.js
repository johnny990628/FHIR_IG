import { Space, Table, Tag } from "antd";

import { deleteUser, putUser } from "../../Axios/user";

const columns = [
    {
        title: "FirstName",
        dataIndex: "firstName",
        key: "firstName",
        render: (text) => <p>{text}</p>,
    },
    {
        title: "LastName",
        dataIndex: "lastName",
        key: "lastName",
        render: (text) => <p>{text}</p>,
    },
    {
        title: "Email",
        dataIndex: "email",
        key: "email",
        render: (text) => <p>{text}</p>,
    },
    {
        title: "CreateTime",
        dataIndex: "_createTime",
        key: "createTime",
        render: (text) => {
            {
                var date = new Date(text);
            }
            return (
                <p>{`${date.getFullYear()}-${
                    date.getMonth() + 1
                }-${date.getDate()}_${date.getHours()}:${date.getMinutes()}`}</p>
            );
        },
    },
    {
        title: "Action",
        key: "action",
        render: (_, record) => (
            <>
                <Space size="middle">
                    <a
                        style={{ color: "#32a852" }}
                        onClick={async () => {
                            record.status = true;
                            await putUser(record);
                        }}
                    >
                        認可
                    </a>
                    <a
                        style={{ color: "#fc86ad" }}
                        onClick={async () => {
                            await deleteUser(record._id);
                        }}
                    >
                        Delete
                    </a>
                </Space>
            </>
        ),
    },
];

export default columns;
