import Animate from "@/components/common/Animate";
import ProofUpload from "@/components/auth/RegisterComponents/ProofUpload";
import { Field, Form, Formik } from "formik";
import CustomInputFieldFormik from "@/components/common/customFormComponents/CustomTextFieldFormik";
import SelectCategories from "@/components/merchant/Custom/SelectCategories";
import {
  getFinalStepInformation,
  merchantCompleteSignUp,
  tokenVerification,
} from "@/api/auth/auth";
import { useSession } from "next-auth/react";
import MerchantForm, { IMerchantFinalStep } from "./MerchantForm";
import { redirect } from "next/navigation";
import { auth } from "auth";
import { getCategories } from "@/api/auth/categories";
import { getCountries } from "@/api/common/charities";
import { IFinalStepInformationDataMerchant } from "@/api/auth/types";
import { ApiResponse } from "@/api/apiConfig";
import { useState } from "react";

/**
 * This page represents the merchant final step page for the application.
 */

const MerchantSignUpForm = async ({
  searchParams,
}: {
  searchParams: { token: string };
}) => {
  // if (!searchParams.token || searchParams.token === "") {
  //   redirect(`/`);
  // }

  const merchantCategories = await getCategories("merchant");
  const allCountries = await getCountries();

  const formattedCategories =
    merchantCategories.data?.map((category) => ({
      label: category.title,
      value: category.id,
    })) || [];

  let initialValues: IMerchantFinalStep = {
    business_number: "",
    files: [],
    selling_duration: "",
    sku_count: "",
    yearly_revenue: "",
    category_ids:
      formattedCategories.length > 0 ? [formattedCategories[0]] : [],
    country_id: "",
    type: 1,
    state_id: "",
    phone: "",
    email: "",
    website: "",
    charity_support: "",
    address_line_1: "",
    address_line_2: "",
    postal_code: "",
    city: "",
    send_review: false,
    initialFiles: [],
    remove_doc: [],
  };
  // const response = await tokenVerification(searchParams.token);

  const response = await getFinalStepInformation();
  if (!response.error) {
    if (response.data.data.role === 2) {
      const info: IFinalStepInformationDataMerchant = response.data.data;
      if (info?.merchant && info.merchant !== null) {
        initialValues = {
          address_line_1: info.merchant.address_line_1,
          address_line_2: info.merchant.address_line_2,
          business_number: info.merchant.business_number,
          category_ids: info.category.map((item) => ({
            label: item.name,
            value: item.id,
          })),
          charity_support: info.merchant.charity_support,
          city: info.merchant.city,
          country_id: info.merchant.country_id?.toString() || "",
          email: info.merchant.email,
          phone: info.merchant.phone,
          postal_code: info.merchant.postal_code,
          selling_duration: info.merchant.selling_duration?.toString() || "",
          sku_count: info.merchant.sku_count?.toString() || "",
          initialFiles: info.document.length > 0 ? info.document : [],
          state_id: info.merchant.state_id?.toString() || "",
          yearly_revenue: info.merchant.yearly_revenue?.toString() || "",
          website: info.merchant.website,
          type: info.merchant.type,
          send_review: false,
          remove_doc: [],
          files: [],
        };
      }
    }
  }

  return (
    <MerchantForm
      token={searchParams.token}
      countries={allCountries.data}
      // verificationResponse={response}
      merchantCategories={
        merchantCategories.data &&
        merchantCategories.data.map((item) => ({
          label: item.title,
          value: item.id,
        }))
      }
      initialValues={initialValues}
    />
  );
};

export default MerchantSignUpForm;
