import { useEffect } from "react";
import { Button, Space, Tag } from "antd";
import { useSelector, useDispatch } from "react-redux";
import CustomTable from "../Components/CustomTable";
import { openModal } from "../Redux/Slices/Modal";
import { removeData, fetchIG, deleteIG } from "../Redux/Slices/Data";
import SearchBar from "../Components/SearchBar";

const Data = () => {
  const dispatch = useDispatch();
  const { data, row } = useSelector((state) => state.data);

  useEffect(() => {
    dispatch(fetchIG());
  }, [row]);

  const handleEdit = (data) => {
    dispatch(openModal({ data, type: "edit" }));
  };
  const handleDelete = (id) => {
    // dispatch(removeData({ name }));
    dispatch(deleteIG(id));
  };
  const handleCreate = () => {
    dispatch(openModal({ type: "create" }));
  };

  const columns = [
    {
      title: "Specification",
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
      title: "category",
      dataIndex: "category",
      key: "category",
      width: "12%",
    },
    {
      title: "Authority",
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
      title: "Action",
      key: "action",
      width: "10%",
      render: (_, record) => (
        <Space>
          <Button primary onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Button danger onClick={() => handleDelete(record._id)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];
  return (
    <div>
      <SearchBar />
      <Button onClick={handleCreate}>New</Button>
      <CustomTable data={data} columns={columns} />
    </div>
  );
};

export default Data;
