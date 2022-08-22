import { Button, Modal } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomForm from "../CustomForm";
import { closeModal } from "../../Redux/Slices/Modal";

const CustomModal = () => {
  const dispatch = useDispatch();
  const { isOpen, type, tag } = useSelector((state) => state.modal);

  const handleOk = () => {
    dispatch(closeModal());
  };

  const handleCancel = () => {
    dispatch(closeModal());
  };

  // const ModalTitle = () => {
  //   return <div>{tag ? <Button onClick={handleBack}>back</Button> : type}</div>;
  // };

  return (
    <Modal
      title={type}
      visible={isOpen}
      footer={null}
      onOk={handleOk}
      onCancel={handleCancel}
      // bodyStyle={{ height: "60vh" }}
      width={900}
    >
      <CustomForm />
    </Modal>
  );
};

export default CustomModal;
