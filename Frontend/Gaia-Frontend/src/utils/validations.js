import * as yup from "yup";

export const loginSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string("Enter your password")
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
});

export const registerSchema = yup.object({
  picture_image: yup
    .mixed("Upload Profile photo")
    .required("Profile photo is required")
    .test(
      "is-valid-size",
      "Please upload image with file size below 5MB.",
      (value) => {
        return value
          ? typeof value === "object"
            ? value.size <= 5242880 /* 5 MB */
            : true
          : false;
      }
    ),
  logo: yup
    .mixed("Upload Government photo")
    .required("Government photo is required")
    .test(
      "is-valid-size",
      "Please upload image with file size below 5MB.",
      (value) => {
        return value
          ? typeof value === "object"
            ? value.size <= 5242880 /* 5 MB */
            : true
          : false;
      }
    ),
  firstName: yup
    .string("Enter your first name")
    .required("First name is required"),
  lastName: yup
    .string("Enter your last name")
    .required("Last name is required"),
  mobileNo: yup
    .string("Enter your mobile number")
    .required("Mobile number is required"),
  country: yup.string("Select Country").required("Country is required"),
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string("Enter your password")
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
  confirmPassword: yup
    .string("Enter your confirm password")
    .oneOf(
      [yup.ref("password"), null],
      "Confirm passwords must match with password"
    )
    .required("Confirm Password is required"),
  officeAddress1: yup
    .string("Enter your address")
    .required("Address line 1 is required"),
  officeAddress2: yup
    .string("Enter your address")
    .required("Address line 2 is required"),
});

export const forgotPasswordSchema = yup.object({
  // email: yup
  //   .string("Enter your email")
  //   .email("Enter a valid email")
  //   .required("Email is required"),
  mobileNo: yup
    .string("Enter your mobile number")
    .required("Mobile number is required"),
});

export const resetPasswordSchema = yup.object({
  password: yup
    .string("Enter your password")
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
  confirm_password: yup
    .string("Enter your password")
    .oneOf(
      [yup.ref("password"), null],
      "Confirm passwords must match with password"
    )
    .required("Password is required"),
});

export const verifyOtpSchema = yup.object({
  otp: yup
    .string("Enter your otp")
    .min(6, "otp should be of minimum 6 characters length")
    .required("Otp is required"),
});

export const lawMakersFormSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  firstName: yup
    .string("Enter your first name")
    .required("First name is required"),
  lastName: yup
    .string("Enter your last name")
    .required("Last name is required"),
  noOfVotes: yup
    .number("Enter no of votes")
    .typeError("Votes must be a positive number")
    .min(0, "No of votes should be in positive")
    .required("No of votes is required"),
  title: yup.string("Enter your title").required("Title is required"),
});

export const addLawMakersSchema = yup.object({
  lawMakers: yup.array().of(lawMakersFormSchema),
});

export const billCreateSchema = yup.object({
  title: yup.string().required("Bill title is required"),
  url: yup.string().required("Bill url is required"),
  date: yup.string().required("Date is required."),
  voteResult: yup.array().of(
    yup.object({
      email: yup
        .string()
        .email("Email is invalid")
        .required("Law maker email is required"),
      vote: yup
        .bool("Law maker vote is require")
        .oneOf([true, false])
        .nullable(),
      // .required("Law maker vote is require"),
    })
  ),
});
