import React, { useState } from "react";
import toast from "react-hot-toast";
import { api } from "../../utils/api";
import { Actions, useBills } from "../../hooks/useBills";
import DeleteConfirmModal from "../../common/DeleteConfirm";

const DeleteModal = ({ onConfirm }) => {
  const [state, dispatch] = useBills();
  const [loading, setLoading] = useState(false);

  const onConfirmDelete = async () => {
    try {
      setLoading(true);
      const response = await api(
        "/politician/delete-bill/" + state.deleteModalDetails.id,
        "DELETE"
      );
      if (response.status === 200) {
        if (state.billList.content.length > 1) {
          onConfirm({ page: state.billList.currentPage });
        } else {
          onConfirm();
        }
        toast.success(response.message);
        dispatch({
          type: Actions.TOGGLE_DELETE_MODAL,
          payload: { open: false, id: null },
        });
      } else {
        throw new Error(response.message);
      }
    } catch (err) {
      toast.error(err.message || "Something Went Wrong.");
      setLoading(false);
    }
  };
  return (
    <DeleteConfirmModal
      open={state.deleteModalDetails.open}
      title={"Confirm you want to Delete?"}
      loading={loading}
      content={"Are you want to delete this bill."}
      onConfirmDelete={onConfirmDelete}
      onClose={() =>
        !loading &&
        dispatch({
          type: Actions.TOGGLE_DELETE_MODAL,
          payload: { open: false, id: null },
        })
      }
      handleClose={() =>
        !loading &&
        dispatch({
          type: Actions.TOGGLE_DELETE_MODAL,
          payload: { open: false, id: null },
        })
      }
    />
  );
};

export default DeleteModal;
