import React from "react";
import styled from "@emotion/styled";
import { ArrowBack } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { Button, Box as MuiBox, Typography } from "@mui/material";
import { routesConstants } from "../utils/routeConstant";

const Box = styled(MuiBox)(({ theme }) => ({
  width: "100%",
  height: "100vh",
  backgroundColor: theme.palette.background.default,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  "& img": {
    width: "500px",
    height: "auto",
    maxWidth: "100%",
    maxHeight: "100%",
  },
}));

const NoRouteMatch = ({
  title = "Page Not Found",
  btnText = "Back to Dashboard",
}) => {
  const navigate = useNavigate();
  return (
    <Box>
      <img src="/static/images/page_not_found.gif" alt="page not found" />
      <Typography variant="h4" sx={{ mb: 3, mx: 2 }}>
        {title}
      </Typography>
      <Button
        onClick={() => navigate(routesConstants.home.path)}
        startIcon={<ArrowBack />}
      >
        {btnText}
      </Button>
    </Box>
  );
};

export default NoRouteMatch;
