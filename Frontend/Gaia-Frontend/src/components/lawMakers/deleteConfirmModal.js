import React, { useState } from "react";
import { Actions, useLawMakers } from "../../hooks/useLawMakers";
import toast from "react-hot-toast";
import { api } from "../../utils/api";
import DeleteConfirmModal from "../../common/DeleteConfirm";

const DeleteModal = ({ onConfirm }) => {
  const [loading, setLoading] = useState(false);
  const [state, dispatch] = useLawMakers();

  const onConfirmDelete = async () => {
    try {
      setLoading(true);
      const response = await api(
        "/politician/delete-sub-politician/" + state.deleteModalDetails.id,
        "DELETE"
      );
      if (response.status === 200) {
        if (state.lawMakersList.content.length > 1) {
          onConfirm({ page: state.lawMakersList.currentPage });
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
      content={
        "This action is not reversible. Are you want to delete this law maker."
      }
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
