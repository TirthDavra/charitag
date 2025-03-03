import * as Yup from "yup";

/**  Reusable function to generate common validation rules */
const generateBaseValidationSchema = () => {
  return Yup.object().shape({
    first_name: Yup.string().required("First name is required"),
    last_name: Yup.string().required("Last name is required"),
    // main_address: Yup.string().required("Main address is required"),
    email: Yup.string()
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/,
        "Invalid email address",
      )
      .min(4, "Email must be at least 4 characters")
      .max(50, "Email cannot exceed 50 characters")
      .required(" Email address is required"),
    // city_id: Yup.array()
    //   .of(
    //     Yup.object().shape({
    //       value: Yup.string().required(),
    //       label: Yup.string().required(),
    //     }),
    //   )
    //   .min(1, "City is required")
    //   .required("City is required"),
    // country_id: Yup.string().required("Country is required"),
    // postal_code: Yup.string().required("Postal code is required"),
    // website: Yup.string()
    //   .url("Invalid website URL")
    //   .required("Website is required"),
    // phone: Yup.string()
    //   .required("Phone number is required")
    //   .matches(/^[0-9]+$/, "Phone number must be numeric"),
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
    confirm_password: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm password is required"),
    // category_ids: Yup.array()
    //   .of(
    //     Yup.object().shape({
    //       value: Yup.number().required(),
    //       label: Yup.string().required(),
    //     }),
    //   )
    //   .min(1, "At least one category is required")
    //   .required("Category is required"),
  });
};

// Specific validation schemas based on the base schema
export const validationSchema = generateBaseValidationSchema().shape({
  business_name: Yup.string()
    .required("Business name is required")
    .min(2, "Business name is too short")
    .max(100, "Business name is too long"),
  // type_id: Yup.number().required("Type is required"),
});

export const validationSchemaCharity = generateBaseValidationSchema().shape({
  charity_name: Yup.string().required("Charity name is required"),
});

export const validationSchemaCorporate = generateBaseValidationSchema().shape({
  corporate_name: Yup.string()
    .required("Corporate name is required")
    .min(2, "Corporate name is too short")
    .max(100, "Corporate name is too long"),
});

export const validationSchemaSignIn = Yup.object().shape({
  email: Yup.string()
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/,
      "Invalid email address",
    )
    .required("Email address is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

const stepOneValidationSchema = Yup.object().shape({
  type: Yup.number().required("Type is required"),
  category_ids: Yup.array().min(1, "You must choose at least one category"),
});

const stepTwoValidationSchema = Yup.object().shape({
  address_line_1: Yup.string().required("Address line 1 is required"),
  address_line_2: Yup.string().required("Address line 2 is required"),
  city: Yup.string().required("City is required"),
  postal_code: Yup.string().required("Postal Code is required"),
  country_id: Yup.string().required("Country is required"),
  state_id: Yup.string().required("State is required"),
  phone: Yup.string()
    .matches(/^\d+$/, "Phone number can only contain numbers")
    .min(4, "Minimum 4 digits required")
    .max(15, "Maximum 15 digits allowed")
    .required("Phone number is required"),
  email: Yup.string()
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/,
      "Invalid email address",
    )
    .min(4, "Email must be at least 4 characters")
    .max(50, "Email cannot exceed 50 characters")
    .required("Email address is required"),
});

const stepThreeValidationSchema = Yup.object().shape({
  business_number: Yup.string().required("Business number is required"),
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
  charity_support: Yup.string().required(
    "Charities you currently support are required",
  ),
  selling_duration: Yup.string().required("Selling duration is required"),
  yearly_revenue: Yup.string().required("Yearly revenue is required"),
  sku_count: Yup.string().required("SKU count is required"),
  website: Yup.string().required("Website is required").url("Invalid URL"),
});

export const getValidationSchemaMerchant = (currentStep: number) => {
  switch (currentStep) {
    case 1:
      return stepOneValidationSchema;
    case 2:
      return stepTwoValidationSchema;
    case 3:
      return stepThreeValidationSchema;
    default:
      return stepOneValidationSchema;
  }
};

const stepOneValidationSchemaCharity = Yup.object().shape({
  category_ids: Yup.array().min(1, "At least one category is required"),
  area_id: Yup.string().required("Area is required"),
});

const stepTwoValidationSchemaCharity = Yup.object().shape({
  address_line_1: Yup.string().required("Address line 1 is required"),
  address_line_2: Yup.string().required("Address line 2 is required"),
  city: Yup.string().required("City is required"),
  postal_code: Yup.string().required("Postal Code is required"),
  country_id: Yup.string().required("Country is required"),
  state_id: Yup.string().required("State is required"),
  locations: Yup.number()
    .positive("Number must be positive")
    .required("Locations are required"),
});

const stepThreeValidationSchemaCharity = Yup.object().shape({
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
  number_of_employees: Yup.number()
    .positive("Number must be positive")
    .required("Number of employees is required"),
  total_donor_base: Yup.number()
    .positive("Number must be positive")
    .required("Total donor base is required"),
  phone: Yup.string()
    .matches(/^\d+$/, "Phone number can only contain numbers")
    .min(4, "Minimum 4 digits required")
    .max(15, "Maximum 15 digits allowed")
    .required("Phone number is required"),
  email: Yup.string()
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/,
      "Invalid email address",
    )
    .min(4, "Email must be at least 4 characters")
    .max(50, "Email cannot exceed 50 characters")
    .required(" Email address is required"),
  website: Yup.string().url("Invalid URL").required("Website is required"),
  company_support: Yup.string().required(
    "Charities you currently support are required",
  ),
});

export const getValidationSchemaCharity = (currentStep: number) => {
  switch (currentStep) {
    case 1:
      return stepOneValidationSchemaCharity;
    case 2:
      return stepTwoValidationSchemaCharity;
    case 3:
      return stepThreeValidationSchemaCharity;
    default:
      return stepOneValidationSchemaCharity;
  }
};

// Validation Schema for Step 1
const StepOneValidationSchemaCorporate = Yup.object().shape({
  type_id: Yup.string().required("Type is required"),
  category_ids: Yup.string().required("Category is required"),
});

// Validation Schema for Step 2
const StepTwoValidationSchemaCorporate = Yup.object().shape({
  locations: Yup.number()
    .positive("Number must be positive")
    .required("Number of locations is required"),
  address_line_1: Yup.string().required("Address line 1 is required"),
  address_line_2: Yup.string().required("Address line 2 is required"),
  city: Yup.string().required("City is required"),
  postal_code: Yup.string().required("Postal Code is required"),
  country_id: Yup.string().required("Country is required"),
  state_id: Yup.string().required("State is required"),
});

// Validation Schema for Step 3
const StepThreeValidationSchemaCorporate = Yup.object().shape({
  fundraising_goal: Yup.number()
    .positive("Number must be positive")
    .required("Fundraising goal is required"),
  date_to_achieve_goal: Yup.string()
    .nullable()
    .test(
      "len",
      "Date to achieve goal is required",
      (value) => value !== null && value !== undefined && value.length > 0,
    )
    .required("Date to achieve goal is required"),
  number_of_employees: Yup.number()
    .positive("Number must be positive")
    .required("Number of employees is required"),
  supporting_charities: Yup.string().required(
    "Charities you currently support are required",
  ),
  cause: Yup.string().required("Cause is required"),
  phone: Yup.string()
    .matches(/^\d+$/, "Phone number can only contain numbers")
    .min(4, "Minimum 4 digits required")
    .max(15, "Maximum 15 digits allowed")
    .required("Phone number is required"),
  email: Yup.string()
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/,
      "Invalid email address",
    )
    .min(4, "Email must be at least 4 characters")
    .max(50, "Email cannot exceed 50 characters")
    .required(" Email address is required"),
  website: Yup.string()
     .required("Website is required"),
});

export const getValidationSchemaCorporate = (currentStep: number) => {
  switch (currentStep) {
    case 1:
      return StepOneValidationSchemaCorporate;
    case 2:
      return StepTwoValidationSchemaCorporate;
    case 3:
      return StepThreeValidationSchemaCorporate;
    default:
      return StepOneValidationSchemaCorporate;
  }
};
