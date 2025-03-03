"use client";
import { updatePassword } from "@/api/common/updatePassword";
import ButtonPrimary from "@/components/common/ButtonPrimary";
import Help from "@/components/common/Help";
import CustomInputField from "@/components/common/customFormComponents/CustomInputField";
import CustomInputFieldFormik from "@/components/common/customFormComponents/CustomTextFieldFormik";
import { Field, Form, Formik } from "formik";
import { initScriptLoader } from "next/script";
import React, { useState } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { validationForCharityPassword } from "./ValidationSchemaForCharity";
import { useAppDispatch } from "@/lib/Store/hooks";
import { setUserDetails } from "@/lib/Store/slices/commonFeatures/userInfoSlice";
import { logout } from "@/lib/utils";

const ManageCharityPassword = () => {
  const initialValues = {
    current_password: "",
    password: "",
    password_confirmation: "",
  };

  const router = useRouter();
  const dispatch = useAppDispatch();
  // const handleSaveChanges = async () => {
  //   const response = await updatePassword(password);
  //   if (response.error) {
  //     if (typeof response.data.message === "object") {
  //       const errorMessage = Object.values<string>(response.data.message);
  //       toast.error(errorMessage[0].toString());
  //     } else {
  //       toast.error(response.data.message.toString());
  //     }
  //   } else {
  //     toast.success(response.data.message);
  //   }
  // };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationForCharityPassword}
        onSubmit={async (values, { resetForm }) => {
          try {
            const response = await updatePassword(values);
            if (response.error) {
              if (typeof response.data.message === "object") {
                const errorMessage = Object.values<string>(
                  response.data.message,
                );
                toast.error(errorMessage[0].toString());
              } else {
                toast.error(response.data.message.toString());
              }
            } else {
              toast.success(response.data.message);
              logout({ callbackUrl: "/login" });
            }
          } catch (error) {
            toast.error("Something went wrong");
          }
        }}
      >
        {({ setFieldValue, values, isSubmitting }) => (
          <Form>
            <div>
              <span className="text-lg font-medium text-merchant_sidebar_text">
                Change Password
              </span>
              <div className="grid grid-cols-1 gap-x-[30px] gap-y-3 pt-[22px] md:grid-cols-[145px,1fr] md:gap-y-[45px]">
                <div className="flex items-center">
                  <span className="text-[15px] font-normal text-merchant_sidebar_text">
                    Old Password:
                  </span>
                </div>
                <div className="flex items-center gap-[10px]">
                  <Help classNameIcon="w-[13px] h-[13px]" />
                  <Field
                    component={CustomInputFieldFormik}
                    type="password"
                    name="current_password"
                    inputPlaceholder="Old Password"
                    value={values.current_password ?? ""}
                    classNameContainer="max-w-[360px] rounded-sm border-merchant_border"
                    styleInput={{ resize: "none" }}
                    classNameWrapper="md:pt-[5px] flex-grow"
                    className="!py-2 !text-[13px]"
                  />
                </div>
                <div className="flex items-center">
                  <span className="text-[15px] font-normal text-merchant_sidebar_text">
                    New Password:
                  </span>
                </div>
                <div className="flex items-center gap-[10px]">
                  <Help classNameIcon="w-[13px] h-[13px]" />
                  <Field
                    component={CustomInputFieldFormik}
                    type="password"
                    name="password"
                    inputPlaceholder="New Password"
                    value={values.password ?? ""}
                    classNameContainer="max-w-[360px] rounded-sm border-merchant_border"
                    styleInput={{ resize: "none" }}
                    classNameWrapper="md:pt-[5px] flex-grow"
                    className="!py-2 !text-[13px]"
                  />
                </div>
                <div className="flex items-center">
                  <span className="text-[15px] font-normal text-merchant_sidebar_text">
                    Confirm Password:
                  </span>
                </div>
                <div>
                  <div className="flex items-center gap-[10px]">
                    <Help classNameIcon="w-[13px] h-[13px]" />
                    <Field
                      component={CustomInputFieldFormik}
                      type="password"
                      name="password_confirmation"
                      inputPlaceholder="Confirm Password"
                      value={values.password_confirmation ?? ""}
                      classNameContainer="max-w-[360px] rounded-sm border-merchant_border"
                      styleInput={{ resize: "none" }}
                      classNameWrapper="md:pt-[5px] flex-grow"
                      className="!py-2 !text-[13px]"
                    />
                  </div>
                </div>
                <div />
                <div className="flex items-center gap-[10px] pl-6 pt-[30px]">
                  <ButtonPrimary
                    label="Save Changes"
                    className="!h-[34px] rounded-sm px-[10px] py-2 !shadow-none"
                    classNameLabel="text-xs font-normal"
                    type="submit"
                    disabled={isSubmitting}
                  />
                  <button
                    onClick={() => router.push("/charity/dashboard")}
                    type="reset"
                    className="!h-[34px] rounded border border-solid border-merchant_border bg-buttonGradient px-[13px] py-2 text-xs font-medium text-merchant_text_color_blue"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ManageCharityPassword;
