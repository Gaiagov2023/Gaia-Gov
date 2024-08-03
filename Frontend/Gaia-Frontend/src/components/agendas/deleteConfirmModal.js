import React, { useState } from "react";
import DeleteConfirmModal from "../../common/DeleteConfirm";
import { Actions, useAgenda } from "../../hooks/useAgenda";
import { api } from "../../utils/api";
import toast from "react-hot-toast";

const DeleteModal = ({ onConfirm }) => {
  const [state, dispatch] = useAgenda();
  const [loading, setLoading] = useState(false);

  const onConfirmDelete = async () => {
    try {
      setLoading(true);
      const response = await api(
        "/politician/delete-agenda/" + state.deleteModalDetails.id,
        "DELETE"
      );
      if (response.status === 200) {
        if (state.agendaList.content.length > 1) {
          onConfirm({ page: state.agendaList.currentPage });
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
        "All bills are listed under this agenda will be deleted and this action is not reversible. Are you sure want to delete this agenda?"
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
