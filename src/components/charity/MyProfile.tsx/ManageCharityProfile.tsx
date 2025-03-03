"use client";
import ButtonPrimary from "@/components/common/ButtonPrimary";
import React, { useEffect, useState } from "react";
import AddFeaturedImage from "@/components/common/AddFeaturedImage";
import { updateCharityProfile } from "@/api/charity/charityProfile";
import { toast } from "react-toastify";
import { FeatureImage } from "@/components/merchant/types";
import { ErrorMessage, Field, Form, Formik } from "formik";
import CustomInputFieldFormik from "@/components/common/customFormComponents/CustomTextFieldFormik";
import { validationCharityProfile } from "./ValidationSchemaForCharity";
import { useSession } from "next-auth/react";
import {
  setCharityPersonalInfo,
  updateCharityPersonalInfo,
} from "@/lib/Store/slices/charityFeatures/charityProfile/charityInfoSlice";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelectorCharity } from "@/lib/Store/hooks";
import { emailVerify, verifyOtp } from "@/api/common/common";
import { urlToBlob } from "@/utils/basicfunctions";

export interface ICharityProfileInitialState {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  website: string;
  organisation_name: string;
  organisation_logo: FeatureImage | null;
  profile_image: File | null | string;
}

const ManageCharityProfile = ({
  initialState,
}: {
  initialState: ICharityProfileInitialState;
}) => {
  const [showGetCode, setShowGetCode] = useState(false);
  const [showResendCode, setShowResendCode] = useState(false);
  const [timer, setTimer] = useState(0);
  const [otp, setOtp] = useState("");

  const dispatch = useAppDispatch();

  const allPersonalInfo = useAppSelectorCharity((state) => state.charityInfo);
  const personalInfo = allPersonalInfo.personalProfile.personalProfileDetails;

  // (async () => {
  //   const data = await urlToBlob(
  //     allPersonalInfo.profileImage?.profileImg || "",
  //   );
  // })();

  useEffect(() => {
    if (!allPersonalInfo.personalProfile.init) {
      dispatch(
        setCharityPersonalInfo({
          personalProfileDetails: initialState,
          init: true,
        }),
      );
    }
  }, [dispatch]);

  const { data: session, update } = useSession();

  const router = useRouter();

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleGetCode = async (email: string) => {
    setShowGetCode(false);
    setTimer(30);
    const response = await emailVerify({ value: email.trim(), type: 1 });
    if (!response.error) {
      toast.success(response.data.message);
      setShowResendCode(true);
    } else {
      if (typeof response.data.message === "object") {
        const errorMessage = Object.values<string[]>(response.data.message);
        toast.error(errorMessage[0][0]);
      } else {
        toast.error(response.data.message);
      }
    }
  };

  return (
    <div>
      <Formik
        initialValues={allPersonalInfo.personalProfile.personalProfileDetails}
        enableReinitialize
        validationSchema={validationCharityProfile}
        onSubmit={async (values) => {
          const profileImageFile =
            allPersonalInfo.profileImage?.profileImg?.startsWith("http")
              ? null
              : new File(
                  [
                    await urlToBlob(
                      allPersonalInfo.profileImage?.profileImg || "",
                    ),
                  ],
                  "profile-image.png",
                  { type: "image/png" },
                );

          console.log("profileImageFile", profileImageFile);

          const _values = {
            organisation_logo: values.organisation_logo?.id || null,
            first_name: values.first_name,
            last_name: values.last_name,
            organisation_name: values.organisation_name,
            phone: values.phone,
            website: values.website,
            profile_image: profileImageFile,
          };
          try {
            const response = await updateCharityProfile(_values);
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
                  website: values.website,
                };
                // Update session
                await update(updatedSession);
              }

              dispatch(
                updateCharityPersonalInfo({
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
        {({ setFieldValue, values, isSubmitting }) => {
          return (
            <Form>
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
                    inputPlaceholder="First name"
                    value={values?.first_name ?? ""}
                    classNameContainer="xl:max-w-[360px] rounded-sm border-merchant_border"
                    styleInput={{ resize: "none" }}
                    classNameWrapper="md:pt-[5px] flex-grow"
                    className="!py-2 !text-[13px]"
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
                    inputPlaceholder="Last name"
                    value={values?.last_name ?? ""}
                    classNameContainer="xl:max-w-[360px] rounded-sm border-merchant_border"
                    styleInput={{ resize: "none" }}
                    classNameWrapper="md:pt-[5px] flex-grow"
                    className="!py-2 !text-[13px]"
                  />
                </div>

                <div className="flex items-center">
                  <span className="text-[15px] font-normal text-merchant_sidebar_text">
                    Enter Charity Name:
                  </span>
                </div>

                <div>
                  <Field
                    component={CustomInputFieldFormik}
                    type="text"
                    name="organisation_name"
                    inputPlaceholder="organisation name"
                    value={values?.organisation_name ?? ""}
                    classNameContainer="xl:max-w-[360px] rounded-sm border-merchant_border"
                    styleInput={{ resize: "none" }}
                    classNameWrapper="md:pt-[5px] flex-grow"
                    className="!py-2 !text-[13px]"
                  />
                </div>
                <div>
                  <span className="text-[15px] font-normal text-merchant_sidebar_text">
                    Charity Logo:
                  </span>
                </div>
                <div>
                  <div className="col-span-1 xl:max-w-[360px]">
                    <AddFeaturedImage
                      setTitle="Set Charity Image"
                      removeTitle="Remove Charity Image"
                      className="!mt-0"
                      title="Charity logo"
                      initialValue={values?.organisation_logo || null}
                      handleAdd={(images) => {
                        setFieldValue("organisation_logo", images[0]);
                      }}
                      handleRemove={() => {
                        setFieldValue("organisation_logo", null);
                      }}
                    />
                    <div className="text-sm text-red-600">
                      <ErrorMessage name="organisation_logo" />
                    </div>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="text-[15px] font-normal text-merchant_sidebar_text">
                    Enter Email Address:
                  </span>
                </div>
                <div>
                  <div>
                    <Field
                      component={CustomInputFieldFormik}
                      type="email"
                      name="email"
                      inputPlaceholder="Email id"
                      value={values?.email ?? ""}
                      classNameContainer="xl:max-w-[360px] rounded-sm border-merchant_border"
                      styleInput={{ resize: "none" }}
                      classNameWrapper="md:pt-[5px] flex-grow"
                      className="!py-4 !text-[13px]"
                      handleChange={(
                        e: React.ChangeEvent<HTMLInputElement>,
                      ) => {
                        setFieldValue("email", e.target.value);
                        setShowGetCode(true);
                      }}
                    >
                      {showGetCode && !showResendCode && (
                        <button
                          type="button"
                          onClick={() => handleGetCode(values.email)}
                          className="mr-2 rounded-sm bg-[linear-gradient(100deg,_#1657D9_-32.11%,_#FFF_220%)] px-2 py-1 text-white"
                        >
                          Getcode
                        </button>
                      )}
                    </Field>
                  </div>
                  {showResendCode && (
                    <div>
                      <Field
                        component={CustomInputFieldFormik}
                        type="string"
                        name="otp"
                        inputPlaceholder="Enter OTP"
                        value={otp}
                        handleChange={(
                          e: React.ChangeEvent<HTMLInputElement>,
                        ) => setOtp(e.target.value)}
                        classNameContainer="xl:max-w-[360px] rounded-sm border-merchant_border"
                        styleInput={{ resize: "none" }}
                        classNameWrapper="md:pt-[5px] flex-grow"
                        className="!py-3 !text-[13px]"
                      >
                        <button
                          type="button"
                          className="mr-2 rounded-sm bg-[linear-gradient(100deg,_#1657D9_-32.11%,_#FFF_220%)] px-2 py-1 text-white"
                          onClick={async () => {
                            if (!otp || otp.length === 0) {
                              toast.error("Please enter OTP");
                            } else if (otp.length !== 6) {
                              toast.error(
                                "OTP must be exactly 6 characters long.",
                              );
                            } else {
                              const response = await verifyOtp(otp);
                              if (!response.error) {
                                toast.success(response.data.message);
                                setShowResendCode(false);
                                setTimer(0);
                                const updatedSession = {
                                  ...session,
                                  user: { ...session?.user },
                                };
                                if (updatedSession.user?.userDetails) {
                                  updatedSession.user.userDetails = {
                                    ...updatedSession.user.userDetails,
                                    email: values.email,
                                  };
                                  await update(updatedSession);
                                }
                                dispatch(
                                  updateCharityPersonalInfo({
                                    ...values,
                                    email: values.email,
                                  }),
                                );
                              } else {
                                toast.error(response.data.message);
                              }
                            }
                          }}
                        >
                          Verify
                        </button>
                      </Field>

                      <button
                        type="button"
                        className={`mr-2 mt-2 px-2 py-1 text-blue-500 ${timer > 0 ? "cursor-not-allowed" : ""}`}
                        disabled={timer > 0}
                        onClick={() => handleGetCode(values.email)}
                      >
                        Resend {timer > 0 && `(${timer}s)`}
                      </button>
                    </div>
                  )}
                </div>
                <div className="flex items-center">
                  <span className="text-[15px] font-normal text-merchant_sidebar_text">
                    Enter Website:
                  </span>
                </div>

                <div>
                  <Field
                    component={CustomInputFieldFormik}
                    type="text"
                    name="website"
                    inputPlaceholder="warren.com"
                    value={values?.website ?? ""}
                    classNameContainer="xl:max-w-[360px] rounded-sm border-merchant_border"
                    styleInput={{ resize: "none" }}
                    classNameWrapper="md:pt-[5px] flex-grow"
                    className="!py-2 !text-[13px]"
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
                    inputPlaceholder="9865231045"
                    value={values?.phone ?? ""}
                    classNameContainer="xl:max-w-[360px] rounded-sm border-merchant_border"
                    styleInput={{ resize: "none" }}
                    classNameWrapper="md:pt-[5px] flex-grow"
                    className="!py-2 !text-[13px]"
                  />
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
                    type="reset"
                    className="!h-[34px] rounded border border-solid border-merchant_border bg-buttonGradient px-[13px] py-2 text-xs font-medium text-merchant_text_color_blue"
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

export default ManageCharityProfile;
