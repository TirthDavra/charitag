import * as Yup from "yup";

const MIN_AGE = 18;

const today = new Date();

const eighteenYearsAgo = new Date();
eighteenYearsAgo.setFullYear(today.getFullYear() - MIN_AGE);

export const profileValidationSchema = Yup.object().shape({
  first_name: Yup.string()
    .matches(/^[A-Za-z]+$/, "First name can only contain alphabetic characters")
    .required("First name is required"),
  last_name: Yup.string()
    .matches(/^[A-Za-z]+$/, "Last name can only contain alphabetic characters")
    .required("Last name is required"),
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
  dob: Yup.date()
    .max(today, "Date of birth cannot be a future date")
    .test(
      "age",
      "You must be at least 18 years old to create an account",
      function (birthdate) {
        if (!birthdate) return true; // Let required() handle empty fields

        const today = new Date();
        const birthdateDate = new Date(birthdate);

        let age = today.getFullYear() - birthdateDate.getFullYear();
        const monthDifference = today.getMonth() - birthdateDate.getMonth();

        if (
          monthDifference < 0 ||
          (monthDifference === 0 && today.getDate() < birthdateDate.getDate())
        ) {
          age--;
        }

        return age >= 18;
      },
    )
    .required("Date of birth is required"),
  current_password: Yup.string(),
  password: Yup.string().when("current_password", {
    is: (value: string) => !!value, // when current_password has a value
    then: (schema) =>
      schema
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
    otherwise: (schema) => schema.notRequired(),
  }),
  password_confirmation: Yup.string().when("current_password", {
    is: (value: string) => !!value, // when current_password has a value
    then: (schema) =>
      schema
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Confirm password is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
});
