"use client";
import { SignUp, verifyCaptcha } from "@/api/auth/auth";
import CustomInputFieldFormik from "@/components/common/customFormComponents/CustomTextFieldFormik";
import { defaultUserValidationSchema } from "@/utils/validations";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
import { toast } from "react-toastify";
import { IOptionType } from "./JoiningCategorySection";
import ReCAPTCHA from "react-google-recaptcha";

const DefaultSignUpForm = ({
  currentStep,
  handleCurrentStepChange,
  activeJoiningReason,
}: {
  currentStep: number;
  handleCurrentStepChange: (step: number) => void;
  activeJoiningReason: IOptionType;
}) => {
  const [showResend, setShowResend] = useState(true);
  const router = useRouter();
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [isVerified, setIsverified] = useState<boolean>(false);
  return (
    <Formik
      initialValues={{
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        confirm_password: "",
        termsAgreed: false,
      }}
      onSubmit={async (values, { resetForm }) => {
        const response = await SignUp({ ...values, type: 5 });
        if (!response.error) {
          setShowResend(true);
          try {
            toast.success("User is successfully registerd.");
            toast.success("Verfication mail has been sent to your email.");
            resetForm();

            router.push("/login");
          } catch (error) {
            toast.error(response.data?.message);
          }
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
      validationSchema={defaultUserValidationSchema}
    >
      {({ setFieldValue, values }) => (
        <Form>
          {currentStep === 1 && (
            <div className="pt-4">
              <h2 className="mb-5 text-[24px] font-bold">Create your login</h2>
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
                  name="email"
                  placeholder="Email address"
                  type="email"
                  required
                />
                {/* <Field
                  component={CustomInputFieldFormik}
                  name="postal_code"
                  placeholder="Postal code"
                  type="number"
                  required
                /> */}
                <Field
                  component={CustomInputFieldFormik}
                  name="password"
                  placeholder="Password"
                  type="password"
                  required
                />
                <Field
                  component={CustomInputFieldFormik}
                  name="confirm_password"
                  placeholder="Confirm password"
                  type="password"
                  required
                />
              </div>
              <div className="mt-5 flex cursor-pointer gap-2 text-gray-600 xl:items-center">
                <input
                  type="checkbox"
                  onChange={() =>
                    setFieldValue("termsAgreed", !values.termsAgreed)
                  }
                  className="h-[20px] min-h-[20px] w-[20px] min-w-[20px]"
                  name="termsAgreed"
                />
                <span>
                  I accept the&nbsp;
                  <a href="google.com" className="text-blue-400 underline">
                    Terms and Conditions
                  </a>
                  &nbsp;and acknowledge that I have read and understood
                  the&nbsp;
                  <a href="google.com" className="text-blue-400 underline">
                    Privacy Policy
                  </a>
                  &nbsp;.
                </span>
              </div>
              <div className="text-sm text-red-600">
                <ErrorMessage name="termsAgreed" />
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
              <div className="mt-10 lg:mt-[200px]">
                <h1 className="mb-3 text-xl font-bold">
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
              <div className="!mt-[30px] flex items-center gap-10">
                <div className="relative h-[1px] w-full bg-blue-300">
                  <div className="absolute bottom-0 left-0 h-[200%] w-[100%] bg-blue-500"></div>
                </div>
                <button
                  type="submit"
                  disabled={!values.termsAgreed || !isVerified}
                  className={`whitespace-nowrap rounded-full ${
                    isVerified
                      ? "bg-gradient-to-l from-gradient_color_1 to-gradient_color_2"
                      : "bg-gradient-to-l from-gradient_color_1/70 to-gradient_color_2/70"
                  } px-5 py-3 font-bold text-white`}
                >
                  Join Charitag
                </button>
              </div>
            </div>
          )}
        </Form>
      )}
    </Formik>
  );
};

export default DefaultSignUpForm;
