import { Button, Grid, Typography, styled } from "@mui/material";
import { Link } from "react-router-dom";

export const Form = styled(({ children, onSubmit, ...props }) => (
  <form onSubmit={onSubmit} {...props}>
    {children}
  </form>
))`
  display: flex;
  align-items: flex-start;
  flex-flow: column;
  min-width: 50%;
  max-width: 85%;
`;

export const Heading = styled(Typography)(({ theme }) => ({
  fontSize: "24px",
  fontWeight: 700,
  color: theme.palette.text.primary,
  marginTop: "10px",
  marginBottom: "10px",
  textAlign: "center",
  width: "80%",
}));

export const Heading2 = styled(Typography)(({ theme }) => ({
  fontSize: "14px",
  fontWeight: 400,
  color: theme.palette.text.primary,
  textAlign: "center",
  marginBottom: "20px",
  width: "60%",
  [theme.breakpoints.down("sm")]: {
    width: "90%",
  },
}));

export const PhotoUploadContainer = styled("div")(() => ({
  display: "flex",
}));

export const ForgotPassContainer = styled("div")(() => ({
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
}));

export const CustomButton = styled(Button)(({ theme }) => ({
  fontSize: "14px",
  fontWeight: 600,
  height: "46px",
  width: "160px",
  marginTop: "10px",
  [theme.breakpoints.down("sm")]: {
    width: "100%",
  },
}));

export const BottomLine = styled("span")(() => ({
  padding: "30px 0",
}));

export const HelpText = styled("p")(({ error, theme }) => ({
  color: error ? theme.palette.text.error : theme.palette.text.secondary,
  margin: "3px 14px 0px",
  flexWrap: "wrap",
  fontWeight: 400,
  fontSize: "0.75rem",
  lineHeight: "1.66",
  letterSpacing: "0.03333em",
}));

export const CustomLink = ({ children, ...props }) => (
  <Link style={{ color: "#3c7bd5", textDecoration: "none" }} {...props}>
    {children}
  </Link>
);

/**
 * Below styles are applied to the RegisterFlow component
 */
export const GridLeft = styled(Grid)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  width: "100%",
  height: "100vh",
  position: "relative",
}));

export const GridTop = styled(Grid)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  width: "100%",
  height: "100px",
  position: "relative",
}));

export const GridRight = styled(Grid)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  [theme.breakpoints.down("sm")]: {
    justifyContent: "flex-start",
  },
  flexFlow: "column",
  "&.MuiGrid-item": {
    padding: "0px",
  },
}));

export const Image = styled("img")(() => ({
  width: "60%",
  height: "auto",
  position: "absolute",
  left: "50%",
  top: "50%",
  transform: "translate(-50%, -50%)",
}));
