import { Space, Table, Tag } from "antd";

import { deleteUser } from "../../Axios/user.js";

const columns = [
    {
        title: "FirstName",
        dataIndex: "firstName",
        key: "firstName",
        render: (text) => <a>{text}</a>,
    },
    {
        title: "LastName",
        dataIndex: "lastName",
        key: "lastName",
        render: (text) => <a>{text}</a>,
    },
    {
        title: "Email",
        dataIndex: "email",
        key: "email",
    },
    {
        title: "Action",
        key: "action",
        render: (_, record) => (
            <Space size="middle">
                <a
                    style={{ color: "#fc86ad" }}
                    onClick={async () => {
                        await deleteUser(record._id);
                    }}
                >
                    Delete
                </a>
            </Space>
        ),
    },
];

export default columns;
