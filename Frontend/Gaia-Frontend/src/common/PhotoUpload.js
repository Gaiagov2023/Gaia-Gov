import React, { useRef } from "react";
import { styled } from "@mui/material";
import { HelpText } from "../styledComponent/registerPages";
import { Controller } from "react-hook-form";

const PhotoUpload = ({ icon, label, name, control }) => {
  const input = useRef(null);

  const ImageContainer = styled("div")(() => ({
    maxWidth: "120px",
    margin: "8px 10px 0 0",
  }));

  const ImageDiv = styled("div")(({ error, theme }) => ({
    width: "120px",
    height: "120px",
    margin: "0 auto",
    cursor: "pointer",
    borderWidth: "2px",
    borderStyle: "dotted",
    borderColor: error ? theme.palette.text.error : "#0000003b",
    borderRadius: "10px",
  }));

  const Image = styled("img")(() => ({
    width: "100%",
    height: "100%",
    borderRadius: "10px",
    objectFit: "contain",
  }));

  const IconContainer = styled("div")(() => ({
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  }));

  const Icon = styled(icon)(({ error, theme }) => ({
    color: error ? "#F5CBCB" : theme.palette.text.secondary,
    width: "50%",
    height: "50%",
  }));

  const Label = styled("div")(({ error, theme }) => ({
    color: error ? "#F5CBCB" : theme.palette.text.secondary,
    textAlign: "center",
    fontWeight: 400,
    fontSize: "0.95rem",
  }));

  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onChange, value },
        fieldState: { invalid, error },
      }) => (
        <ImageContainer>
          <ImageDiv error={invalid} onClick={() => input.current.click()}>
            {value ? (
              <Image
                src={
                  typeof value === "object" ? URL.createObjectURL(value) : value
                }
                alt={name}
              />
            ) : (
              <IconContainer>
                <Icon error={invalid} />
                {label ? <Label error={invalid}>{label}</Label> : null}
              </IconContainer>
            )}
          </ImageDiv>
          <input
            accept="image/*"
            multiple={false}
            id={name}
            name={name}
            ref={input}
            type="file"
            style={{ display: "none", width: "0px", height: "0px" }}
            onChange={(e) => onChange(e.target.files[0])}
          />
          <HelpText
            error={invalid}
            sx={{ textAlign: "center", marginLeft: "6px", marginRight: "6px" }}
          >
            {error?.message}
          </HelpText>
        </ImageContainer>
      )}
    />
  );
};

PhotoUpload.defaultProps = {
  label: "",
  name: "",
};

export default PhotoUpload;
