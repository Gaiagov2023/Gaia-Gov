import { Grid } from "@mui/material";
import React from "react";
import {
  GridLeft,
  GridRight,
  GridTop,
  Image,
} from "../styledComponent/registerPages";

const RegisterFlowLayout = ({ children }) => {
  return (
    <Grid container spacing={0} marginTop={0}>
      <GridLeft
        item
        xs={0}
        sm={4}
        sx={{ display: { xs: "none", sm: "block" } }}
      >
        <Image src="/static/images/logo-vertical.svg" alt="main-image" />
      </GridLeft>
      <GridTop
        item
        xs={12}
        sm={0}
        sx={{ display: { xs: "block", sm: "none" } }}
      >
        <Image src="/static/images/logo-horizontal.svg" alt="main-image" />
      </GridTop>
      <GridRight
        item
        xs={12}
        sm={8}
        sx={{ height: { xs: "calc(100vh - 100px)", sm: "100vh" } }}
      >
        {children}
      </GridRight>
    </Grid>
  );
};

export default RegisterFlowLayout;
