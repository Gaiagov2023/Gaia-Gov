import React from "react";
import { Actions, useBills } from "../../hooks/useBills";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { api } from "../../utils/api";
import toast from "react-hot-toast";
import Modal from "../../common/Modal";
import {
  FooterBtnContainer,
  FormFieldContainer,
} from "../../styledComponent/crudPages";
import { Form } from "../../styledComponent/registerPages";
import Input from "../../common/Input";
import {
  Avatar,
  Box,
  Button,
  FormControlLabel,
  ListItemButton as MuiListItemButton,
  ListItemText,
  Radio,
  RadioGroup,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { initialObj, inputFields } from "./constant";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useLawMakers } from "../../hooks/useLawMakers";
import dayjs from "dayjs";
import { billCreateSchema } from "../../utils/validations";
import styled from "@emotion/styled";

const List = styled("ul")(({ theme }) => ({
  padding: "0px",
  width: "100%",
  backgroundColor: theme.palette.background.paper,
  maxHeight: "500px",
  overflowY: "auto",
}));
const ListItem = styled("li")(() => ({ listStyle: "none" }));
const ListItemDetail = styled("div")(() => ({
  display: "flex",
  alignItems: "center",
}));
const ListItemButton = styled(MuiListItemButton)(({ theme }) => ({
  borderRadius: "4px",
  paddingTop: "0px",
  paddingBottom: "0px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
  },
}));

const AddEditModal = ({ onConfirm, agendaId }) => {
  const matches = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const [state, dispatch] = useBills();
  const [lawMakersState] = useLawMakers();

  const AddModal = !state.addEditModalDetails?.detail;

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      voteResult: lawMakersState?.lawMakersList?.content.map((item) => ({
        firstName: item.firstName,
        lastName: item.lastName,
        email: item.email,
        vote: null,
      })),
      ...(state.addEditModalDetails?.detail || initialObj),
    },
    resolver: yupResolver(billCreateSchema),
  });

  const { fields } = useFieldArray({ control, name: "voteResult" });

  const onSubmit = async (values) => {
    try {
      values["agendaId"] = agendaId;
      values["date"] = dayjs(values.date).valueOf();
      let response;
      if (AddModal) {
        response = await api("/politician/create-bill", "POST", values);
      } else {
        response = await api("/politician/update-bill", "PUT", values);
      }
      if (response.status === 200) {
        onConfirm({ page: state.billList.currentPage });
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
      size="md"
      onClose={null}
      title={`${AddModal ? "Enter" : "Edit"} Bill Detail`}
      fullWidth={true}
      disableEscapeKeyDown={true}
      sx={{ "& .MuiDialog-container": { alignItems: "flex-start" } }}
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
        <FormFieldContainer sx={{ border: 0 }}>
          {inputFields.map(({ name, ...restFields }) => (
            <Input
              key={name}
              name={name}
              control={control}
              inputProps={{
                ...restFields,
                sx: {
                  width:
                    name === "title"
                      ? "100%"
                      : { sm: "100%", md: "calc(50% - 5px)" },
                  margin: "0px",
                },
              }}
            />
          ))}
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Controller
              control={control}
              name="date"
              render={({ field, fieldState: { error } }) => (
                <DatePicker
                  {...field}
                  label="Select date of vote"
                  sx={{ width: matches ? "100%" : "calc(50% - 5px)" }}
                  slotProps={{
                    textField: {
                      error: !!error?.message,
                      helperText: error?.message,
                    },
                  }}
                />
              )}
            />
          </LocalizationProvider>
        </FormFieldContainer>

        <Box sx={{ width: "100%" }}>
          <Typography variant="subtitle1">List of Law Makers</Typography>
          <Typography variant="caption">
            Choose the law makers who have voted.
          </Typography>
          <List>
            {fields?.length ? (
              fields?.map((obj, index) => (
                <ListItem key={obj.id}>
                  <ListItemButton>
                    <ListItemDetail>
                      <Avatar
                        alt={`Avatar n°${obj.id + 1}`}
                        src={`/static/images/avatar/${obj.id + 1}.jpg`}
                        sx={{ marginRight: "10px" }}
                      />
                      <ListItemText
                        id={`label-${obj.id}`}
                        primary={`${obj.firstName} ${obj.lastName}`}
                        secondary={obj.email}
                      />
                    </ListItemDetail>
                    <RadioGroup
                      row
                      name={`voteResult.${index}.vote`}
                      aria-disabled={!AddModal}
                      value={watch(`voteResult[${index}].vote`)}
                      onChange={(e) =>
                        setValue(
                          `voteResult[${index}].vote`,
                          e.target.value === "true" ? true : false
                        )
                      }
                    >
                      <FormControlLabel
                        value={true}
                        label="Positive"
                        control={<Radio />}
                        disabled={!AddModal}
                      />
                      <FormControlLabel
                        value={false}
                        label="Negative"
                        control={<Radio />}
                        disabled={!AddModal}
                      />
                    </RadioGroup>
                  </ListItemButton>
                </ListItem>
              ))
            ) : (
              <Typography
                variant="button"
                component="div"
                sx={({ palette }) => ({
                  textAlign: "center",
                  color: palette.text.secondary,
                })}
              >
                No Items Found.
              </Typography>
            )}
          </List>
        </Box>

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
            disabled={isSubmitting}
          >
            {isSubmitting
              ? "Loading..."
              : `${AddModal ? "Create" : "Save"} Bill`}
          </Button>
        </FooterBtnContainer>
      </Form>
    </Modal>
  );
};

export default AddEditModal;
