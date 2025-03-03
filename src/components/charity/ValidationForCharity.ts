import * as Yup from "yup";

export const validationSchemaForMember = Yup.object().shape({
  first_name: Yup.string().required("First Name is required"),
  last_name: Yup.string().required("Last Name is required"),
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
  role_id: Yup.number().required("Role is required"),
  password: Yup.string().required("Password is required"),
});

export const validationSchemaForRole = Yup.object({
  name: Yup.string().required("Role is required"),
});


export const validationSchemaForCharityCampaign = Yup.object({
  title: Yup.string().required("Title is required"),
  short_description: Yup.string().required("Short Description is required"),
  description: Yup.string().required("Description is required"),
  feature_image: Yup.mixed().required("Campaign image is required"),
  gallery: Yup.array()
    .min(1, "At least 1 image is required")
    .required("At least 1 image is required"),
  total_fund_target: Yup.string()
    .matches(/^\d+$/, "Total fund must be a number")
    .required("Total fund Target is required"),
  start_date: Yup.date().required("Start Date is required"),
  end_date: Yup.date().required("End Date is required"),
});


