import React from "react";
import RegisterFlowLayout from "../layout/RegisterFlowLayout";
import {
  BottomLine,
  CustomButton,
  CustomLink,
  Form,
  Heading,
  Heading2,
  PhotoUploadContainer,
} from "../styledComponent/registerPages";
import { Checkbox, FormControlLabel } from "@mui/material";
import {
  EmailOutlined,
  LockOutlined,
  PersonOutlineOutlined,
  ApartmentOutlined,
  AssuredWorkload,
  PersonOutline,
  PublicOutlined,
} from "@mui/icons-material";
import { registerSchema } from "../utils/validations";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { api } from "../utils/api";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import Input from "../common/Input";
import PhotoUpload from "../common/PhotoUpload";

import PhoneInput from "../common/PhoneInput";
import Dropdown from "../common/Dropdown";
import { useCountries } from "../hooks/useCountries";
import { routesConstants } from "../utils/routeConstant";

const defaultValues = {
  picture_image: "",
  logo: "",
  email: "",
  firstName: "",
  lastName: "",
  mobileNo: "",
  country: "",
  password: "",
  confirmPassword: "",
  officeAddress1: "",
  officeAddress2: "",
};

const Register = () => {
  const { countries } = useCountries();

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    defaultValues,
    resolver: yupResolver(registerSchema),
  });

  const onSubmit = async (data) => {
    try {
      const governmentType = searchParams.get("government_level");
      data["roleId"] = "3";
      data["governmentType"] = governmentType;
      const temp = data.country;
      delete data.country;
      data["country.name"] = temp;

      const formData = new FormData();
      Object.entries(data).forEach((item) => {
        formData.append(item[0], item[1]);
      });

      const response = await api("/politician/register", "POST", formData, {
        contentType: "multipart/form-data",
      });
      if (response.data) {
        toast.success(response.message);
        navigate(routesConstants.verifyOtp.path, {
          state: {
            type: "register",
            email: data.email,
            mobileNo: data.mobileNo,
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
        Get Started
      </Heading>
      <Heading2 variant="h4" align="center">
        Create your account now
      </Heading2>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <PhotoUploadContainer>
          <PhotoUpload
            name={"picture_image"}
            label={"Profile Image"}
            icon={PersonOutline}
            control={control}
          />
          <PhotoUpload
            name={"logo"}
            label={"Government Image"}
            icon={AssuredWorkload}
            control={control}
          />
        </PhotoUploadContainer>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          <Input
            name="firstName"
            control={control}
            inputProps={{
              label: "First Name",
              placeholder: "Enter first name",
              icon: PersonOutlineOutlined,
              sx: { width: { xs: "100%", sm: "calc(50% - 5px)" } },
            }}
          />
          <Input
            name="lastName"
            control={control}
            inputProps={{
              label: "Last Name",
              placeholder: "Enter last name",
              icon: PersonOutlineOutlined,
              sx: {
                width: { xs: "100%", sm: "calc(50% - 5px)" },
                marginLeft: { xs: "0px", sm: "10px" },
              },
            }}
          />
          <Input
            name="email"
            control={control}
            inputProps={{
              label: "Email",
              placeholder: "Enter email",
              icon: EmailOutlined,
              sx: { width: { xs: "100%", sm: "calc(50% - 5px)" } },
            }}
          />
          <div className="phone-input-width">
            <PhoneInput key="mobileNo" name="mobileNo" control={control} />
          </div>
          <Dropdown
            name="country"
            control={control}
            dropdownProps={{
              label: "Country",
              options: countries,
              icon: PublicOutlined,
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
              sx: { width: { xs: "100%", sm: "calc(50% - 5px)" } },
            }}
          />
          <Input
            name="confirmPassword"
            control={control}
            inputProps={{
              label: "Confirm Password",
              type: "password",
              placeholder: "Enter confirm password",
              icon: LockOutlined,
              sx: {
                width: { xs: "100%", sm: "calc(50% - 5px)" },
                marginLeft: { xs: "0px", sm: "10px" },
              },
            }}
          />
          <Input
            name="officeAddress1"
            control={control}
            inputProps={{
              label: "Address Line 1",
              placeholder: "Enter address line 1",
              icon: ApartmentOutlined,
              sx: { width: { xs: "100%", sm: "calc(50% - 5px)" } },
            }}
          />
          <Input
            name="officeAddress2"
            control={control}
            inputProps={{
              label: "Address Line 2",
              placeholder: "Enter address line 2",
              icon: ApartmentOutlined,
              sx: {
                width: { xs: "100%", sm: "calc(50% - 5px)" },
                marginLeft: { xs: "0px", sm: "10px" },
              },
            }}
          />
        </div>
        <FormControlLabel
          control={<Checkbox />}
          required={true}
          label={
            <p>
              I agree to all the{" "}
              <CustomLink to={routesConstants.termsConditions.path}>
                Terms & Conditions.
              </CustomLink>
            </p>
          }
        />
        <CustomButton
          variant="contained"
          size="large"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Loading..." : "Register"}
        </CustomButton>
      </Form>
      <BottomLine>
        Already have an Account?{" "}
        <CustomLink to={routesConstants.login.path}>Login</CustomLink>
      </BottomLine>
    </RegisterFlowLayout>
  );
};

export default Register;
