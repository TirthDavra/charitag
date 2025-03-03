"use client";
import { parseMsg } from "@/utils/basicfunctions";
import { Field, Form, Formik } from "formik";
import React, { useEffect } from "react";
import { toast } from "react-toastify";
import CustomInputFieldFormik from "../../common/customFormComponents/CustomTextFieldFormik";
import { IStripeDetails } from "./types";
import * as Yup from "yup";
import { updateStripeDetailsMerchant } from "@/api/merchant/merchantAccount";
import { updateStripeDetailsCharity } from "@/api/charity/charityProfile";
import ButtonPrimary from "../../common/ButtonPrimary";

import {
  setMerchantStripeInfo,
  updateMerchantStripeInfo,
} from "@/lib/Store/slices/merchantFeatures/merchantProfile/merchantInfoSlice";
import { useAppDispatch, useAppSelectorMerchant } from "@/lib/Store/hooks";

const StripeConnectMerchant = ({
  initialState,
}: {
  initialState: IStripeDetails;
}) => {
  const validationSchemaForBankInfo = Yup.object().shape({
    account_name: Yup.string().required("Account name is required"),
    account_id: Yup.string().required("Account id is required"),
  });

  const dispatch = useAppDispatch();

  const allStripeInfo = useAppSelectorMerchant((state) => state.merchantInfo);
  const stripeInfo = allStripeInfo.stripe.stripeDetails;

  useEffect(() => {
    if (!allStripeInfo.stripe.init) {
      dispatch(
        setMerchantStripeInfo({ stripeDetails: initialState, init: true }),
      );
    }
  }, [dispatch]);

  return (
    <Formik
      validationSchema={validationSchemaForBankInfo}
      initialValues={stripeInfo}
      enableReinitialize={true}
      onSubmit={async (values) => {
        let response = {
          error: true,
          data: { message: "Failed to update stripe details" },
        };

        response = await updateStripeDetailsMerchant(values);
        if (response.error) {
          const errorMessage = parseMsg(response.data.message);
          if (errorMessage) {
            toast.error(errorMessage);
          } else {
            toast.error("Failed to update stripe details");
          }
        } else {
          toast.success(parseMsg(response.data.message));
          dispatch(updateMerchantStripeInfo(values));
        }
      }}
    >
      {({ values }) => {
        return (
          <Form>
            <div className="mt-10 flex max-w-[520px] flex-col text-sm leading-5 text-zinc-800 xl:mt-0">
              <div className="w-full text-lg font-medium max-md:max-w-full">
                Stripe
              </div>
              <div className="mt-8 w-full leading-5 max-md:max-w-full">
                Accept card payment on your Thinkific site with funds going
                directly into your linked bank account.
              </div>
              <div className="mt-6 w-full text-blue-600 underline max-md:max-w-full">
                Note: If Stripe isn’t supported{" "}
                <span className="text-blue-600 underline">in your country</span>
                , learn about{" "}
                <span className="text-blue-600 underline">
                  payment alternatives
                </span>
              </div>
              <div className="mt-6 space-y-3">
                <div className="">
                  <span className="text-[15px] font-normal text-merchant_sidebar_text">
                    Account Name:
                  </span>
                  <Field
                    component={CustomInputFieldFormik}
                    type="text"
                    name="account_name"
                    inputPlaceholder="Account Name"
                    classNameContainer="max-w-[360px] rounded-sm border-merchant_border"
                    styleInput={{ resize: "none" }}
                    classNameWrapper="pt-[5px] md:pt-0"
                    className="!py-2"
                    textPlaceholder="!text-[13px]"
                  />
                </div>
                <div>
                  <span className="text-[15px] font-normal text-merchant_sidebar_text">
                    Account Id:
                  </span>
                  <Field
                    component={CustomInputFieldFormik}
                    type="text"
                    name="account_id"
                    inputPlaceholder="Account Id"
                    classNameContainer="max-w-[360px] rounded-sm border-merchant_border"
                    styleInput={{ resize: "none" }}
                    classNameWrapper="pt-[5px] md:pt-0"
                    className="!py-2"
                    textPlaceholder="!text-[13px]"
                  />
                </div>
              </div>

              <ButtonPrimary
                label="Connect Account"
                className="mt-8 !h-[34px]  rounded-sm px-[10px] py-2 !shadow-none"
                classNameLabel="text-xs font-normal"
                type="submit"
              />
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default StripeConnectMerchant;
