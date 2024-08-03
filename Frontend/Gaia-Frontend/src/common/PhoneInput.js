import React from "react";
import { HelpText } from "../styledComponent/registerPages";
import ReactPhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";
import { styled } from "@mui/material";
import { Controller } from "react-hook-form";

const PhoneInput = ({ name, control }) => {
  const PhoneContainer = styled("div")(() => ({
    display: "flex",
    flexDirection: "column",
    width: "100%",
  }));

  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onChange, ref, ...rest },
        fieldState: { invalid, error },
      }) => (
        <PhoneContainer>
          <ReactPhoneInput
            {...rest}
            onChange={(e) => onChange("+" + e)}
            country={"us"}
            enableSearch={true}
            enableAreaCodeStretch={false}
            specialLabel={"Mobile Number"}
            containerStyle={{ marginTop: "16px" }}
            inputStyle={{
              width: "100%",
              borderColor: error ? "#D32F2F" : "#0000003B",
            }}
            inputProps={{
              ref: ref,
              id: name,
              key: name,
              name: name,
              placeholder: "Enter mobile number",
              autoComplete: "off",
              required: true,
            }}
          />
          <HelpText error={invalid}>{error?.message}</HelpText>
        </PhoneContainer>
      )}
    />
  );
};

export default PhoneInput;
