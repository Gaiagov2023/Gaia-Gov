import { Typography, styled } from "@mui/material";

export const TitleContainer = styled("div")(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: "20px",
}));

export const Title = styled(Typography)(({ theme }) => ({
  fontSize: "2.5rem",
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.5rem",
  },
}));

export const FooterBtnContainer = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "end",
  width: "100%",
  marginTop: "20px",
  gap: "5px",
  [theme.breakpoints.down("sm")]: { flexDirection: "column-reverse" },
}));

export const FormFieldContainer = styled("div")(() => ({
  width: "100%",
  gap: "10px",
  display: "flex",
  alignItems: "baseline",
  flexWrap: "wrap",
  padding: "10px 0px",
  borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
}));
