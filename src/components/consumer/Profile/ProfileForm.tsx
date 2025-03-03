"use client";
import React from "react";
import { signOut, useSession } from "next-auth/react";

import CustomInputFieldFormik from "@/components/common/customFormComponents/CustomTextFieldFormik";
import ButtonPrimary from "@/components/common/ButtonPrimary";
import { Field, Form, Formik } from "formik";
import { profileValidationSchema } from "./validations";
import { IProfileFormValues } from "./types";
import { updateConsumerProfile } from "@/api/consumer/myProfile";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const ProfileForm = () => {
  const { data: session, update } = useSession();
  const router = useRouter();

  const handleSubmit = async (values: IProfileFormValues) => {
    const response = await updateConsumerProfile(values);
    if (!response.error) {
      toast.success(response.data.message);
      const updatedSession = { ...session, user: { ...session?.user } };

      if (updatedSession.user?.userDetails) {
        updatedSession.user.userDetails = {
          ...updatedSession.user.userDetails,
          first_name: values.first_name,
          last_name: values.last_name,
          dob: values.dob,
          phone: values.phone,
        };
        // Update session
        await update(updatedSession);
      }
      // if (values.newPassword !== values.currentPassword) {
      //   if (values.confirmNewPassword === values.newPassword) {
      //     await signOut();
      //     router.push("/login");
      //   }
      // }
    } else {
      const message = response.data.message;
      if (typeof message === "object" && message !== null) {
        const errorMessage = Object.values<string>(response.data.message);
        toast.error(errorMessage[0].toString());
      } else {
        toast.error(message);
      }
    }
  };
  return (
    <Formik
      initialValues={{
        first_name: session?.user?.userDetails?.first_name || "",
        last_name: session?.user.userDetails?.last_name || "",
        email: session?.user?.email ?? "",
        phone: session?.user.userDetails?.phone || "",
        dob:
          session?.user.userDetails?.dob ||
          new Date().toISOString().split("T")[0],
        current_password: "",
        password: "",
        password_confirmation: "",
      }}
      validationSchema={profileValidationSchema}
      onSubmit={handleSubmit}
      enableReinitialize={true}
    >
      {({ values, isSubmitting }) => {
        return (
          <Form>
            <div className="grid max-w-[836px] grid-cols-1 gap-[25px] lg:grid-cols-2">
              <Field
                type="text"
                name="first_name"
                component={CustomInputFieldFormik}
                placeholder="First name"
                required
              />

              <Field
                type="text"
                name="last_name"
                component={CustomInputFieldFormik}
                placeholder="Last name"
                required
              />
              {/* Email and Phone */}
              <Field
                type="text"
                name="email"
                component={CustomInputFieldFormik}
                placeholder="Email address"
                required
                isDisabled
              />
              <Field
                type="text"
                name="phone"
                component={CustomInputFieldFormik}
                placeholder="Phone number"
                autoComplete="phone"
                required
              />
              {/* DOB */}

              <Field
                type="date"
                name="dob"
                component={CustomInputFieldFormik}
                placeholder={`${values?.dob && "Date of birth"}`}
                required={!values.dob ? false : true}
              />
            </div>
            <h2 className="mb-[25px] mt-[50px] text-[22px] font-bold">
              Password change
            </h2>
            {/* Password */}
            <div className="grid max-w-[836px] grid-cols-1 gap-[25px] lg:grid-cols-2">
              <div>
                <Field
                  type="password"
                  name="current_password"
                  component={CustomInputFieldFormik}
                  placeholder="Current Password"
                  autoComplete="current-password"
                />

                <p className="my-[10px] text-gray-600">
                  Leave blank to leave unchanged
                </p>
              </div>
            </div>

            <div className="grid max-w-[836px] grid-cols-1 gap-[10px] lg:grid-cols-2 lg:gap-[25px]">
              <div className="col-span-1">
                {/* New Password */}
                <Field
                  type="password"
                  name="password"
                  component={CustomInputFieldFormik}
                  placeholder="New Password"
                  autoComplete="new-password"
                />
                <p className="mt-[10px] text-gray-600">
                  Leave blank to leave unchanged
                </p>
              </div>

              <Field
                type="password"
                name="password_confirmation"
                component={CustomInputFieldFormik}
                placeholder="Confirm New Password"
                autoComplete="new-password"
              />
            </div>

            <div className="mt-14 flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
              <ButtonPrimary
                type="submit"
                label={"Save Changes"}
                className={"mb-4 !h-[50px] max-w-fit rounded-full py-3"}
              />
              <p>
                I would like to deactivate my account,{" "}
                <a href="google.com" className="text-blue-400 underline">
                  Learn more
                </a>
              </p>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default ProfileForm;
