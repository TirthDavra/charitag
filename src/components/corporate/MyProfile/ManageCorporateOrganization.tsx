"use client";
import React, { useEffect, useState } from "react";
import { Field, Formik, ErrorMessage, Form } from "formik";
import * as Yup from "yup";
import ButtonPrimary from "@/components/common/ButtonPrimary";
import { toast } from "react-toastify";
import CustomInputFieldFormik from "@/components/common/customFormComponents/CustomTextFieldFormik";
import { updateCorporateOrganization } from "@/api/corporation/corporateOrganization";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelectorCorporation } from "@/lib/Store/hooks";
import {
  setCorporateOrganisationInfo,
  updateCorporateOrganisationInfo,
} from "@/lib/Store/slices/corporationFeatures/corporateInfoSlice";
import { revaldiateApi } from "@/app/action";

export interface ICorporateOrganization {
  fundraising_goal: string;
  date_to_achieve_goal: Date | string;
  number_of_employees: number;
  supporting_charities: string;
  cause: string;
  phone: string;
  email: string;
  website: string;
}

const validationSchema = Yup.object().shape({
  fundraising_goal: Yup.number()
    .required("Fundraising goal is required")
    .positive("Must be a positive number"),
  date_to_achieve_goal: Yup.date().required("Date to achieve goal is required"),
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
  supporting_charities: Yup.string().required(
    "Charities you currently support are required",
  ),
  cause: Yup.string().required("Causes you would like to support is required"),
  phone: Yup.string()
    .matches(/^\d+$/, "Phone number can only contain numbers")
    .min(7, "Minimum 7 digits required")
    .max(15, "Maximum 15 digits allowed")
    .required("Phone number is required"),
  email: Yup.string()
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/,
      "Invalid email address",
    )
    .required("Invalid email address"),
  website: Yup.string().required("Website is required").url("Invalid URL"),
});

const ManageCorporateOrganization = ({
  initialState,
}: {
  initialState: ICorporateOrganization;
}) => {
  const router = useRouter();

  const dispatch = useAppDispatch();

  const allOrganizationInfo = useAppSelectorCorporation(
    (state) => state.corporateInfo,
  );
  const organizationInfo =
    allOrganizationInfo.organisation.organisationProfileDetails;

  useEffect(() => {
    dispatch(
      setCorporateOrganisationInfo({
        organisationProfileDetails: initialState,
        init: true,
      }),
    );
  }, [dispatch]);
  return (
    <div>
      <Formik
        initialValues={organizationInfo}
        validationSchema={validationSchema}
        enableReinitialize
        onSubmit={async (values) => {
          try {
            const response = await updateCorporateOrganization(values);
            if (response.error) {
              const errorMessage = Object.values<string>(response.data.message);
              toast.error(errorMessage[0].toString());
            } else {
              toast.success(response.data.message);
              dispatch(updateCorporateOrganisationInfo(values));
              revaldiateApi("corporate-organization");
            }
          } catch (error) {
            toast.error("Something went wrong");
          }
        }}
      >
        {({ setFieldValue, values, isSubmitting }) => (
          <Form>
            <span className="text-lg font-medium text-merchant_sidebar_text">
              Manage Organization Form
            </span>
            <div className="grid grid-cols-1 gap-y-3 pt-[22px] md:grid-cols-[276px,1fr] md:gap-y-[45px] ">
              {/* Fundraising Goal */}
              <div className="flex items-center">
                <span className="text-[15px] font-normal text-merchant_sidebar_text">
                  Fundraising Goal:
                </span>
              </div>
              <div>
                <Field
                  component={CustomInputFieldFormik}
                  type="number"
                  name="fundraising_goal"
                  inputPlaceholder="Fundraising Goal"
                  value={values.fundraising_goal}
                  classNameContainer="xl:max-w-[360px] rounded-sm border-merchant_border"
                  styleInput={{ resize: "none" }}
                  classNameWrapper="md:pt-[5px] flex-grow"
                  className="!py-2 !text-[13px]"
                  min={0}
                />
              </div>

              {/* Goal Date */}
              <div className="flex items-center">
                <span className="text-[15px] font-normal text-merchant_sidebar_text">
                  Goal Date:
                </span>
              </div>
              <div
                aria-label="date and time picker"
                aria-labelledby="date and time picker"
                className="max-w-[360px]"
              >
                <div className="!rounded-md !border-[1.2px] !border-[rgba(57,105,224,0.25)]">
                  <DatePicker
                    wrapperClassName="h-[35.5px] !flex items-center"
                    selected={
                      values.date_to_achieve_goal === ""
                        ? null
                        : new Date(values.date_to_achieve_goal)
                    }
                    onChange={(date) => {
                      const newEndDate = date ? date?.toISOString() : "";
                      if (values.date_to_achieve_goal === newEndDate) {
                        return values;
                      }
                      if (date !== null || date !== undefined || date !== "") {
                        setFieldValue(
                          "date_to_achieve_goal",
                          date?.toISOString(),
                        );
                      }
                    }}
                    dateFormat="MM/dd/yyyy"
                    className="w-full cursor-pointer rounded-sm !p-0 !text-[13px]"
                    placeholderText="Date to achieve goal"
                  />
                </div>
                <div className="text-sm text-red-600">
                  <ErrorMessage name="date_to_achieve_goal" />
                </div>
              </div>

              {/* Number of Employees */}
              <div className="flex items-center">
                <span className="text-[15px] font-normal text-merchant_sidebar_text">
                  Number of Employees:
                </span>
              </div>
              <div>
                <Field
                  component={CustomInputFieldFormik}
                  type="text"
                  name="number_of_employees"
                  inputPlaceholder="Number of Employees"
                  value={values.number_of_employees}
                  classNameContainer="xl:max-w-[360px] rounded-sm border-merchant_border"
                  styleInput={{ resize: "none" }}
                  classNameWrapper="md:pt-[5px] flex-grow"
                  className="!py-2 !text-[13px]"
                />
              </div>

              {/* Supported Charities */}
              <div className="flex items-center">
                <span className="text-[15px] font-normal text-merchant_sidebar_text">
                  Charities you currently support:
                </span>
              </div>
              <div>
                <Field
                  component={CustomInputFieldFormik}
                  type="text"
                  name="supporting_charities"
                  inputPlaceholder="Supported Charities"
                  value={values.supporting_charities}
                  classNameContainer="xl:max-w-[360px] rounded-sm border-merchant_border"
                  styleInput={{ resize: "none" }}
                  classNameWrapper="md:pt-[5px] flex-grow"
                  className="!py-2 !text-[13px]"
                />
              </div>

              {/* Desired Causes */}
              <div className="flex items-center">
                <span className="text-[15px] font-normal text-merchant_sidebar_text">
                  Causes you would like to support:
                </span>
              </div>
              <div>
                <Field
                  component={CustomInputFieldFormik}
                  type="text"
                  name="cause"
                  inputPlaceholder="Desired Causes"
                  value={values.cause}
                  classNameContainer="xl:max-w-[360px] rounded-sm border-merchant_border"
                  styleInput={{ resize: "none" }}
                  classNameWrapper="md:pt-[5px] flex-grow"
                  className="!py-2 !text-[13px]"
                />
              </div>

              {/* Phone Number */}
              <div className="flex items-center">
                <span className="text-[15px] font-normal text-merchant_sidebar_text">
                  Phone Number:
                </span>
              </div>
              <div>
                <Field
                  component={CustomInputFieldFormik}
                  type="text"
                  name="phone"
                  inputPlaceholder="Phone Number"
                  value={values.phone}
                  classNameContainer="xl:max-w-[360px] rounded-sm border-merchant_border"
                  styleInput={{ resize: "none" }}
                  classNameWrapper="md:pt-[5px] flex-grow"
                  className="!py-2 !text-[13px]"
                />
              </div>

              {/* Email */}
              <div className="flex items-center">
                <span className="text-[15px] font-normal text-merchant_sidebar_text">
                  Email:
                </span>
              </div>
              <div>
                <Field
                  component={CustomInputFieldFormik}
                  type="email"
                  name="email"
                  inputPlaceholder="Email"
                  value={values.email}
                  classNameContainer="xl:max-w-[360px] rounded-sm border-merchant_border"
                  styleInput={{ resize: "none" }}
                  classNameWrapper="md:pt-[5px] flex-grow"
                  className="!py-2 !text-[13px]"
                />
              </div>

              {/* Website */}
              <div className="flex items-center">
                <span className="text-[15px] font-normal text-merchant_sidebar_text">
                  Website:
                </span>
              </div>
              <div>
                <Field
                  component={CustomInputFieldFormik}
                  type="text"
                  name="website"
                  inputPlaceholder="Website"
                  value={values.website}
                  classNameContainer="xl:max-w-[360px] rounded-sm border-merchant_border"
                  styleInput={{ resize: "none" }}
                  classNameWrapper="md:pt-[5px] flex-grow"
                  className="!py-2 !text-[13px]"
                />
              </div>
              <div />
              <div className="flex items-center gap-[10px]">
                <ButtonPrimary
                  label="Save Changes"
                  className="!h-[34px] rounded-sm px-[10px] py-2 !shadow-none"
                  classNameLabel="text-xs font-normal"
                  type="submit"
                  disabled={isSubmitting}
                />
                <button
                  type="reset"
                  className="!h-[34px] rounded border border-solid border-merchant_border bg-buttonGradient px-[13px] py-2 text-xs font-medium text-merchant_text_color_blue"
                  onClick={() => router.push("/corporation/dashboard")}
                >
                  Cancel
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ManageCorporateOrganization;
