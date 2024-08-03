import React from "react";
import { Button } from "@mui/material";
import Modal from "./Modal";

const DeleteConfirmModal = ({
  open,
  title,
  loading,
  content,
  onClose,
  handleClose,
  onConfirmDelete,
}) => {
  return (
    <Modal
      open={open}
      close
      title={title}
      onClose={onClose}
      handleClose={handleClose}
      fullWidth={true}
      size="sm"
      actions={[
        <Button
          key="disagree"
          variant="text"
          disabled={loading}
          onClick={handleClose}
        >
          Cancel
        </Button>,
        <Button
          key="agree"
          autoFocus
          color="error"
          variant="contained"
          disabled={loading}
          onClick={onConfirmDelete}
        >
          {loading ? "Deleting..." : "Delete"}
        </Button>,
      ]}
    >
      {content}
    </Modal>
  );
};

export default DeleteConfirmModal;
