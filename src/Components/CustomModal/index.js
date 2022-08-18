import { Modal } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomForm from "../CustomForm";
import { closeModal } from "../../Redux/Slices/Modal";

const CustomModal = () => {
  const dispatch = useDispatch();
  const { isOpen, type } = useSelector((state) => state.modal);

  const handleOk = () => {
    dispatch(closeModal());
  };

  const handleCancel = () => {
    dispatch(closeModal());
  };

  return (
    <Modal
      title={type}
      visible={isOpen}
      footer={null}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <CustomForm />
    </Modal>
  );
};

export default CustomModal;
