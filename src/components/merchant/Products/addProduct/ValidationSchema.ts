import * as Yup from "yup";

export const generalSchema = Yup.object().shape({
  regularPrice: Yup.number()
    .min(0, "Price must be greater than 0")
    .required("Regular price is required"),
  salePrice: Yup.number()
    .min(0, "Price must be greater than 0")
    .required("Sale price is required"),
});

export const inventorySchema = Yup.object().shape({
  sku: Yup.string().required("SKU is required"),
  quantaity: Yup.number()
    .required("quantaity is required")
    .positive("quantaity must be greater than 0"),
  lowStockThreshold: Yup.number()
    .required("lowStockThreshold is required")
    .positive("lowStockThreshold must be greater than 0"),
});

export const linkedProductSchema = Yup.object().shape({
  upSells: Yup.array().min(1, "Please select at least one UpSell product"),
  crossSells: Yup.array().min(
    1,
    "Please select at least one Cross-Sell product",
  ),
});
Yup.object().shape({
  upSells: Yup.array().min(1, "Please select at least one UpSell product"),
  crossSells: Yup.array().min(
    1,
    "Please select at least one Cross-Sell product",
  ),
});

export const variationSchema = Yup.object().shape({
  sku: Yup.string().required("SKU is required"),
  regularPrice: Yup.string().required("Regular price is required"),
  salPrice: Yup.string().required("Sale price is required"),
  stockStatus: Yup.string().required("Stock status is required"),
  backorders: Yup.string().required("Backorders status is required"),
  threshold: Yup.string().required("Threshold is required"),
  weight: Yup.number()
    .required("Weight is required")
    .positive("weight must be greater than 0"),
  length: Yup.number()
    .required("Length is required")
    .positive("length must be greater than 0"),
  width: Yup.number()
    .required("Width is required")
    .positive("width must be greater than 0"),
  height: Yup.number()
    .required("Height is required")
    .positive("Height must be greater than 0"),
  shippingClass: Yup.string().required("Shipping class is required"),
  description: Yup.string().required("Description is required"),
  stock: Yup.string().required("Stock status is required"),
});

const colorAttributeValuesSchema = Yup.array().of(
  Yup.object().shape({
    name: Yup.string().required("Color name is required"),
    value: Yup.string().required("Color value is required"),
  }),
);

const generalAttributeValuesSchema = Yup.array().of(
  Yup.object().shape({
    name: Yup.string().required("Value name is required"),
    value: Yup.string().required("Value is required"),
  }),
);

const attributesSchema = Yup.array().of(
  Yup.object().shape({
    name: Yup.string().required("Attribute name is required"),
    values: Yup.mixed().when("name", {
      is: "Color",
      then: () => colorAttributeValuesSchema,
      otherwise: () => generalAttributeValuesSchema,
    }),
  }),
);

export const productValidationSchema = Yup.object().shape({
  product_name: Yup.string().required("Product name is required"),
  long_description: Yup.string().required("Long description is required"),
  product_category_ids: Yup.array()
    .of(
      Yup.object().shape({
        label: Yup.string(),
        value: Yup.string().required("Category ID value is required"),
      }),
    )
    .min(1, "At least one category is required"),
  price: Yup.object().shape({
    regular_price: Yup.string().required("Regular price is required"),
    sale_price: Yup.string()
      .max(
        Yup.ref("regular_price"),
        "Sale price cannot be higher than regular price",
      )
      .required("Sale price is required"), // Optional if sale price can be null
  }),
  inventory: Yup.object()
    .shape({
      sku: Yup.string()
        .required("SKU is required")
        .matches(
          /^[a-zA-Z0-9-]*$/,
          "SKU can only contain letters, numbers, and hyphens",
        ),

      is_stock_management: Yup.number()
        .oneOf([0, 1], "Stock management status is required")
        .required("Stock management status is required"),

      stock_quantity: Yup.string()
        .nullable()
        .when("is_stock_management", {
          is: 1,
          then: (schema) =>
            schema
              .matches(/^[0-9]*$/, "Stock quantity must be a valid number")
              .min(1, "Stock quantity must be at least 1")
              .required("Stock quantity is required"),
          otherwise: (schema) => schema.notRequired(),
        }),

      low_stock_threshold: Yup.string()
        .nullable()
        .when("is_stock_management", {
          is: 1,
          then: (schema) =>
            schema
              .matches(
                /^(?:\d+(\.\d{2})?|\d{1,3}(?:,\d{3})*(\.\d{2})?)$/,
                "Low stock threshold must be a valid number",
              )
              .min(1, "Low stock threshold must be at least 1"),
          otherwise: (schema) => schema.notRequired(),
        }),

        stock_status: Yup.number()
        .when("is_stock_management", {
          is: 0,
          then: (schema) =>
            schema.required(
              "Stock status is required when stock management is disabled",
            ),
          otherwise: (schema) => schema.notRequired(),
        }),
        
    })
    .test(
      "stock-management-or-status",
      "Either Stock Management must be enabled or Stock Status must be selected",
      function (value) {
        const { is_stock_management, stock_status } = value;
        
        // If stock status is selected (not null or undefined), skip this validation
        if (stock_status) {
          return true; // Validation passes
        }
  
        // If stock management is enabled, validation passes
        if (is_stock_management === 1) {
          return true; // Validation passes
        }
  
        // If stock management is disabled and stock status is not selected, validation fails
        if (is_stock_management === 0  && !stock_status) {
          return this.createError({
            message: "Either Stock Management must be enabled or Stock Status must be selected",
          });
        }
  
        // Default case, should not reach here
        return true; // Validation passes
      }
    ),

  shipping: Yup.object().shape({
    weight: Yup.string().required("Weight is required"),
    length: Yup.string().required("Length is required"),
    width: Yup.string().required("Width is required"),
    height: Yup.string().required("Height is required"),
    shipping_class: Yup.string().required("Shipping class is required"),
  }),
  
   short_description: Yup.string().required("Short description is required"),

  feature_image: Yup.number().nullable().required("Feature image is required"),

  product_type: Yup.number().required("Product type is required"),
});
