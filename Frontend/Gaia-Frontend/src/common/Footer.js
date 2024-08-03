import React from "react";
import { Container, Typography } from "@mui/material";
import { routesConstants } from "../utils/routeConstant";
import {
  Box,
  FooterComponent,
  TermsCondition,
} from "../styledComponent/footer";

const Footer = () => {
  return (
    <FooterComponent square component="footer" variant="outlined">
      <Container maxWidth="lg">
        <Box>
          <Typography variant="caption" color="white">
            {`Copyright \u00A9 ${new Date().getFullYear()} by Gaia gov.`}
          </Typography>
          <TermsCondition href={routesConstants.termsConditions.path}>
            Terms & Conditions
          </TermsCondition>
        </Box>
      </Container>
    </FooterComponent>
  );
};

export default Footer;
