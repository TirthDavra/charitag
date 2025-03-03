"use client";
import { updateBankDetails } from "@/api/merchant/merchantAccount";
import ButtonPrimary from "@/components/common/ButtonPrimary";
import CustomInputField from "@/components/common/customFormComponents/CustomInputField";
import CustomInputFieldFormik from "@/components/common/customFormComponents/CustomTextFieldFormik";
import { IBankDetails } from "@/components/merchant/MyAccount/types";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { validationForCharity } from "./ValidationSchemaForCharity";
import { updateCharityBankDetails } from "@/api/charity/charityProfile";
import { parseMsg } from "@/utils/basicfunctions";

import {
  setCharitytBankInfo,
  updateCharityBankInfo,
} from "@/lib/Store/slices/charityFeatures/charityProfile/charityInfoSlice";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelectorCharity } from "@/lib/Store/hooks";

const ManageCharityBankInfo = ({
  initialState,
}: {
  initialState: IBankDetails;
}) => {
  const dispatch = useAppDispatch();

  const allBankInfo = useAppSelectorCharity((state) => state.charityInfo);
  const bankInfo = allBankInfo.bank.bankDetails;

  useEffect(() => {
    if (!allBankInfo.bank.init) {
      dispatch(setCharitytBankInfo({ bankDetails: initialState, init: true }));
    }
  }, [dispatch]);

  const router = useRouter();

  return (
    <div>
      <Formik
        initialValues={bankInfo}
        validationSchema={validationForCharity}
        enableReinitialize
        onSubmit={async (values) => {
          try {
            const response = await updateCharityBankDetails(values);
            if (response.error) {
              const errorMessage = parseMsg(response.data.message);
              toast.error(errorMessage);
            } else {
              toast.success(parseMsg(response.data.message));
              dispatch(updateCharityBankInfo(values));
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
                Manage Bank Information
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
                    classNameWrapper="md:pt-[5px]"
                    className="!py-2 !text-[13px]"
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
                    type="text"
                    value={values.ifsc_code ?? ""}
                    classNameContainer="max-w-[360px] rounded-sm border-merchant_border"
                    styleInput={{ resize: "none" }}
                    classNameWrapper="md:pt-[5px]"
                    className="!py-2 !text-[13px]"
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
                    classNameWrapper="md:pt-[5px]"
                    className="!py-2 !text-[13px]"
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
                    type="password"
                    name="confirm_account_number"
                    inputPlaceholder="Confirm Account Number"
                    value={values?.confirm_account_number ?? ""}
                    classNameContainer="max-w-[360px] rounded-sm border-merchant_border"
                    styleInput={{ resize: "none" }}
                    classNameWrapper="md:pt-[5px]"
                    className="!py-2 !text-[13px]"
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
                    name="account_name"
                    inputPlaceholder="Account Name"
                    value={values.account_name ?? ""}
                    classNameContainer="max-w-[360px] rounded-sm border-merchant_border"
                    styleInput={{ resize: "none" }}
                    classNameWrapper="md:pt-[5px]"
                    className="!py-2 !text-[13px]"
                  />
                </div>
                <div className="flex lg:mt-[10px]">
                  <span className="text-[15px] font-normal text-merchant_sidebar_text">
                    Branch Address:
                  </span>
                </div>
                <div>
                  <Field
                    component={CustomInputField}
                    type="textArea"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setFieldValue("branch_address", e.target.value);
                    }}
                    name="branch_address"
                    inputPlaceholder="Branch Address"
                    value={values.branch_address ?? ""}
                    classNameContainer="h-[166px] max-w-[360px] !items-start rounded-sm border-merchant_border"
                    styleInput={{ resize: "none" }}
                    classNameWrapper="md:pt-[5px]"
                    className="!py-2 !text-[13px]"
                    textArea={true}
                    textAreaRows={7}
                  />
                  <div className="text-sm text-red-600">
                    <ErrorMessage name="branch_address" />
                  </div>
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
                    onClick={() => router.push("/charity/dashboard")}
                    className="!h-[34px] rounded border border-solid border-merchant_border bg-buttonGradient px-[13px] py-2 text-xs font-medium text-merchant_text_color_blue"
                    type="reset"
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

export default ManageCharityBankInfo;
