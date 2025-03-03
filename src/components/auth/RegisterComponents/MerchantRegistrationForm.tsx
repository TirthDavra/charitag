"use client";
import { Field, Form, Formik } from "formik";
import React, { useRef, useState } from "react";
import RegistrationProgress from "./RegistrationProgress";
import { IOptionType } from "./JoiningCategorySection";
import CustomInputFieldFormik from "@/components/common/customFormComponents/CustomTextFieldFormik";
import { ICountries } from "@/api/common/types";
import { validationSchema } from "./ValiadtionSchemaForRegister";
import { SignUp, verifyCaptcha } from "@/api/auth/auth";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import ReCAPTCHA from "react-google-recaptcha";

interface IRegistrationFormValues {
  first_name: string;
  last_name: string;
  business_name: string;
  email: string;
  password: string;
  confirm_password: string;
}

const MerchantRegistrationForm = ({
  currentStep,
  handleCurrentStepChange,
  activeJoiningReason,
  merchatCategories,
  countries,
}: {
  currentStep: number;
  handleCurrentStepChange: (step: number) => void;
  activeJoiningReason: IOptionType;
  merchatCategories: IOptionType[];
  countries: ICountries[];
}) => {
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [isVerified, setIsverified] = useState<boolean>(false);

  const router = useRouter();

  return (
    <div className="mt-4 flex flex-grow">
      <Formik
        initialValues={{
          first_name: "",
          last_name: "",
          business_name: "",
          email: "",
          password: "",
          confirm_password: "",
        }}
        validationSchema={validationSchema}
        onSubmit={async (values: IRegistrationFormValues, { resetForm }) => {
          const response = await SignUp({ ...values, type: 2 });
          if (!response.error) {
            toast.success("Verification email has been sent to your account.");
            router.push("/login");
            resetForm();
          } else {
            const message = response.data?.errors;
            if (typeof message === "object" && message !== null) {
              const errorMessage = Object.values<string>(message);
              toast.error(errorMessage[0].toString());
            } else {
              toast.error(message);
            }
          }
        }}
      >
        <Form className="flex flex-grow flex-col justify-between">
          <div className="flex h-full flex-grow flex-col justify-between">
            <div className="">
              <div className=" w-full rounded-xl  lg:mt-0 lg:max-w-[950px]">
                <h2 className="mb-5 text-lg font-bold md:text-[24px]">
                  Create your merchant login
                </h2>
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:gap-6">
                  <Field
                    component={CustomInputFieldFormik}
                    name="first_name"
                    placeholder="First name"
                    type="text"
                    required
                  />
                  <Field
                    component={CustomInputFieldFormik}
                    name="last_name"
                    placeholder="Last name"
                    type="text"
                    required
                  />

                  <Field
                    component={CustomInputFieldFormik}
                    name="business_name"
                    placeholder="Business name"
                    type="text"
                    required
                  />
                  <Field
                    component={CustomInputFieldFormik}
                    name="email"
                    placeholder="Email address"
                    type="text"
                    required
                    autoComplete={false}
                  />

                  <Field
                    component={CustomInputFieldFormik}
                    name="password"
                    placeholder="Password"
                    type="password"
                    required
                    autoComplete={false}
                  />
                  <Field
                    component={CustomInputFieldFormik}
                    name="confirm_password"
                    placeholder="Confirm password"
                    type="password"
                    required
                  />
                </div>

                <div className="mt-5">
                  <span>
                    This site is protected by reCAPTCHA and the&nbsp;
                    <a href="google.com" className="text-blue-400 underline">
                      Google Privacy Policy
                    </a>
                    &nbsp;and &nbsp;
                    <a href="google.com" className="text-blue-400 underline">
                      Terms of Service
                    </a>
                    &nbsp;apply.
                  </span>
                </div>
                <div className="mt-8">
                  <ReCAPTCHA
                    sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
                    ref={recaptchaRef}
                    autoFocus={false}
                    onChange={async (token: string | null) => {
                      const response = await verifyCaptcha({ token });
                      if (response.success) {
                        setIsverified(true);
                      }
                    }}
                  />
                </div>
                <div className="mt-4 lg:mt-[94px]">
                  <h1 className="mb-3 text-lg font-bold lg:text-[22px]">
                    If you have any questions?
                  </h1>
                  <p>
                    Visit our&nbsp;
                    <a href="google.com" className="text-blue-400 underline">
                      FAQ page
                    </a>
                    &nbsp;and find answers to common questions
                  </p>
                </div>
              </div>
            </div>
          </div>
          <RegistrationProgress
            disable={!isVerified}
            className={`!mt-0 pb-10`}
            currentStep={currentStep}
            maxStep={1}
            classNameButton={`${
              isVerified
                ? "bg-gradient-to-l from-gradient_color_1 to-gradient_color_2"
                : "bg-gradient-to-l from-gradient_color_1/70 to-gradient_color_2/70"
            }`}
          />
        </Form>
      </Formik>
    </div>
  );
};

export default MerchantRegistrationForm;
