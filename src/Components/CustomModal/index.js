import { Button, Modal } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomForm from "../CustomForm";
import { closeModal, switchForm } from "../../Redux/Slices/Modal";
import TagForm from "../TagForm";

const CustomModal = () => {
  const dispatch = useDispatch();
  const { isOpen, type, tag, tagData, data } = useSelector(
    (state) => state.modal
  );

  const handleOk = () => {
    dispatch(closeModal());
  };

  const handleCancel = () => {
    dispatch(closeModal());
  };

  const handleBack = () => {
    dispatch(switchForm({ tag: "", tagData: [] }));
  };

  const ModalTitle = () => {
    return <div>{tag ? <Button onClick={handleBack}>back</Button> : type}</div>;
  };

  return (
    <Modal
      title={<ModalTitle />}
      visible={isOpen}
      footer={null}
      onOk={handleOk}
      onCancel={handleCancel}
      // bodyStyle={{ height: "60vh" }}
      width={800}
    >
      {tag ? <TagForm type={tag} data={data[tag]} /> : <CustomForm />}
    </Modal>
  );
};

export default CustomModal;
