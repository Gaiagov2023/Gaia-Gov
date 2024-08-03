import React from "react";
import { Checkbox, FormControlLabel } from "@mui/material";
import { EmailOutlined, LockOutlined } from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import RegisterFlowLayout from "../layout/RegisterFlowLayout";
import Input from "../common/Input";
import {
  BottomLine,
  CustomButton,
  CustomLink,
  ForgotPassContainer,
  Form,
  Heading,
  Heading2,
} from "../styledComponent/registerPages";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../utils/validations";
import { api } from "../utils/api";
import useAuth from "../hooks/useAuth";
import { toast } from "react-hot-toast";
import { routesConstants } from "../utils/routeConstant";

const Login = () => {
  const { login } = useAuth();
  const { state } = useLocation();
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      email: state?.email || "",
      password: "",
      isRemember: false,
    },
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    try {
      data["roleId"] = "3";
      const response = await api("/user/login", "POST", data);
      if (response?.data?.isVerified === false) {
        const otpResponse = await api("/user/send-otp", "POST", {
          roleId: "3",
          mobileNo: response.data?.mobileNo,
        });
        if (otpResponse?.status === 200) {
          navigate(routesConstants.verifyOtp.path, {
            state: {
              type: "register",
              email: response.data?.email,
              mobileNo: response.data?.mobileNo,
            },
          });
        } else {
          throw new Error(otpResponse?.message);
        }
      } else if (response.status === 200 && response.data?.auth_token) {
        const data = {
          email: response.data?.email,
          name: response.data?.name,
          role: response.data?.role,
          phone: response.data?.mobileNo,
          profile_image: response.data?.profile_picture,
        };
        localStorage.setItem("token", response.data?.auth_token);
        localStorage.setItem("user_info", JSON.stringify(data));
        login();
        toast.success(response?.message);
        navigate(routesConstants.dashboard.path);
      } else {
        throw new Error(response?.message);
      }
    } catch (err) {
      toast.error(err.message || "Something Went Wrong.");
    }
  };

  return (
    <RegisterFlowLayout>
      <Heading variant="h1" align="center">
        Login
      </Heading>
      <Heading2 variant="h4" align="center">
        Welcome back login
      </Heading2>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input
          name="email"
          control={control}
          inputProps={{
            label: "Email",
            placeholder: "Enter email",
            icon: EmailOutlined,
          }}
        />
        <Input
          name="password"
          control={control}
          inputProps={{
            label: "Password",
            type: "password",
            placeholder: "Enter password",
            icon: LockOutlined,
          }}
        />
        <ForgotPassContainer>
          <FormControlLabel
            control={
              <Checkbox
                name="isRemember"
                onChange={(e) => setValue("isRemember", e.target.checked)}
              />
            }
            label="Remember Me"
          />
          <CustomLink to={routesConstants.forgotPassword.path}>
            Forgot Password
          </CustomLink>
        </ForgotPassContainer>
        <CustomButton
          variant="contained"
          size="large"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Loading..." : "Login"}
        </CustomButton>
      </Form>
      <BottomLine>
        Don't have an account?{" "}
        <CustomLink to={routesConstants.register.path}>Register</CustomLink>
      </BottomLine>
    </RegisterFlowLayout>
  );
};

export default Login;
