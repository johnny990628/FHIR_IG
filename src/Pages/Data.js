import { Button, Space, Tag } from "antd";
import { useSelector, useDispatch } from "react-redux";
import CustomTable from "../Components/CustomTable";
import { openModal } from "../Redux/Slices/Modal";
import { removeData } from "../Redux/Slices/Data";

const Data = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.data);

  const handleEdit = (data) => {
    console.log(data);
    dispatch(openModal({ data, type: "edit" }));
  };
  const handleDelete = (id) => {
    dispatch(removeData({ id }));
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
                  <Tag key={i.url} color="blue" style={{ margin: ".3rem" }}>
                    <a href={i.url}>{`${i.name} ${i["ig-version"]}`}</a>
                  </Tag>
                ))}
              {record.implementations &&
                record.implementations.map((i) => (
                  <Tag key={i.name} color="magenta">
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
            編輯
          </Button>
          <Button danger onClick={() => handleDelete(record.id)}>
            刪除
          </Button>
        </Space>
      ),
    },
  ];
  return (
    <div>
      <CustomTable data={data} columns={columns} />
    </div>
  );
};

export default Data;
