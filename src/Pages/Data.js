import { useEffect } from "react";
import { Button, Space, Tag, Popconfirm, message } from "antd";
import {
  QuestionCircleOutlined,
  FormOutlined,
  ScissorOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import CustomTable from "../Components/CustomTable";
import { openModal } from "../Redux/Slices/Modal";
import { removeData, fetchIG, deleteIG } from "../Redux/Slices/Data";
import SearchBar from "../Components/SearchBar";

const Data = () => {
  const dispatch = useDispatch();
  const { searchData, data, rows, loading } = useSelector(
    (state) => state.data
  );
  const { isLogin } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchIG());
  }, []);

  const handleEdit = (data) => {
    dispatch(openModal({ data, type: "edit" }));
  };
  const handleDelete = (id) => {
    dispatch(deleteIG(id));
    message.success(`刪除成功`);
  };
  const handleCreate = () => {
    dispatch(openModal({ type: "create" }));
  };

  const Header = () => {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {isLogin && (
          <Button type="primary" onClick={handleCreate} icon={<FormOutlined />}>
            新增資料
          </Button>
        )}
        <SearchBar />
      </div>
    );
  };

  const columns = [
    {
      title: "規範說明",
      dataIndex: "Specification",
      key: "Specification",

      render: (_, record) => {
        return (
          <div
            key={record.name}
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "left",
            }}
          >
            <div>
              <a href={record.history}>{record.name} </a>
              <span style={{ color: "gray" }}> : {record.description}</span>
            </div>
            <div>
              {record.editions &&
                record.editions.map((i) => (
                  <Tag
                    key={i.name + i.url}
                    color="blue"
                    style={{ margin: ".3rem" }}
                  >
                    <a href={i.url}>
                      {i.name}
                      {i["ig-version"] && ` ( ${i["ig-version"]} )`}
                    </a>
                  </Tag>
                ))}
              {record.implementations &&
                record.implementations.map((i) => (
                  <Tag key={i.name + i.url} color="magenta">
                    <a href={i.url}>{i.name}</a>
                  </Tag>
                ))}
            </div>
          </div>
        );
      },
    },
    {
      title: "類別",
      dataIndex: "category",
      key: "category",
      width: "12%",
    },
    {
      title: "單位",
      dataIndex: "Authority",
      key: "Authority",
      width: "8%",
      render: (_, record) => (
        <div>
          {record.authority} / {record.country}
        </div>
      ),
    },
    {
      title: "操作",
      key: "action",
      width: "10%",
      render: (_, record) =>
        isLogin && (
          <Space>
            <Button
              primary
              onClick={() => handleEdit(record)}
              icon={<ScissorOutlined />}
            >
              編輯
            </Button>
            <Popconfirm
              placement="topRight"
              title="確定要刪除?"
              onConfirm={() => handleDelete(record._id)}
              okText="是"
              cancelText="否"
              icon={<QuestionCircleOutlined style={{ color: "red" }} />}
            >
              <Button danger icon={<DeleteOutlined />}>
                刪除
              </Button>
            </Popconfirm>
          </Space>
        ),
    },
  ];
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "2rem",
        paddingTop: "1rem",
      }}
    >
      <CustomTable
        data={searchData}
        columns={columns}
        total={rows}
        loading={loading}
        Header={Header}
      />
    </div>
  );
};

export default Data;
