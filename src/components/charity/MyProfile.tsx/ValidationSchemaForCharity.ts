import * as Yup from "yup";

export const validationCharityProfile = Yup.object().shape({
  first_name: Yup.string()
    .required("First name is required")
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name must be less than 50 characters"),
  last_name: Yup.string()
    .required("Last name is required")
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name must be less than 50 characters"),
  email: Yup.string()
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/,
      "Invalid email address",
    )
    .required("Email is required"),
  phone: Yup.string()
    .matches(/^\d+$/, "Phone number can only contain numbers")
    .min(4, "Minimum 4 digits required")
    .max(15, "Maximum 15 digits allowed")
    .required("Phone number is required"),
  website: Yup.string().url("Invalid URL").required("Website is required"),
  organisation_name: Yup.string().required("Organisation name is required"),
  organisation_logo: Yup.mixed().required("Charity logo is required"),
});

export const validationForCharityLocation = Yup.object().shape({
  address: Yup.string().required("Address line 1 is required"),
  address2: Yup.string().required("Address line 2 is required"),
  city: Yup.string().required("City is required"),
  postal_code: Yup.string()
    .matches(/^\d{6}$/, "Postal code only contain 6 numbers")
    .required("Postal code is required"),
  country_id: Yup.object().required("Country is required"),
  state_id: Yup.object()
    .shape({
      value: Yup.string().required("State is required"),
      label: Yup.string().required("State is required"),
    })
    .required("State is required"),
});

export const validationForCharity = Yup.object().shape({
  bank_name: Yup.string()
    .required("Bank name is required")
    .min(2, "Bank name must be at least 2 characters")
    .max(50, "Bank name must be less than 50 characters"),
  ifsc_code: Yup.string().required("IFSC code is required"),
  account_number: Yup.string()
    .matches(/^\d+$/, "Account number must be a number")
    .min(8, "Account number must be at least 8 digits")
    .required("Account number is required"),
  confirm_account_number: Yup.string()
    .oneOf([Yup.ref("account_number")], "Account numbers must match")
    .required("Confirm Account number is required"),
  account_name: Yup.string()
    .required("Account name is required")
    .min(2, "Account name must be at least 2 characters")
    .max(50, "Account name must be less than 50 characters"),
  branch_address: Yup.string()
    .required("Branch address is required")
    .min(10, "Branch address must be at least 10 characters")
    .max(100, "Branch address must be less than 100 characters"),
});

export const validationForCharityPassword = Yup.object().shape({
  current_password: Yup.string().required("Current password is required"),
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
      /^[A-Za-z\d@$!%*?&\s]{8,50}$/,
      "Password length must be between 8 to 50 characters and can contain spaces.",
    ),
  password_confirmation: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
});

export const validationForCharityInfo = Yup.object().shape({
  registration_number: Yup.string().required(
    "Charity registration number is required",
  ),
  files: Yup.array()
    .test(
      "files-or-initialfiles",
      "At least one file is required",
      function (value) {
        return (
          (value && value.length > 0) ||
          (this.parent.initialFiles && this.parent.initialFiles.length > 0) ||
          (this.parent.files && this.parent.files.length > 0)
        );
      },
    )
    .required("File upload is required"),
  number_of_employees: Yup.string()
    .test(
      "not-starting-with-negative",
      "Number of employees must be positive number",
      (value) => !value?.startsWith("-"),
    )
    .matches(/^\d+$/, "Number of employees must be a number")
    .test(
      "greater-than-zero",
      "Number of employees must be greater than 0",
      function (value) {
        return value ? parseInt(value, 10) > 0 : false;
      },
    )
    .required("Number of employees is required"),
  total_donor_base: Yup.string()
    .test(
      "not-starting-with-negative",
      "Total donor base must be positive number",
      (value) => !value?.startsWith("-"),
    )
    .matches(/^\d+$/, "Total donor base must be a number")
    .test(
      "greater-than-zero",
      "Total donor base must be greater than 0",
      function (value) {
        return value ? parseInt(value, 10) > 0 : false;
      },
    )
    .required("Total donor base is required"),
  company_support: Yup.string().required(
    "Companies who support you currently is required",
  ),
  contact_phone: Yup.string()
    .matches(/^\d+$/, "Phone number can only contain numbers")
    .min(7, "Minimum 7 digits required")
    .max(15, "Maximum 15 digits allowed")
    .required("Phone number is required"),
  email: Yup.string()
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/,
      "Invalid email address",
    )
    .email("Invalid email address")
    .required("Email address is required"),
  website: Yup.string().required("Website is required").url("Invalid URL"),
});
