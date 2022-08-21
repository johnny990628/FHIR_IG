import { Button, Divider, Form, Input, List, Space, Tag } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createTagData,
  deleteTagData,
  updateFormData,
  updateTagData,
} from "../../Redux/Slices/Modal";

const TagForm = ({ type, form }) => {
  const [tags, setTags] = useState(form.getFieldValue(type));
  const [editIndex, setEditIndex] = useState(null);
  const [editingData, setEditingData] = useState({});
  const [creatingData, setCreatingData] = useState({});

  const dispatch = useDispatch();

  useEffect(() => {
    form.setFieldValue(type, tags);
    dispatch(updateFormData({ data: { [type]: tags } }));
  }, [tags]);

  const handleEdit = (item, index) => {
    if (index === editIndex) {
      setEditIndex(null);
      // dispatch(
      //   updateTagData({ tagType: type, data: editingData, index: editIndex })
      // );
      setTags((tag) => tag.map((t, i) => (i === index ? editingData : t)));
      setEditingData({});
    } else {
      setEditIndex(index);
      setEditingData(item);
    }
  };
  const handleDelete = (index) => {
    setTags((tag) => tag.filter((_, i) => i !== index));
    // dispatch(deleteTagData({ tagType: type, index }));
  };

  const handleEditOnChange = (field, value) => {
    setEditingData((data) => ({
      ...data,
      [field]: value,
    }));
  };

  const handleCreateOnChange = (field, value) => {
    setCreatingData((data) => ({
      ...data,
      [field]: value,
    }));
  };

  const handleCreate = () => {
    setTags((tag) => [...tag, creatingData]);
    // dispatch(createTagData({ tagType: type, data: creatingData }));
    setCreatingData({});
  };

  const formModel = {
    editions: [
      {
        label: "Name",
        name: "name",
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
        name: "url",
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
    implementations: [
      {
        label: "Name",
        name: "name",
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
        name: "url",
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
  };

  return (
    <div style={{ height: "50vh", overflowY: "auto" }}>
      <List
        size="small"
        dataSource={tags}
        footer={
          <List.Item
            actions={[
              <Button key="list-loadmore-edit" onClick={handleCreate}>
                add
              </Button>,
            ]}
          >
            <Space direction="vertical">
              {formModel[type].map((model) => (
                <div key={model.label}>
                  <Input
                    placeholder={model.label}
                    value={creatingData[model.name]}
                    onChange={(e) =>
                      handleCreateOnChange(model.name, e.target.value)
                    }
                  />
                </div>
              ))}
            </Space>
          </List.Item>
        }
        renderItem={(i, index) => (
          <List.Item
            key={i.name + i.url}
            actions={[
              <Button
                key="list-loadmore-edit"
                onClick={() => handleEdit(i, index)}
              >
                {editIndex === index ? "save" : "edit"}
              </Button>,
              <Button
                key="list-loadmore-delete"
                danger
                onClick={() => handleDelete(index)}
              >
                delete
              </Button>,
            ]}
          >
            {editIndex === index ? (
              <Space direction="vertical">
                {formModel[type].map((model) => (
                  <Space key={model.label}>
                    <Tag color="blue">{model.label}</Tag>
                    <Input
                      value={editingData[model.name]}
                      onChange={(e) =>
                        handleEditOnChange(model.name, e.target.value)
                      }
                    />
                  </Space>
                ))}
              </Space>
            ) : (
              <Space direction="vertical">
                {formModel[type].map((model) => (
                  <Space key={model.label}>
                    {model.name === "name" ? (
                      <h3>{`${i.name}`}</h3>
                    ) : (
                      <div>
                        <Tag color="blue">{model.label}</Tag>
                        {i[model.name] && i[model.name]}
                      </div>
                    )}
                  </Space>
                ))}
              </Space>
            )}
          </List.Item>
        )}
      />
    </div>
  );
};

export default TagForm;
