"use client";
import { updatePassword } from "@/api/common/updatePassword";
import ButtonPrimary from "@/components/common/ButtonPrimary";
import Help from "@/components/common/Help";
import CustomInputFieldFormik from "@/components/common/customFormComponents/CustomTextFieldFormik";
import { validationSchemaForPassword } from "@/components/merchant/MyAccount/validationSchemaMerchant";
import { Field, Form, Formik } from "formik";
import { logout } from "@/lib/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";

const ManageCorporatePassword = () => {
  const initialState = {
    current_password: "",
    password: "",
    password_confirmation: "",
  };

  const router = useRouter();

  // const handleSaveChanges = async () => {
  //   const response = await updatePassword(password);
  //   if (response.error) {
  //     if (typeof response.data.message === "object") {
  //       const errorMessage = Object.values<string[0]>(response.data.message);
  //       toast.error(errorMessage[0][0]);
  //     } else {
  //       toast.error(response.data.message);
  //     }
  //   } else {
  //     toast.success(response.data.message);
  //   }
  // };

  return (
    <div>
      <Formik
        initialValues={initialState}
        validationSchema={validationSchemaForPassword}
        onSubmit={async (values, { resetForm }) => {
          try {
            const response = await updatePassword(values);
            if (response.error) {
              if (typeof response.data.message === "object") {
                const errorMessage = Object.values<string[0]>(
                  response.data.message,
                );
                toast.error(errorMessage[0][0]);
              } else {
                toast.error(response.data.message);
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
                    value={values.current_password}
                    classNameContainer="max-w-[360px] rounded-sm border-merchant_border"
                    styleInput={{ resize: "none" }}
                    classNameWrapper="pt-[5px] flex-grow"
                    className="!py-2 text-[13px]"
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
                    value={values.password}
                    classNameContainer="max-w-[360px] rounded-sm border-merchant_border"
                    styleInput={{ resize: "none" }}
                    classNameWrapper="pt-[5px] flex-grow"
                    className="!py-2 text-[13px]"
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
                      value={values.password_confirmation}
                      classNameContainer="max-w-[360px] rounded-sm border-merchant_border"
                      styleInput={{ resize: "none" }}
                      classNameWrapper="pt-[5px] flex-grow"
                      className="!py-2 text-[13px]"
                    />
                  </div>
                </div>
                <div />
                <div className="flex items-center gap-[10px] pl-6 pt-[30px]">
                  <ButtonPrimary
                    label="Save Changes"
                    className="rounded-sm px-[10px] py-2 !shadow-none"
                    classNameLabel="text-[13px] font-normal"
                    type="submit"
                    disabled={isSubmitting}
                  />
                  <button
                    onClick={() => {
                      router.push("/corporation/dashboard");
                    }}
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

export default ManageCorporatePassword;
