import React, { useEffect } from "react";
import RegisterFlowLayout from "../layout/RegisterFlowLayout";
import {
  CustomButton,
  Form,
  Heading,
  Heading2,
} from "../styledComponent/registerPages";
import { Box, FormHelperText, styled } from "@mui/material";
import { MuiOtpInput } from "mui-one-time-password-input";
import { verifyOtpSchema } from "../utils/validations";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useLocation, useNavigate } from "react-router-dom";
import { api } from "../utils/api";
import { toast } from "react-hot-toast";
import { routesConstants } from "../utils/routeConstant";
// import { RecaptchaVerify, SendCode, VerifyCode } from "../utils/firebase";

const btnId = "recaptcha-container";

const VerifyOTP = () => {
  // const [confirmationResult, setConfirmationResult] = useState({
  //   loading: true,
  //   result: null,
  //   msg: "sending otp...",
  // });

  const { state } = useLocation();
  const navigate = useNavigate();

  const fromRegister = state?.type === "register";

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: { otp: "" },
    resolver: yupResolver(verifyOtpSchema),
  });

  const StyledOtp = styled(MuiOtpInput)(() => ({
    ".MuiOtpInput-TextField": {
      maxWidth: "50px",
    },
  }));

  useEffect(() => {
    if (!(state?.email || state?.mobileNo)) {
      navigate(routesConstants.login.path);
    }
  }, [navigate, state]);

  // useEffect(() => {
  //   let timer = null;
  //   if (state?.mobileNo && fromRegister) {
  //     (async () => {
  //       try {
  //         const reCaptchaVerifier = RecaptchaVerify(btnId);
  //         timer = setTimeout(async () => {
  //           try {
  //             // send code in given mobile number
  //             const result = await SendCode(state.mobileNo, reCaptchaVerifier);
  //             toast.success("OTP sent successfully on your mobile number.");
  //             setConfirmationResult({ result, loading: false, message: "" });
  //           } catch (err) {
  //             if (err?.code === "auth/too-many-requests") {
  //               toast.error(
  //                 "Too many request has been sent on this number, Please wait some time"
  //               );
  //             } else {
  //               toast.error(
  //                 err.message || "OTP not sent, Please retry after some time."
  //               );
  //             }
  //             setConfirmationResult({
  //               result: null,
  //               loading: true,
  //               msg: "try again",
  //             });
  //           }
  //         }, 0);
  //       } catch (err) {
  //         toast.error(err.message);
  //         setConfirmationResult({
  //           result: null,
  //           loading: true,
  //           msg: "try again",
  //         });
  //       }
  //     })();
  //   }
  //   return () => {
  //     clearTimeout(timer);
  //   };
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  const verifyUser = async (data) => {
    try {
      // await VerifyCode(confirmationResult.result, data.otp);
      data["roleId"] = "3";
      if (state?.email) data["email"] = state.email;
      if (state?.mobileNo) data["mobileNo"] = state.mobileNo;
      const response = await api("/politician/verify-user", "POST", data);
      if (response.status === 200) {
        toast.success(response.message);
        navigate(routesConstants.login.path, { state });
      } else {
        throw new Error(response.message);
      }
    } catch (err) {
      toast.error(err.message || "Something Went Wrong.");
    }
  };

  const onSubmit = async (data) => {
    try {
      data["roleId"] = "3";
      if (state?.email) data["email"] = state?.email;
      if (state?.mobileNo) data["mobileNo"] = state?.mobileNo;
      const response = await api("/user/verify-otp", "POST", data);
      if (response.status === 200) {
        toast.success(response.message);
        navigate(routesConstants.resetPassword.path, { state });
      } else {
        throw new Error(response.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <RegisterFlowLayout>
      <Heading variant="h1" align="center">
        OTP Verify
      </Heading>
      <Heading2 variant="h4" align="center">
        We have sent the code verification to your mobile number.
      </Heading2>
      <Form onSubmit={handleSubmit(fromRegister ? verifyUser : onSubmit)}>
        <Controller
          name="otp"
          control={control}
          rules={{ validate: (value) => value.length === 6 }}
          render={({ field, fieldState }) => (
            <Box sx={{ margin: "0px auto" }}>
              <StyledOtp
                sx={{ gap: 1, margin: "10px 0px" }}
                {...field}
                length={6}
                TextFieldsProps={{ size: "small" }}
              />
              {fieldState.invalid ? (
                <FormHelperText error>OTP invalid</FormHelperText>
              ) : null}
            </Box>
          )}
        />
        <CustomButton
          variant="contained"
          sx={{ margin: "10px auto" }}
          size="large"
          type="submit"
          disabled={
            isSubmitting
            // || (confirmationResult.loading && fromRegister)
          }
        >
          {
            // confirmationResult.msg && fromRegister
            //   ? confirmationResult.msg :
            isSubmitting ? "Loading..." : "Verify"
          }
        </CustomButton>
      </Form>
      <div id={btnId} />
    </RegisterFlowLayout>
  );
};

export default VerifyOTP;
