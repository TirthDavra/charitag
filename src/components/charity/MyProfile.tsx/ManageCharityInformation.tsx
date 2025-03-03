"use client";
import React, { useEffect, useState } from "react";
import { ErrorMessage, Field, Form, Formik, useFormik } from "formik";
import * as Yup from "yup";
import ButtonPrimary from "@/components/common/ButtonPrimary";

import AddFeaturedImage from "@/components/common/AddFeaturedImage";
import { toast } from "react-toastify";
import ProofUpload, {
  CustomFile,
} from "@/components/auth/RegisterComponents/ProofUpload";
import CustomInputFieldFormik from "@/components/common/customFormComponents/CustomTextFieldFormik";
import { validationForCharityInfo } from "./ValidationSchemaForCharity";
import { useRouter } from "next/navigation";
import { updateCharityInfo } from "@/api/charity/charityProfile";
import { useAppDispatch, useAppSelectorCharity } from "@/lib/Store/hooks";
import {
  setCharityInfo,
  updateCharityInformation,
} from "@/lib/Store/slices/charityFeatures/charityProfile/charityInfoSlice";

export interface ICharityInformationInitialState {
  registration_number: string;
  files: CustomFile[];
  number_of_employees: number;
  total_donor_base: number;
  company_support: string;
  contact_phone: string;
  email: string;
  website: string;
  initialFiles: CustomFile[];
  remove_doc: number[];
}

const ManageCharityInformation = ({
  initialState,
}: {
  initialState: ICharityInformationInitialState;
}) => {
  const dispatch = useAppDispatch();

  const allCharityInfo = useAppSelectorCharity((state) => state.charityInfo);
  const charityInfo = allCharityInfo.charityInfo.charityInfoDetails;

  useEffect(() => {
    if (!allCharityInfo.charityInfo.init) {
      dispatch(
        setCharityInfo({
          charityInfoDetails: initialState,
          init: true,
        }),
      );
    }
  }, [dispatch]);

  const router = useRouter();

  return (
    <div>
      <Formik
        initialValues={charityInfo}
        validationSchema={validationForCharityInfo}
        enableReinitialize
        onSubmit={async (values) => {
          const response = await updateCharityInfo(values);
          if (!response.error) {
            toast.success(response.data.message);
            dispatch(updateCharityInformation(values));
          } else {
            const message = response?.data?.message;
            if (typeof message === "object" && message !== null) {
              const errorMessage = Object.values<string>(message);
              toast.error(errorMessage[0].toString());
            } else {
              toast.error(message);
            }
          }
        }}
      >
        {({ setFieldValue, values, isSubmitting }) => (
          <Form>
            <span className="text-lg font-medium text-merchant_sidebar_text">
              Manage Charity Information
            </span>
            <div className="grid grid-cols-1  gap-y-3 pt-[22px] md:grid-cols-[276px,1fr] md:gap-y-[45px] ">
              {/* Charity Registration Number */}
              <div className="flex items-center">
                <span className="text-[15px] font-normal text-merchant_sidebar_text">
                  Charity Registration Number:
                </span>
              </div>
              <div>
                <Field
                  component={CustomInputFieldFormik}
                  name="registration_number"
                  inputPlaceholder="Registration Number"
                  value={values.registration_number ?? ""}
                  classNameContainer="xl:max-w-[360px] rounded-sm border-merchant_border"
                  styleInput={{ resize: "none" }}
                  classNameWrapper="md:pt-[5px] flex-grow"
                  className="!py-2 !text-[13px]"
                />
              </div>

              {/* Proof of Registration */}
              <div className="flex items-center">
                <span className="text-[15px] font-normal text-merchant_sidebar_text">
                  Proof of Registration:
                </span>
              </div>
              <div className="max-w-[360px]">
                <ProofUpload
                  name="files"
                  maxSize={10485760}
                  setFieldValue={setFieldValue}
                  initialFiles={values.initialFiles}
                  removedFiles={values.remove_doc}
                />
                <div className="text-sm text-red-600">
                  <ErrorMessage name="files" />
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
                  name="number_of_employees"
                  inputPlaceholder="Number of Employees"
                  value={values.number_of_employees ?? ""}
                  classNameContainer="xl:max-w-[360px] rounded-sm border-merchant_border"
                  styleInput={{ resize: "none" }}
                  classNameWrapper="md:pt-[5px] flex-grow"
                  className="!py-2 !text-[13px]"
                />
              </div>

              {/* Total Donor Base */}
              <div className="flex items-center">
                <span className="text-[15px] font-normal text-merchant_sidebar_text">
                  Total Donor Base:
                </span>
              </div>
              <div>
                <Field
                  component={CustomInputFieldFormik}
                  name="total_donor_base"
                  inputPlaceholder="Total Donor Base"
                  value={values.total_donor_base ?? ""}
                  classNameContainer="xl:max-w-[360px] rounded-sm border-merchant_border"
                  styleInput={{ resize: "none" }}
                  classNameWrapper="md:pt-[5px] flex-grow"
                  className="!py-2 !text-[13px]"
                />
              </div>

              {/* Companies Supporting You */}
              <div className="flex items-center">
                <span className="text-[15px] font-normal text-merchant_sidebar_text">
                  Companies Supporting You:
                </span>
              </div>
              <div>
                <Field
                  component={CustomInputFieldFormik}
                  type="text"
                  name="company_support"
                  inputPlaceholder="Companies Supporting You"
                  value={values.company_support ?? ""}
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
                  name="contact_phone"
                  inputPlaceholder="9865231045"
                  value={values.contact_phone ?? ""}
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
                  inputPlaceholder="Wade@gmail.com"
                  value={values.email ?? ""}
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
                  inputPlaceholder="warren.com"
                  value={values.website ?? ""}
                  classNameContainer="xl:max-w-[360px] rounded-sm border-merchant_border"
                  styleInput={{ resize: "none" }}
                  classNameWrapper="md:pt-[5px] flex-grow"
                  className="!py-2 !text-[13px]"
                />
              </div>

              {/* Save and Cancel Buttons */}
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
                  onClick={() => {
                    router.push("/charity/dashboard");
                  }}
                  type="reset"
                  className="!h-[34px] rounded border border-solid border-merchant_border bg-buttonGradient px-[13px] py-2 text-xs font-medium text-merchant_text_color_blue"
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

export default ManageCharityInformation;
