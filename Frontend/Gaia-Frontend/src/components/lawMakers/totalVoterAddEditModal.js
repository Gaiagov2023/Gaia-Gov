import React from "react";
import Modal from "../../common/Modal";
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
import Input from "../../common/Input";
import { api } from "../../utils/api";
import { Actions, useLawMakers } from "../../hooks/useLawMakers";

const TotalVoterAddEditModal = ({ onConfirm }) => {
  const [state, dispatch] = useLawMakers();

  const AddModal = state.totalVoter === 0;

  const {
    control,
    handleSubmit,
    formState: { isDirty, isSubmitting },
  } = useForm({
    defaultValues: { totalVoter: state.totalVoter || 0 },
    resolver: yupResolver(
      yup.object({
        totalVoter: yup
          .number()
          .positive("Total voters must be a positive number")
          .required("Total voter is required"),
      })
    ),
  });

  const onSubmit = async (values) => {
    try {
      let response;
      if (AddModal) {
        response = await api("/politician/add-total-voter", "POST", values);
      } else {
        response = await api("/politician/update-total-voter", "PUT", values);
      }
      if (response.status === 200) {
        onConfirm();
        toast.success(response.message);
        dispatch({ type: Actions.SET_VOTER_COUNT, payload: values.totalVoter });
        dispatch({ type: Actions.TOGGLE_VOTER_MODAL, payload: false });
      } else {
        throw new Error(response.message);
      }
    } catch (err) {
      toast.error(err.message || "Something Went Wrong.");
    }
  };

  return (
    <Modal
      open={state.totalVoterModalOpen}
      size="sm"
      close={!AddModal}
      fullWidth={true}
      disableEscapeKeyDown={true}
      title={`${AddModal ? "Enter" : "Edit"} Voter Count`}
      sx={({ zIndex }) => ({ zIndex: zIndex.drawer - 1, marginLeft: "65px" })}
      handleClose={() =>
        !isSubmitting &&
        dispatch({
          type: Actions.TOGGLE_VOTER_MODAL,
          payload: { open: false, detail: null },
        })
      }
    >
      <Form
        onSubmit={handleSubmit(onSubmit)}
        style={{ margin: "auto", maxWidth: "100%" }}
      >
        <FormFieldContainer sx={{ width: "100%", border: 0 }}>
          <Input
            key={"totalVoter"}
            name={"totalVoter"}
            control={control}
            inputProps={{
              name: "totalVoter",
              label: "Total voters count",
              placeholder: "Enter total voters count",
              sx: { width: "100%", margin: "0px" },
            }}
          />
        </FormFieldContainer>
        <FooterBtnContainer>
          <Button
            key="create"
            type="submit"
            variant="contained"
            disabled={isSubmitting || !isDirty}
          >
            {isSubmitting
              ? "Loading..."
              : `${AddModal ? "Submit" : "Edit"} Count`}
          </Button>
        </FooterBtnContainer>
      </Form>
    </Modal>
  );
};
export default TotalVoterAddEditModal;
