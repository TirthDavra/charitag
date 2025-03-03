import * as Yup from "yup";

export const validationSchemaForpolicy = Yup.object().shape({
  name: Yup.string().required("Label is required"),
  description: Yup.string()
    .required("Description is required")
    .test("empty-html", "Description cannot be empty", (value) => {
      return value !== "<p></p>";
    }),
  policies_type: Yup.string().required("Policy Type is required"),
});
