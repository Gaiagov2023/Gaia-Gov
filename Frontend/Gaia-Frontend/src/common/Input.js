import React, { useCallback, useState } from "react";
import { IconButton, InputAdornment, TextField, styled } from "@mui/material";
import { Controller } from "react-hook-form";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const Input = ({ inputProps, control, name }) => {
  const [showPass, setShowPass] = useState(false);

  const { icon, type = "text", ...restProps } = inputProps;

  const Icon = icon
    ? styled(icon)(({ theme }) => ({
        color: theme.palette.text.primary,
      }))
    : null;

  const handleClickShowPassword = useCallback(
    () => setShowPass((show) => !show),
    []
  );

  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { ref, ...restField },
        fieldState: { invalid, error },
      }) => (
        <TextField
          variant="outlined"
          {...restField}
          {...restProps}
          type={type === "password" && showPass ? "text" : type || "text"}
          id={name}
          error={invalid}
          helperText={error?.message}
          inputRef={ref}
          fullWidth
          margin="normal"
          InputProps={{
            startAdornment: icon ? (
              <InputAdornment position="start">
                <Icon />
              </InputAdornment>
            ) : null,
            endAdornment:
              type === "password" ? (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={(e) => e.preventDefault()}
                    edge="end"
                  >
                    {showPass ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ) : null,
          }}
        />
      )}
    />
  );
};

export default Input;
