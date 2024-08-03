import React from "react";
import RegisterFlowLayout from "../layout/RegisterFlowLayout";
import {
  BottomLine,
  CustomButton,
  CustomLink,
  Form,
  Heading,
  Heading2,
} from "../styledComponent/registerPages";
import { forgotPasswordSchema } from "../utils/validations";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { api } from "../utils/api";
import { toast } from "react-hot-toast";
import PhoneInput from "../common/PhoneInput";
import { routesConstants } from "../utils/routeConstant";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: { mobileNo: "" },
    resolver: yupResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data) => {
    try {
      data["roleId"] = "3";
      const response = await api("/user/send-otp", "POST", data);
      if (response.status === 200) {
        toast.success(response.message);
        navigate(routesConstants.verifyOtp.path, {
          state: {
            type: "forgot",
            email: data?.email,
            mobileNo: data?.mobileNo,
          },
        });
      } else {
        throw new Error(response.message);
      }
    } catch (err) {
      toast.error(err.message || "Something Went Wrong.");
    }
  };

  return (
    <RegisterFlowLayout>
      <Heading variant="h1" align="center">
        Forgot Password
      </Heading>
      <Heading2 variant="h4" align="center">
        {/* Enter the email associated with your account and we'll send an email
        with instructions to reset your password. */}
        Enter the mobile number associated with your account and we'll send a
        sms to mobile to verify your identity.
      </Heading2>
      <Form onSubmit={handleSubmit(onSubmit)}>
        {/* <Input
          name="email"
          control={control}
          inputProps={{
            label: "Email",
            placeholder: "Enter email",
            icon: EmailOutlined,
          }}
        /> */}
        <PhoneInput name="mobileNo" control={control} />
        <CustomButton
          size="large"
          type="submit"
          variant="contained"
          sx={{ margin: "20px auto" }}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Loading..." : "Send Link"}
        </CustomButton>
      </Form>
      <BottomLine>
        Already know your password?{" "}
        <CustomLink to={routesConstants.login.path}>Login</CustomLink>
      </BottomLine>
    </RegisterFlowLayout>
  );
};

export default ForgotPassword;
