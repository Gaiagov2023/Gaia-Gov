import { Link, Paper, Box as MuiBox, styled } from "@mui/material";

export const FooterComponent = styled(Paper)(({ theme }) => ({
  width: "100%",
  position: "fixed",
  bottom: 0,
  zIndex: theme.zIndex.drawer + 2,
  backgroundColor: theme.palette.text.primary,
}));

export const Box = styled(MuiBox)(() => ({
  height: "50px",
  display: "flex",
  flexGrow: 1,
  justifyContent: "space-between",
  alignItems: "center",
}));

export const TermsCondition = styled(Link)(() => ({
  color: "white",
  textDecoration: "none",
  fontSize: "13px",
}));
