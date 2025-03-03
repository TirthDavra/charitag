"use client";
import ButtonPrimary from "@/components/common/ButtonPrimary";
import CustomInputField from "@/components/common/customFormComponents/CustomInputField";
import React, { useEffect, useState } from "react";
import {
  getPersonalProfile,
  updatePersonalProfile,
} from "@/api/merchant/merchantAccount";
import { toast } from "react-toastify";
import { ICorporateProfile } from "@/api/corporation/types";
import { updateCorporateProfile } from "@/api/corporation/corporateProfile";
import { Field, Form, Formik } from "formik";
import CustomInputFieldFormik from "@/components/common/customFormComponents/CustomTextFieldFormik";
import * as Yup from "yup";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelectorCorporation } from "@/lib/Store/hooks";
import {
  setCorporatePersonalInfo,
  updateCorporatePersonalInfo,
} from "@/lib/Store/slices/corporationFeatures/corporateInfoSlice";
import { urlToBlob } from "@/utils/basicfunctions";

export interface CorporateProfileState {
  first_name: string;
  last_name: string;
  email: string;
  corporate_name: string;
  profile_image: File | null | string;
}

const validationSchema = Yup.object({
  first_name: Yup.string().required("First name is required"),
  last_name: Yup.string().required("Last name is required"),
  email: Yup.string()
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/,
      "Invalid email address",
    )
    .required("Email address is required"),
  corporate_name: Yup.string().required("Corporate name is required"),
});

const ManageCorporateProfile = ({
  initialState,
}: {
  initialState: CorporateProfileState;
}) => {
  const { data: session, update } = useSession();

  const router = useRouter();

  const dispatch = useAppDispatch();

  const allPersonalInfo = useAppSelectorCorporation(
    (state) => state.corporateInfo,
  );
  const personalInfo = allPersonalInfo.personalProfile.personalProfileDetails;

  useEffect(() => {
    if (!allPersonalInfo.personalProfile.init) {
      dispatch(
        setCorporatePersonalInfo({
          personalProfileDetails: initialState,
          init: true,
        }),
      );
    }
  }, [dispatch]);

  return (
    <div>
      <Formik
        initialValues={personalInfo}
        validationSchema={validationSchema}
        enableReinitialize
        onSubmit={async (values, { resetForm }) => {
          const profileImageFile =
            allPersonalInfo.profileImage?.profileImg?.startsWith("http")
              ? null
              : new File(
                  [
                    await urlToBlob(
                      allPersonalInfo.profileImage.profileImg || "",
                    ),
                  ],
                  "profile-image.png",
                  { type: "image/png" },
                );

          console.log("profileImageFile", profileImageFile);

          try {
            const response = await updateCorporateProfile({
              ...values,
              profile_image: profileImageFile,
            });
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
                  email: values.email,
                  corporate_name: values.corporate_name,
                };
                // Update session
                await update(updatedSession);
              }
              dispatch(
                updateCorporatePersonalInfo({
                  ...values,
                  profile_image: allPersonalInfo.profileImage?.profileImg,
                }),
              );
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
                Manage Personal Profile
              </span>
              <div className="grid grid-cols-1  gap-y-3 pt-[22px] md:grid-cols-[217px,1fr] md:gap-y-[45px] ">
                <div className="flex items-center">
                  <span className="text-[15px] font-normal text-merchant_sidebar_text">
                    Enter First Name:
                  </span>
                </div>
                <div>
                  <Field
                    component={CustomInputFieldFormik}
                    type="text"
                    name="first_name"
                    inputPlaceholder="Wade"
                    value={values.first_name}
                    classNameContainer="xl:max-w-[360px] rounded-sm border-merchant_border"
                    styleInput={{ resize: "none" }}
                    classNameWrapper="pt-[5px] md:pt-0 flex-grow"
                    className="!py-2"
                    textPlaceholder="!text-[13px]"
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
                    type="text"
                    name="last_name"
                    inputPlaceholder="Warren"
                    value={values.last_name}
                    classNameContainer="xl:max-w-[360px] rounded-sm border-merchant_border"
                    styleInput={{ resize: "none" }}
                    classNameWrapper="pt-[5px] md:pt-0 flex-grow"
                    className="!py-2"
                    textPlaceholder="!text-[13px]"
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
                    type="email"
                    name="email"
                    inputPlaceholder="Enter Email Address"
                    value={values.email}
                    classNameContainer="xl:max-w-[360px] rounded-sm border-merchant_border"
                    styleInput={{ resize: "none" }}
                    classNameWrapper="pt-[5px] md:pt-0 flex-grow"
                    className="!py-2"
                    textPlaceholder="!text-[13px]"
                  />
                </div>

                <div className="flex items-center">
                  <span className="text-[15px] font-normal text-merchant_sidebar_text">
                    Corporate Name:
                  </span>
                </div>

                <div>
                  <Field
                    component={CustomInputFieldFormik}
                    name="corporate_name"
                    inputPlaceholder="Corporate name"
                    value={values.corporate_name}
                    classNameContainer="xl:max-w-[360px] rounded-sm border-merchant_border"
                    styleInput={{ resize: "none" }}
                    classNameWrapper="pt-[5px] md:pt-0 flex-grow"
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

export default ManageCorporateProfile;
