import * as Yup from "yup";

export const validationSchemaMerchantInfo = Yup.object().shape({
  business_name: Yup.string().required("Business name is required"),
  category_ids: Yup.array()
    .min(1, "At least one category is required")
    .required("Category is required"),
  type: Yup.number().required("Type is required"),
  business_number: Yup.number().required("Business number is required"),
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
  selling_duration: Yup.string().required("Selling duration is required"),
  yearly_revenue: Yup.string().required("Yearly revenue is required"),
  sku_count: Yup.string().required("SKU count is required"),
  country_id: Yup.object()
    .shape({
      value: Yup.string().required("Country is required"),
      label: Yup.string().required("Country is required"),
    })
    .required("Country is required"),
  state_id: Yup.object()
    .shape({
      value: Yup.string().required("State is required"),
      label: Yup.string().required("State is required"),
    })
    .required("State is required"),
  charity_support: Yup.string().required(
    "Charities you currently support are required",
  ),
  address_line_1: Yup.string().required("Address line 1 is required"),
  address_line_2: Yup.string().required("Address line 2 is required"),
  postal_code: Yup.string().required("Postal code is required"),
  city: Yup.string().required("City is required"),
});

export const validationForMerchantProfile = Yup.object().shape({
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
});

export const validationSchemaForPassword = Yup.object().shape({
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
      /^[A-Za-z\d@$!%*?&]{8,50}$/,
      "Password length must be between 8 to 50 characters.",
    ),
  password_confirmation: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
});

export const validationSchemaForBankInfo = Yup.object().shape({
  bank_name: Yup.string()
    .required("Bank name is required")
    .min(2, "Bank name must be at least 2 characters")
    .max(50, "Bank name must be less than 50 characters"),
  ifsc_code: Yup.string().required("IFSC code is required"),
  // .matches(/^[A-Z]{4}0[A-Z0-9]{6}$/, "Invalid IFSC code format"),
  account_number: Yup.string()
    .required("Account number is required")
    .matches(/^\d+$/, "Account number must be numeric")
    .min(8, "Account number must be at least 8 digits")
    .max(20, "Account number must be less than 20 digits"),
  confirm_account_number: Yup.string()
    .required("Please confirm your account number")
    .oneOf([Yup.ref("account_number")], "Account numbers must match"),
  account_name: Yup.string()
    .required("Account name is required")
    .min(2, "Account name must be at least 2 characters")
    .max(50, "Account name must be less than 50 characters"),
  branch_address: Yup.string()
    .required("Branch address is required")
    .min(10, "Branch address must be at least 10 characters")
    .max(100, "Branch address must be less than 100 characters"),
});

export const validationSchemaForStoreProfile = Yup.object().shape({
  name: Yup.string()
    .required("Store name is required")
    .min(2, "Store name must be at least 2 characters")
    .max(50, "Store name must be less than 50 characters"),
  description: Yup.string()
    .required("Description is required")
    .min(10, "Description must be at least 10 characters")
    .max(200, "Description must be less than 200 characters"),
  about_store: Yup.string()
    .required("About store is required")
    .min(20, "About store must be at least 20 characters"),
  logo: Yup.mixed().required("Store logo is required"),
  feature_image: Yup.mixed().required("Feature image is required"),
  gallery: Yup.array().min(1, "At least one gallery image is required"),
  twitter: Yup.string()
    .test("x", "Invalid x URL", (value) => {
      if (!value) {
        return true;``
      }
      try {
        const url = new URL(value);
        return url.host === "x.com" || url.host === "www.x.com";
      } catch (e) {
        return false;
      }
    })
    .required("Twitter URL is required"),
  linkedin: Yup.string()
    .test("twitter", "Invalid Linkedin URL", (value) => {
      if (!value) {
        return true;
      }
      try {
        const url = new URL(value);
        return url.host === "linkedin.com" || url.host === "www.linkedin.com";
      } catch (e) {
        return false;
      }
    })
    .required("Linkedin URL is required"),
  facebook: Yup.string()
    .test("twitter", "Invalid Facebook URL", (value) => {
      if (!value) {
        return true;
      }
      try {
        const url = new URL(value);
        return url.host === "facebook.com" || url.host === "www.facebook.com";
      } catch (e) {
        return false;
      }
    })
    .required("Facebook URL is required"),
});
