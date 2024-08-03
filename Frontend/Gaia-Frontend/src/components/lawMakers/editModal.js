import React from "react";
import { Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Modal from "../../common/Modal";
import Input from "../../common/Input";
import { Form } from "../../styledComponent/registerPages";
import { lawMakersFormSchema } from "../../utils/validations";
import {
  FooterBtnContainer,
  FormFieldContainer,
} from "../../styledComponent/crudPages";
import { initialObj, inputFields } from "./constant";
import { Actions, useLawMakers } from "../../hooks/useLawMakers";
import { api } from "../../utils/api";
import toast from "react-hot-toast";

const EditModal = ({ onConfirm }) => {
  const [state, dispatch] = useLawMakers();
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: state.editModalDetails.detail || initialObj,
    resolver: yupResolver(lawMakersFormSchema),
  });

  const onSubmit = async (values) => {
    try {
      const response = await api(
        "/politician/update-sub-politician",
        "PUT",
        values
      );
      if (response.status === 200) {
        onConfirm({ page: state.lawMakersList.currentPage });
        toast.success(response.message);
        dispatch({
          type: Actions.TOGGLE_EDIT_MODAL,
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
      open={state.editModalDetails.open}
      close
      size="md"
      fullWidth={true}
      title={"Edit Law Maker"}
      onClose={() =>
        !isSubmitting &&
        dispatch({
          type: Actions.TOGGLE_EDIT_MODAL,
          payload: { open: false, detail: null },
        })
      }
      handleClose={() =>
        !isSubmitting &&
        dispatch({
          type: Actions.TOGGLE_EDIT_MODAL,
          payload: { open: false, detail: null },
        })
      }
    >
      <Form
        onSubmit={handleSubmit(onSubmit)}
        style={{ margin: "auto", maxWidth: "100%" }}
      >
        <FormFieldContainer>
          {inputFields.map(({ name, ...restFields }) => (
            <Input
              key={name}
              name={name}
              control={control}
              inputProps={{
                ...restFields,
                sx: { width: { md: "calc(50% - 5px)", sm: "100%" } },
              }}
            />
          ))}
        </FormFieldContainer>
        <FooterBtnContainer>
          <Button
            variant="outlined"
            key="cancel"
            disabled={isSubmitting}
            onClick={() =>
              dispatch({
                type: Actions.TOGGLE_EDIT_MODAL,
                payload: { open: false, detail: null },
              })
            }
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            key="create"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Saving..." : "Save"}
          </Button>
        </FooterBtnContainer>
      </Form>
    </Modal>
  );
};

export default EditModal;
