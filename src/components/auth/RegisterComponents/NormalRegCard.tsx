"use client";
import CustomInputFieldFormik from "@/components/common/customFormComponents/CustomTextFieldFormik";
import { Field, Form, Formik } from "formik";
import React, { useState } from "react";

const NormalRegCard = () => {
  return (
    <Formik
      initialValues={{
        first_name: "",
        last_name: "",
        email: "",
        postal_code: "",
        password: "",
        confirm_password: "",
        termsAgreed: false,
      }}
      onSubmit={(values) => { }}
    >
      {({ setFieldValue, values }) => (
        <Form>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:gap-6">
            <Field
              component={CustomInputFieldFormik}
              name="first_name"
              placeholder="First Name"
              type="text"
              required
            />
            <Field
              component={CustomInputFieldFormik}
              name="last_name"
              placeholder="Last Name"
              type="text"
              required
            />
            <Field
              component={CustomInputFieldFormik}
              name="email"
              placeholder="Email"
              type="text"
              required
            />
            <Field
              component={CustomInputFieldFormik}
              name="postal_code"
              placeholder="Postal Code"
              type="text"
              required
            />
            <Field
              component={CustomInputFieldFormik}
              name="password"
              placeholder="Password"
              type="password"
              required
            />
            <Field
              component={CustomInputFieldFormik}
              name="confirm_password"
              placeholder="Confirm Password"
              type="text"
              required
            />
          </div>
          <div className="mt-5 flex items-center gap-2 text-gray-600 cursor-pointer">
            <input
              type="checkbox"
              onChange={() => setFieldValue("termsAgreed", !values.termsAgreed)}
              className="h-[20px] w-[20px]"
            />
            <span>
              I accept the&nbsp;
              <a href="google.com" className="text-blue-400 underline">
                Terms and Conditions
              </a>
              &nbsp;and acknowledge that I have read and understood the&nbsp;
              <a href="google.com" className="text-blue-400 underline">
                Privacy Policy
              </a>
              &nbsp;.
            </span>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default NormalRegCard;
