"use client";
import { updateBankDetails } from "@/api/merchant/merchantAccount";
import ButtonPrimary from "@/components/common/ButtonPrimary";
import CustomInputField from "@/components/common/customFormComponents/CustomInputField";
import React, { useEffect, useState } from "react";
import { IBankDetails, IStripeDetails } from "./types";
import { toast } from "react-toastify";
import { ErrorMessage, Field, Form, Formik } from "formik";
import CustomInputFieldFormik from "@/components/common/customFormComponents/CustomTextFieldFormik";
import { validationSchemaForBankInfo } from "./validationSchemaMerchant";
import Link from "next/link";
import { parseMsg } from "@/utils/basicfunctions";
import { useDispatch, useSelector } from "react-redux";
import {
  setMerchantBankInfo,
  updateMerchantBankInfo,
} from "@/lib/Store/slices/merchantFeatures/merchantProfile/merchantInfoSlice";
import { useAppDispatch, useAppSelectorMerchant } from "@/lib/Store/hooks";
import { useRouter } from "next/navigation";

const ManageBankInfo = ({
  initialState,
  initialStateStripe,
}: {
  initialState: IBankDetails;
  initialStateStripe: IStripeDetails;
}) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const allBankInfo = useAppSelectorMerchant((state) => state.merchantInfo);
  const bankInfo = allBankInfo.bank.bankDetails;

  useEffect(() => {
    if (!allBankInfo.bank.init) {
      dispatch(setMerchantBankInfo({ bankDetails: initialState, init: true }));
    }
  }, [dispatch]);

  // const handleAcChange = (e: { target: { name: string; value: string } }) => {
  //   const { name, value } = e.target;
  //   let numericValue = value.replace(/\D/g, "");
  //   setBankInfo((prev) => ({
  //     ...prev,
  //     [name]: numericValue,
  //   }));
  // };

  // const handleSaveChanges = async () => {
  //   if (bankInfo.account_number !== bankInfo.confirm_account_number) {
  //     setErrorMessage("Account number and confirm account number do not match");
  //     return;
  //   } else {
  //     setErrorMessage("");
  //   }
  //   const response = await updateBankDetails(bankInfo);
  //   if (response.error) {
  //     const errorMessage = Object.values<string>(response.data.message);
  //     toast.error(errorMessage[0].toString());
  //   } else {
  //     toast.success(response.data.message);
  //   }
  // };

  return (
    <div className=" ">
      <Formik
        validationSchema={validationSchemaForBankInfo}
        initialValues={bankInfo}
        enableReinitialize={true}
        onSubmit={async (values) => {
          const response = await updateBankDetails(values);
          if (response.error) {
            const errorMessage = parseMsg(response.data.message);
            if (errorMessage) {
              toast.error(errorMessage);
            } else {
              toast.error("Failed to update bank details");
            }
          } else {
            toast.success(parseMsg(response.data.message));
            dispatch(
              updateMerchantBankInfo({
                ...response.data.data,
                confirm_account_number:
                  response.data.data?.account_number || "",
              }),
            );
          }
        }}
      >
        {({ values, setFieldValue, isSubmitting }) => {
          return (
            <Form>
              <div>
                <span className="text-lg font-medium text-merchant_sidebar_text">
                  Bank Account Information
                </span>
                <div className="grid grid-cols-1 gap-y-3 pt-[22px] md:grid-cols-[217px,1fr] md:gap-y-[45px]">
                  <div className="flex items-center">
                    <span className="text-[15px] font-normal text-merchant_sidebar_text">
                      Bank Name:
                    </span>
                  </div>
                  <div>
                    <Field
                      component={CustomInputFieldFormik}
                      type="text"
                      name="bank_name"
                      inputPlaceholder="Bank Name"
                      value={values.bank_name ?? ""}
                      classNameContainer="max-w-[360px] rounded-sm border-merchant_border"
                      styleInput={{ resize: "none" }}
                      classNameWrapper="pt-[5px] md:pt-0"
                      className="!py-2"
                      textPlaceholder="!text-[13px]"
                    />
                  </div>

                  <div className="flex items-center">
                    <span className="text-[15px] font-normal text-merchant_sidebar_text">
                      IFSC Code:
                    </span>
                  </div>
                  <div>
                    <Field
                      component={CustomInputFieldFormik}
                      inputPlaceholder="IFSC Code"
                      name="ifsc_code"
                      type="password"
                      value={values.ifsc_code ?? ""}
                      classNameContainer="max-w-[360px] rounded-sm border-merchant_border"
                      styleInput={{ resize: "none" }}
                      classNameWrapper="pt-[5px] md:pt-0"
                      className="!py-2"
                      textPlaceholder="!text-[13px]"
                    />
                  </div>
                  <div className="flex items-center">
                    <span className="text-[15px] font-normal text-merchant_sidebar_text">
                      Account Number:
                    </span>
                  </div>
                  <div>
                    <Field
                      component={CustomInputFieldFormik}
                      type="password"
                      name="account_number"
                      inputPlaceholder="Account Number"
                      value={values.account_number ?? ""}
                      classNameContainer="max-w-[360px] rounded-sm border-merchant_border"
                      styleInput={{ resize: "none" }}
                      classNameWrapper="pt-[5px] md:pt-0"
                      className="!py-2"
                      textPlaceholder="!text-[13px]"
                    />
                  </div>
                  <div className="flex items-center">
                    <span className="text-[15px] font-normal text-merchant_sidebar_text">
                      Confirm Account Number:
                    </span>
                  </div>
                  <div>
                    <Field
                      component={CustomInputFieldFormik}
                      name="confirm_account_number"
                      inputPlaceholder="Confirm Account Number"
                      values={values.confirm_account_number ?? ""}
                      classNameContainer="max-w-[360px] rounded-sm border-merchant_border"
                      styleInput={{ resize: "none" }}
                      classNameWrapper="pt-[5px] md:pt-0"
                      className="!py-2"
                      textPlaceholder="!text-[13px]"
                      handleChange={(
                        e: React.ChangeEvent<HTMLInputElement>,
                      ) => {
                        if (/^[0-9]*$/.test(e.target.value)) {
                          setFieldValue(
                            "confirm_account_number",
                            e.target.value,
                          );
                        }
                      }}
                    />
                  </div>
                  <div className="flex items-center">
                    <span className="text-[15px] font-normal text-merchant_sidebar_text">
                      Account Name:
                    </span>
                  </div>
                  <div>
                    <Field
                      component={CustomInputFieldFormik}
                      type="text"
                      name="account_name"
                      inputPlaceholder="Account Name"
                      value={values.account_name ?? ""}
                      classNameContainer="max-w-[360px] rounded-sm border-merchant_border"
                      styleInput={{ resize: "none" }}
                      classNameWrapper="pt-[5px] md:pt-0"
                      className="!py-2"
                      textPlaceholder="!text-[13px]"
                    />
                  </div>
                  <div className="flex pt-0 md:pt-[10px]">
                    <span className="text-[15px] font-normal text-merchant_sidebar_text">
                      Branch Address:
                    </span>
                  </div>
                  <div>
                    <Field
                      component={CustomInputField}
                      type="text"
                      name="branch_address"
                      inputPlaceholder="Branch Address"
                      value={values.branch_address ?? ""}
                      classNameContainer="h-[166px] max-w-[360px] rounded-sm border-merchant_border"
                      styleInput={{ resize: "none" }}
                      classNameWrapper="pt-[5px] md:pt-0"
                      className="!py-2"
                      textArea={true}
                      textPlaceholder="!text-[13px]"
                      textAreaRows={7}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setFieldValue("branch_address", e.target.value);
                      }}
                    />
                    <div className="text-sm text-red-600">
                      <ErrorMessage name="branch_address" />
                    </div>
                  </div>
                  <div />
                  <div className="flex items-center gap-[10px]">
                    <ButtonPrimary
                      label="Save Changes"
                      className="rounded-sm px-[10px] py-2 !shadow-none"
                      classNameLabel="text-[13px] font-normal"
                      type="submit"
                      disabled={isSubmitting}
                    />
                    <button
                      type="reset"
                      className="rounded border border-solid border-merchant_border bg-buttonGradient px-[13px] py-2 text-[13px] font-medium text-merchant_text_color_blue"
                      onClick={() => router.push("/merchant/dashboard")}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default ManageBankInfo;
