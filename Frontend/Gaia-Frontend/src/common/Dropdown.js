import React from "react";
import {
  FormControl,
  FormHelperText,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  styled,
} from "@mui/material";
import { Controller } from "react-hook-form";

const Dropdown = ({ dropdownProps, control, name }) => {
  const { label, options, rootStyle, icon } = dropdownProps;

  const Icon = styled(icon)(({ theme }) => ({
    color: theme.palette.text.primary,
  }));

  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { ref, ...restField },
        fieldState: { invalid, error },
      }) => (
        <FormControl
          error={invalid}
          margin="normal"
          sx={{ width: "100%", ...rootStyle }}
        >
          <InputLabel id={name + "-label"}>{label}</InputLabel>
          <Select
            labelId={name + "-label"}
            variant="outlined"
            id={name}
            name={name}
            label={label}
            {...restField}
            MenuProps={{ PaperProps: { style: { maxHeight: 240 } } }}
            startAdornment={
              <InputAdornment position="start">
                <Icon />
              </InputAdornment>
            }
          >
            {options?.map((option, index) => (
              <MenuItem
                value={option.value}
                disabled={option.disabled || false}
                key={`dropdown-${name}-${option.value}-${index}`}
              >
                {option.label}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText error={invalid}>{error?.message}</FormHelperText>
        </FormControl>
      )}
    />
  );
};

export default Dropdown;
