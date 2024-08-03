import React from "react";
import Modal from "../../common/Modal";
import { Actions, useAgenda } from "../../hooks/useAgenda";
import toast from "react-hot-toast";
import { Button } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { Form } from "../../styledComponent/registerPages";
import {
  FooterBtnContainer,
  FormFieldContainer,
} from "../../styledComponent/crudPages";
import { inputFields } from "./constant";
import Input from "../../common/Input";
import { api } from "../../utils/api";

const AddEditModal = ({ onConfirm }) => {
  const [state, dispatch] = useAgenda();

  const AddModal = !state.addEditModalDetails?.detail;

  const {
    control,
    handleSubmit,
    formState: { isDirty, isSubmitting },
  } = useForm({
    defaultValues: state.addEditModalDetails?.detail || { name: "" },
    resolver: yupResolver(
      yup.object({ name: yup.string().required("Agenda name is required") })
    ),
  });

  const onSubmit = async (values) => {
    try {
      let response;
      if (AddModal) {
        response = await api("/politician/create-agenda", "POST", values);
      } else {
        response = await api("/politician/update-agenda", "PUT", values);
      }
      if (response.status === 200) {
        onConfirm({ page: state.agendaList.currentPage });
        toast.success(response.message);
        dispatch({
          type: Actions.TOGGLE_ADD_EDIT_MODAL,
          payload: { open: false, detail: null },
        });
      } else {
        throw new Error(response.message);
      }
    } catch (err) {
      toast.error(err.message || "Something Went Wrong.");
    }
  };

  return (
    <Modal
      open={state.addEditModalDetails.open}
      close
      size="sm"
      onClose={null}
      title={`${AddModal ? "Enter" : "Edit"} Agenda Detail`}
      fullWidth={true}
      disableEscapeKeyDown={true}
      handleClose={() =>
        !isSubmitting &&
        dispatch({
          type: Actions.TOGGLE_ADD_EDIT_MODAL,
          payload: { open: false, detail: null },
        })
      }
    >
      <Form
        onSubmit={handleSubmit(onSubmit)}
        style={{ margin: "auto", maxWidth: "100%" }}
      >
        <FormFieldContainer sx={{ width: "100%", border: 0 }}>
          {inputFields.map(({ name, ...restFields }) => (
            <Input
              key={name}
              name={name}
              control={control}
              inputProps={{
                ...restFields,
                sx: { width: "100%", margin: "0px" },
              }}
            />
          ))}
        </FormFieldContainer>
        <FooterBtnContainer>
          <Button
            key="cancel"
            type="button"
            variant="outlined"
            disabled={isSubmitting}
            onClick={() =>
              dispatch({
                type: Actions.TOGGLE_ADD_EDIT_MODAL,
                payload: { open: false, detail: null },
              })
            }
          >
            Cancel
          </Button>
          <Button
            key="create"
            type="submit"
            variant="contained"
            disabled={isSubmitting || !isDirty}
          >
            {isSubmitting
              ? "Loading..."
              : `${AddModal ? "Create" : "Edit"} Agenda`}
          </Button>
        </FooterBtnContainer>
      </Form>
    </Modal>
  );
};

export default AddEditModal;
