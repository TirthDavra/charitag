"use client";
import ButtonPrimary from "@/components/common/ButtonPrimary";
import CustomInputField from "@/components/common/customFormComponents/CustomInputField";
import React, { useEffect, useState } from "react";
import { IMerchantPersonalProfile, IMerchantProfile } from "./types";
import {
  getPersonalProfile,
  updatePersonalProfile,
} from "@/api/merchant/merchantAccount";
import { toast } from "react-toastify";
import { Field, Form, Formik } from "formik";
import CustomInputFieldFormik from "@/components/common/customFormComponents/CustomTextFieldFormik";
import { validationForMerchantProfile } from "./validationSchemaMerchant";
import { useSession } from "next-auth/react";

import {
  setMerchantPersonalInfo,
  updateMerchantPersonalInfo,
} from "@/lib/Store/slices/merchantFeatures/merchantProfile/merchantInfoSlice";
import { useAppDispatch, useAppSelectorMerchant } from "@/lib/Store/hooks";
import { useRouter } from "next/navigation";
import { urlToBlob } from "@/utils/basicfunctions";

const ManageProfile = ({
  initialState,
}: {
  initialState: IMerchantPersonalProfile;
}) => {
  const { data: session, update } = useSession();
  const router = useRouter();

  const dispatch = useAppDispatch();

  const allPersonalInfo = useAppSelectorMerchant((state) => state.merchantInfo);
  const personalInfo = allPersonalInfo.personalProfile.personalProfileDetails;

  console.log("profileImg", allPersonalInfo.profileImage.profileImg);

  useEffect(() => {
    if (!allPersonalInfo.personalProfile.init) {
      dispatch(
        setMerchantPersonalInfo({
          personalProfileDetails: initialState,
          init: true,
        }),
      );
    }
  }, [dispatch]);

  return (
    <div>
      <span className="text-lg font-medium text-merchant_sidebar_text">
        Manage Personal Profile
      </span>
      <Formik
        validationSchema={validationForMerchantProfile}
        initialValues={personalInfo}
        enableReinitialize={true}
        onSubmit={async (values) => {
          console.log("values", values);
          let profileImageFile: File | null = null;
          console.log("profileImageFile", profileImageFile);

          if (allPersonalInfo.profileImage?.profileImg) {
            const profileImageBolb = await urlToBlob(
              allPersonalInfo.profileImage.profileImg,
            );
            profileImageFile = new File(
              [profileImageBolb],
              "profile-image.png",
              { type: "image/png" },
            );
          }

          const _values = {
            first_name: values.first_name,
            last_name: values.last_name,
            phone: values.phone,
            profile_image: profileImageFile,
            email: values.email,
          };

          const response = await updatePersonalProfile(_values);
          if (response.error) {
            const errorMessage = Object.values<string>(response.data.message);
            toast.error(errorMessage[0].toString());
          } else {
            toast.success(response.data.message);
            const updatedSession = { ...session, user: { ...session?.user } };

            if (updatedSession.user?.userDetails) {
              updatedSession.user.userDetails = {
                ...updatedSession.user.userDetails,
                first_name: values.first_name,
                last_name: values.last_name,
                phone: values.phone,
                email: values.email,
              };
              // Update session
              await update(updatedSession);
            }
            dispatch(
              updateMerchantPersonalInfo({
                ...response.data.user,
                profile_image: profileImageFile
                  ? URL.createObjectURL(profileImageFile)
                  : allPersonalInfo.profileImage?.profileImg,
              }),
            );
          }
        }}
      >
        {({ values, isSubmitting }) => {
          return (
            <Form>
              <div className="grid grid-cols-1  gap-y-3 pt-[22px] md:grid-cols-[217px,1fr] md:gap-y-[45px] ">
                <div className="flex items-center">
                  <span className="text-[15px] font-normal text-merchant_sidebar_text">
                    Enter First Name:
                  </span>
                </div>
                <div>
                  <Field
                    component={CustomInputFieldFormik}
                    name="first_name"
                    inputPlaceholder="Wade"
                    type="text"
                    value={values.first_name}
                    classNameContainer="rounded-sm border-merchant_border xl:max-w-[360px]"
                    className="!py-2"
                    textPlaceholder="text-[13px]"
                  />
                </div>
                <div className="flex items-center">
                  <span className="text-[15px] font-normal text-merchant_sidebar_text">
                    Enter Last Name:
                  </span>
                </div>

                <div>
                  <Field
                    component={CustomInputFieldFormik}
                    name="last_name"
                    inputPlaceholder="Warren"
                    type="text"
                    value={values.last_name}
                    classNameContainer="rounded-sm border-merchant_border xl:max-w-[360px]"
                    className="!py-2"
                    textPlaceholder="text-[13px]"
                  />
                </div>
                <div className="flex items-center">
                  <span className="text-[15px] font-normal text-merchant_sidebar_text">
                    Enter Email Address:
                  </span>
                </div>

                <div>
                  <Field
                    component={CustomInputFieldFormik}
                    name="email"
                    inputPlaceholder="Enter Email Address"
                    type="text"
                    value={values.email}
                    classNameContainer="rounded-sm border-merchant_border xl:max-w-[360px]"
                    className="!py-2"
                    textPlaceholder="text-[13px]"
                  />
                </div>
                <div className="flex items-center">
                  <span className="text-[15px] font-normal text-merchant_sidebar_text">
                    Enter Phone Number:
                  </span>
                </div>

                <div>
                  <Field
                    component={CustomInputFieldFormik}
                    name="phone"
                    inputPlaceholder="Enter Mobile Number"
                    type="text"
                    value={values.phone}
                    classNameContainer="rounded-sm border-merchant_border xl:max-w-[360px]"
                    className="!py-2"
                    textPlaceholder="text-[13px]"
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
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default ManageProfile;
