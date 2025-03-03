import * as Yup from "yup";

export const merchantValidationSchema = Yup.object().shape({
  first_name: Yup.string().required("First name is required"),
  last_name: Yup.string().required("Last name is required"),
  businessName: Yup.string().required("Business name is required"),
  email: Yup.string()
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/,
      "Invalid email address",
    )
    .min(4, "Email must be at least 4 characters")
    .max(50, "Email cannot exceed 50 characters")
    .required("Email is required"),
  city: Yup.string().required("City is required"),
  website: Yup.string().url("Invalid URL, url should begin with http"),
  postal_code: Yup.string().required("Postal code is required"),
  password: Yup.string()
    .required("Password is required")
    .matches(
      /^(?=.*[a-z])/,
      "Password must contain at least one lowercase letter.",
    )
    .matches(
      /^(?=.*[A-Z])/,
      "Password must contain at least one uppercase letter.",
    )
    .matches(/^(?=.*\d)/, "Password must contain at least one number.")
    .matches(
      /^(?=.*[@$#!%*?&])/,
      "Password must contain at least one special character.",
    )
    .matches(
      /^[A-Za-z\d@$!%*?&]{8,50}$/,
      "Password length must be between 8 to 50 characters.",
    ),
  confirm_password: Yup.string()
    .oneOf([Yup.ref("password"), undefined], "Passwords must match")
    .required("Confirm password is required"),
  phone: Yup.string()
    .matches(/^\d+$/, "Phone number can only contain numbers")
    .min(4, "Minimum 4 digits required")
    .max(15, "Maximum 15 digits allowed")
    .required("Phone number is required"),
  termsAgreed: Yup.bool().oneOf([true], "Terms must be agreed"),
});

export const defaultUserValidationSchema = Yup.object().shape({
  first_name: Yup.string().required("First name is required"),
  last_name: Yup.string().required("Last name is required"),
  email: Yup.string()
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/,
      "Invalid email address",
    )
    .min(4, "Email must be at least 4 characters")
    .max(50, "Email cannot exceed 50 characters")
    .required("Email address is required"),
  // postal_code: Yup.string()
  // .matches(/^\d{6}$/, "Postal Code only contain 6 numbers")
  // .required("Postal code is required"),
  password: Yup.string()
    .required("Password is required")
    .matches(
      /^(?=.*[a-z])/,
      "Password must contain at least one lowercase letter.",
    )
    .matches(
      /^(?=.*[A-Z])/,
      "Password must contain at least one uppercase letter.",
    )
    .matches(/^(?=.*\d)/, "Password must contain at least one number.")
    .matches(
      /^(?=.*[@$#!%*?&])/,
      "Password must contain at least one special character.",
    )
    .matches(
      /^[A-Za-z\d@$!%*?&]{8,50}$/,
      "Password length must be between 8 to 50 characters.",
    ),
  confirm_password: Yup.string()
    .oneOf([Yup.ref("password"), undefined], "Passwords must match")
    .required("Confirm password is required"),
  termsAgreed: Yup.bool().oneOf([true], "Terms must be agreed"),
});

export const CharityAndCorpotationValidationSchema = Yup.object().shape({
  first_name: Yup.string().required("First name is required"),
  last_name: Yup.string().required("Last name is required"),
  organizationName: Yup.string().required("Organization name is required"),
  city: Yup.string().required("City is required"),
  website: Yup.string()
    .url("Invalid website URL")
    .required("Website is required"),
  email: Yup.string()
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/,
      "Invalid email address",
    )
    .required("Email is required"),
  postal_code: Yup.string().required("Postal code is required"),
  password: Yup.string()
    .required("Password is required")
    .matches(
      /^(?=.*[a-z])/,
      "Password must contain at least one lowercase letter.",
    )
    .matches(
      /^(?=.*[A-Z])/,
      "Password must contain at least one uppercase letter.",
    )
    .matches(/^(?=.*\d)/, "Password must contain at least one number.")
    .matches(
      /^(?=.*[@$#!%*?&])/,
      "Password must contain at least one special character.",
    )
    .matches(
      /^[A-Za-z\d@$!%*?&]{8,50}$/,
      "Password length must be between 8 to 50 characters.",
    ),
  confirm_password: Yup.string()
    .oneOf([Yup.ref("password"), undefined], "Passwords must match")
    .required("Confirm password is required"),
  termsAgreed: Yup.bool()
    .oneOf([true], "Terms must be agreed")
    .required("Terms must be agreed"),
  phone: Yup.string()
    .matches(/^\d+$/, "Phone number can only contain numbers")
    .min(4, "Minimum 4 digits required")
    .max(15, "Maximum 15 digits allowed")
    .required("Phone number is required"),
});
