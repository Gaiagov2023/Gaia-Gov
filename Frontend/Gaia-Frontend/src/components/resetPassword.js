import React, { useEffect } from "react";
import { resetPasswordSchema } from "../utils/validations";
import RegisterFlowLayout from "../layout/RegisterFlowLayout";
import {
  CustomButton,
  Form,
  Heading,
  Heading2,
} from "../styledComponent/registerPages";
import Input from "../common/Input";
import { LockOutlined } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useLocation, useNavigate } from "react-router-dom";
import { api } from "../utils/api";
import { toast } from "react-hot-toast";
import { routesConstants } from "../utils/routeConstant";

const ResetPassword = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: { password: "", confirm_password: "" },
    resolver: yupResolver(resetPasswordSchema),
  });

  useEffect(() => {
    if (!(state?.email || state?.mobileNo)) {
      navigate(routesConstants.login.path);
    }
  }, [navigate, state]);

  const onSubmit = async (data) => {
    try {
      if (state?.email) data["email"] = state.email;
      if (state?.mobileNo) data["mobileNo"] = state.mobileNo;
      data["roleId"] = "3";
      const response = await api("/user/forgot-password", "POST", data);
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

  return (
    <RegisterFlowLayout>
      <Heading variant="h1" align="center">
        Reset Password
      </Heading>
      <Heading2 variant="h4" align="center">
        Your new password must be different from previous used passwords.
      </Heading2>
      <Form onSubmit={handleSubmit(onSubmit)}>
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
        <Input
          name="confirm_password"
          control={control}
          inputProps={{
            label: "Confirm Password",
            type: "password",
            placeholder: "Enter confirm password",
            icon: LockOutlined,
          }}
        />
        <CustomButton
          variant="contained"
          size="large"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Loading..." : "Submit"}
        </CustomButton>
      </Form>
    </RegisterFlowLayout>
  );
};

export default ResetPassword;
