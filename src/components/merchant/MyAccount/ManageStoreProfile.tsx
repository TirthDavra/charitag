"use client";
import React, { useEffect, useState } from "react";
import CustomInputField from "@/components/common/customFormComponents/CustomInputField";
import Tiptap from "../../common/RichTextEditor/RichTextEditor";
import { updateStoreProfile } from "@/api/merchant/merchantAccount";
import ButtonPrimary from "@/components/common/ButtonPrimary";
import AddStoreImage from "./AddStoreImage";
import StoreGallery from "./StoreGallery";
import { IMearchantStoreProfile } from "./types";
import { toast } from "react-toastify";
import { FeatureImage } from "../types";
import { useRouter } from "next/navigation";
import AddStoreLogo from "./AddStoreLogo";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { validationSchemaForStoreProfile } from "./validationSchemaMerchant";
import CustomInputFieldFormik from "@/components/common/customFormComponents/CustomTextFieldFormik";
import Link from "next/link";

import {
  setMerchantStoreInfo,
  updateMerchantStoreInfo,
} from "@/lib/Store/slices/merchantFeatures/merchantProfile/merchantInfoSlice";
import { useAppDispatch, useAppSelectorMerchant } from "@/lib/Store/hooks";

export interface IMearchantStoreProfileState
  extends Omit<IMearchantStoreProfile, "gallery" | "feature_image" | "logo"> {
  gallery: number[];
  feature_image: number | null;
  logo: number | null;
}
export interface IInitStoreState {
  name: string;
  description: string;
  about_store: string;
  twitter: string;
  linkedin: string;
  facebook: string;
  feature_image: FeatureImage | null;
  gallery: FeatureImage[];
  logo: FeatureImage | null;
}
const ManageStoreProfile = ({
  initialState,
}: {
  initialState: IInitStoreState;
}) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const allStoreInfo = useAppSelectorMerchant((state) => state.merchantInfo);
  const storeInfo = allStoreInfo.storeProfile.storeProfileDetails;

  useEffect(() => {
    if (!allStoreInfo.storeProfile.init) {
      dispatch(
        setMerchantStoreInfo({
          storeProfileDetails: initialState,
          init: true,
        }),
      );
    }
  }, [dispatch]);

  return (
    <Formik
      validationSchema={validationSchemaForStoreProfile}
      initialValues={storeInfo}
      enableReinitialize={true}
      onSubmit={async (values) => {
        const _storeProfile = {
          ...values,
          feature_image: values.feature_image?.id ?? null,
          gallery: values.gallery.map((image) => image.id),
          logo: values.logo?.id ?? null,
        };
        const response = await updateStoreProfile(_storeProfile);
        if (response.error) {
          const errorMessage = Object?.values<string>(response.data.message);
          toast.error(errorMessage[0].toString());
        } else {
          toast.success(response.data.message);
          dispatch(updateMerchantStoreInfo(values));
        }
      }}
    >
      {({ values, setFieldValue, isSubmitting }) => {
        return (
          <Form>
            <div>
              <span className="text-lg font-medium text-merchant_sidebar_text">
                Manage Store Profile
              </span>
              <div className="grid grid-cols-1 gap-x-[30px] gap-y-3 pt-[22px] md:grid-cols-[145px,1fr] md:gap-y-[45px]">
                <div className="flex items-center">
                  <span className="text-[15px] font-normal text-merchant_sidebar_text">
                    Name of Store:
                  </span>
                </div>
                <div className="w-full">
                  <Field
                    component={CustomInputFieldFormik}
                    inputPlaceholder="Charitag"
                    value={values.name}
                    name="name"
                    type="text"
                    classNameContainer="max-w-[360px] rounded-sm border-merchant_border"
                    styleInput={{ resize: "none" }}
                    classNameWrapper="pt-[5px] md:pt-0"
                    className="!py-2"
                    textPlaceholder="!text-[13px]"
                  />
                </div>
                <div className="flex pt-0 md:pt-[2px]">
                  <span className="text-[15px] font-normal text-merchant_sidebar_text">
                    Short Description:
                  </span>
                </div>
                <div>
                  <Field
                    component={CustomInputFieldFormik}
                    inputPlaceholder="Write Hear Description..."
                    value={values.description}
                    name="description"
                    type="text"
                    classNameContainer="max-w-[950px] rounded-sm border-merchant_border"
                    styleInput={{ resize: "none" }}
                    classNameWrapper="pt-[5px] md:pt-0"
                    className="!py-2"
                    textArea={true}
                    textAreaRows={2}
                    textPlaceholder="!text-[13px]"
                  />
                </div>
                <div>
                  <span className="pt-0 text-[15px] font-normal text-merchant_sidebar_text md:pt-[5px]">
                    About Store:
                  </span>
                </div>
                <div className="max-w-[950px]">
                  <Tiptap
                    onChange={(data) => {
                      setFieldValue("about_store", data);
                    }}
                    initContent={values.about_store}
                  />
                  <div className="text-sm text-red-600">
                    <ErrorMessage name="about_store" />
                  </div>
                  <div className="grid gap-x-[60px] md:grid-cols-2 xl:gap-x-[120px]">
                    <div className="col-span-1">
                      <AddStoreLogo
                        initialValue={values.logo}
                        handleChange={(logo: FeatureImage | null) => {
                          setFieldValue("logo", logo);
                        }}
                      />
                      <div className="text-sm text-red-600">
                        <ErrorMessage name="logo" />
                      </div>
                    </div>
                    <div className="col-span-1">
                      <AddStoreImage
                        handleChange={(feature_image: FeatureImage | null) =>
                          setFieldValue("feature_image", feature_image)
                        }
                        initialValue={values.feature_image}
                      />
                      <div className="text-sm text-red-600">
                        <ErrorMessage name="feature_image" />
                      </div>
                    </div>
                    <div className="col-span-1">
                      <StoreGallery
                        handleChange={(gallery) =>
                          setFieldValue("gallery", gallery)
                        }
                        initialImages={values.gallery ?? []}
                      />
                      <div className="text-sm text-red-600">
                        <ErrorMessage name="gallery" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="text-[15px] font-normal text-merchant_sidebar_text">
                    Facebook:
                  </span>
                </div>
                <div>
                  <Field
                    component={CustomInputFieldFormik}
                    inputPlaceholder="URL"
                    value={values.facebook}
                    name="facebook"
                    type="text"
                    classNameContainer="max-w-[360px] rounded-sm border-merchant_border"
                    styleInput={{ resize: "none" }}
                    classNameWrapper="pt-[5px] md:pt-0"
                    className="!py-2"
                    textPlaceholder="!text-[13px]"
                  />
                </div>
                <div className="flex items-center">
                  <span className="text-[15px] font-normal text-merchant_sidebar_text">
                    Linkedin:
                  </span>
                </div>
                <div>
                  <Field
                    component={CustomInputFieldFormik}
                    inputPlaceholder="URL"
                    value={values.linkedin}
                    name="linkedin"
                    type="text"
                    classNameContainer="max-w-[360px] rounded-sm border-merchant_border"
                    styleInput={{ resize: "none" }}
                    classNameWrapper="pt-[5px] md:pt-0"
                    className="!py-2"
                    textPlaceholder="!text-[13px]"
                  />
                </div>
                <div className="flex items-center">
                  <span className="text-[15px] font-normal text-merchant_sidebar_text">
                    Twitter:
                  </span>
                </div>
                <div>
                  <Field
                    component={CustomInputFieldFormik}
                    inputPlaceholder="URL"
                    value={values.twitter}
                    name="twitter"
                    type="text"
                    classNameContainer="max-w-[360px] rounded-sm border-merchant_border"
                    styleInput={{ resize: "none" }}
                    classNameWrapper="pt-[5px] md:pt-0"
                    className="!py-2"
                    textPlaceholder="!text-[13px]"
                  />
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
  );
};

export default ManageStoreProfile;
