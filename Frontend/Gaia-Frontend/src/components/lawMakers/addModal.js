import React from "react";
import { Button, IconButton, Tooltip, Typography } from "@mui/material";
import { useFieldArray, useForm } from "react-hook-form";
import { Add, Remove } from "@mui/icons-material";
import { yupResolver } from "@hookform/resolvers/yup";
import Modal from "../../common/Modal";
import Input from "../../common/Input";
import { Form } from "../../styledComponent/registerPages";
import { addLawMakersSchema } from "../../utils/validations";
import {
  FooterBtnContainer,
  FormFieldContainer,
} from "../../styledComponent/crudPages";
import { initialObj, inputFields, style } from "./constant";
import { api } from "../../utils/api";
import toast from "react-hot-toast";
import { Actions, useLawMakers } from "../../hooks/useLawMakers";

const AddModal = ({ onConfirm }) => {
  const [state, dispatch] = useLawMakers();
  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: { lawMakers: [initialObj] },
    resolver: yupResolver(addLawMakersSchema),
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "lawMakers",
  });

  const onSubmit = async ({ lawMakers }) => {
    try {
      const response = await api(
        "/politician/add-sub-politician-list",
        "POST",
        lawMakers
      );
      if (response.status === 200) {
        onConfirm({ page: state.lawMakersList.currentPage });
        toast.success(response.message);
        reset({ lawMakers: {} });
        dispatch({ type: Actions.TOGGLE_ADD_MODAL });
      } else {
        throw new Error(response.message);
      }
    } catch (err) {
      toast.error(err.message || "Something Went Wrong.");
    }
  };
  return (
    <Modal
      open={state.addModalOpen}
      close
      size="lg"
      onClose={null}
      title={"Add list of law makers"}
      handleClose={() =>
        !isSubmitting && dispatch({ type: Actions.TOGGLE_ADD_MODAL })
      }
      fullWidth={true}
      disableEscapeKeyDown={true}
      sx={{ "& .MuiDialog-container": { alignItems: "flex-start" } }}
    >
      <Typography variant="subtitle2">
        Enter list of law makers detail below.
      </Typography>
      <Form
        onSubmit={handleSubmit(onSubmit)}
        style={{ margin: "auto", maxWidth: "100%" }}
      >
        {fields.map((item, index) => (
          <FormFieldContainer key={item.id} sx={{ gap: "5px" }}>
            {inputFields.map(({ name, ...restFields }) => (
              <Input
                key={`lawMakers.${index}.${name}`}
                name={`lawMakers.${index}.${name}`}
                control={control}
                inputProps={{
                  ...restFields,
                  size: "small",
                  sx: style,
                }}
              />
            ))}
            {index !== 0 && (
              <Tooltip title="Remove">
                <IconButton onClick={() => remove(index)}>
                  <Remove />
                </IconButton>
              </Tooltip>
            )}
          </FormFieldContainer>
        ))}
        <Button
          type="button"
          sx={{ marginLeft: "auto", marginTop: "10px" }}
          onClick={() => append(initialObj)}
          disabled={fields.length > 19 || isSubmitting}
        >
          <Add /> Add New
        </Button>
        <FooterBtnContainer>
          <Button
            key="cancel"
            type="button"
            variant="outlined"
            disabled={isSubmitting}
            onClick={() => dispatch({ type: Actions.TOGGLE_ADD_MODAL })}
          >
            Cancel
          </Button>
          <Button
            key="create"
            type="submit"
            variant="contained"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Loading..." : `Add ${fields?.length} law maker(s)`}
          </Button>
        </FooterBtnContainer>
      </Form>
    </Modal>
  );
};

export default AddModal;
