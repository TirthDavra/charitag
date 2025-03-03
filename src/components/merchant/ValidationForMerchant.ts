import * as Yup from "yup";

export const validationSchemaForRole = Yup.object({
  name: Yup.string().required("Role is required"),
});

export const validationSchemaForMember = Yup.object({
  first_name: Yup.string().required("First name is required"),
  last_name: Yup.string().required("Last name is required"),
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

export const validationSchemaForShiping = Yup.object({
  name: Yup.string().required("Zone Name is required"),
  regions: Yup.string().required("Zone Region is required"),
});

export const validationSchemaForCampaign = Yup.object({
  title: Yup.string().required("Title is required"),
  short_description: Yup.string().required("Short Description is required"),
  description: Yup.string().required("Description is required"),
  charity_id: Yup.string().required("Charity is required"),
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

export const validationSchemaForDeals = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    short_description: Yup.string().required("Short Description is required"),
    long_description: Yup.string().required("Long Description is required"),
    discount: Yup.number()
      .required("Discount is required")
      .typeError("Discount must be a number"),
    deals_expiry_on: Yup.number().required("Deals Expiry is required"),
    // qty: Yup.number().when("deals_expiry_on", {
    //   is: 1,
    //   then: Yup.number().required("Quantity is required"),
    // }),
    // start_date: Yup.date().when("deals_expiry_on", {
    //   is: 2,
    //   then: Yup.date().required("Start Date is required"),
    // }),
    // end_date: Yup.date().when("deals_expiry_on", {
    //   is: 2,
    //   then: Yup.date()
    //     .min(Yup.ref("start_date"), "End Date must be after Start Date")
    //     .required("End Date is required"),
    // }),
    product_id: Yup.string().required("Product is required"),
    product_variation_id: Yup.string(),
    deal_category_ids: Yup.array().of(Yup.string()).min(1, "Deal Category is required"),
    deal_sub_category_ids: Yup.array().of(Yup.string()).min(1, "Deal Sub-Category is required"),
    price: Yup.string(),
  });