"use client";
import React, { useEffect, useState } from "react";
import ProofUpload, {
  CustomFile,
} from "@/components/auth/RegisterComponents/ProofUpload";
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import CustomInputFieldFormik from "@/components/common/customFormComponents/CustomTextFieldFormik";
import SelectCategories from "@/components/merchant/Custom/SelectCategories";
import { merchantCompleteSignUp, tokenVerification } from "@/api/auth/auth";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import RegistrationProgress from "@/components/auth/RegisterComponents/RegistrationProgress";
import JoinginCategorySection, {
  IOptionType,
} from "@/components/auth/RegisterComponents/JoiningCategorySection";
import RadioButton from "@/components/merchant/Custom/RadioButton";
import { ICategories } from "@/api/auth/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Steps, { Step } from "rc-steps";
import { USER_ROLES } from "@/lib/userRoles";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ICountries, IStatesById } from "@/api/common/types";
import { getStatesByCountryId } from "@/api/common/charities";
import CustomInputField from "@/components/common/customFormComponents/CustomInputField";
import RCSteps from "rc-steps";
import { getValidationSchemaMerchant } from "@/components/auth/RegisterComponents/ValiadtionSchemaForRegister";
import { BadgeInfo, Info, Layers3, User } from "lucide-react";

export interface IMerchantFinalStep {
  category_ids: IOptionType[];
  type: number;
  business_number: number | string;
  files: (File | CustomFile)[];
  selling_duration: number | string;
  yearly_revenue: number | string;
  sku_count: number | string;
  country_id: string;
  state_id: string;
  website: string;
  phone: string;
  email: string;
  charity_support: string;
  address_line_1: string;
  address_line_2: string;
  postal_code: string;
  city: string;
  send_review: boolean;
  remove_doc: number[];
  initialFiles: CustomFile[];
}
const MerchantForm = ({
  // verificationResponse,
  merchantCategories,
  countries,
  token,
  initialValues,
}: {
  // verificationResponse?: any;
  merchantCategories: IOptionType[];
  countries: ICountries[];
  token: string;
  initialValues: IMerchantFinalStep;
}) => {
  const router = useRouter();
  const { data: session } = useSession();
  const [isDisabled, setIsDisabled] = useState(false);
  const [initialVals, setInitialVals] = useState(initialValues);

  useEffect(() => {
    setInitialVals(initialValues);
  }, [initialValues]);
  useEffect(() => {
    if (session?.user?.userDetails?.account_status) {
      setIsDisabled(session.user.userDetails.account_status === 2);
    }
  }, [session]);

  const [currentStep, setCurrentStep] = useState(1);
  const [state, setState] = useState<IStatesById[]>([]);

  const fetchStates = async (countryId: string) => {
    const response = await getStatesByCountryId(countryId);
    setState(response.data);
  };

  const handleCurrentStepChange = (val: number) => {
    setCurrentStep(val < 1 ? 1 : val);
  };
  return (
    <div className="h-full">
      <Steps current={currentStep}>
        <Steps.Step
          title="Business info"
          render={() => {
            return <div>hell world</div>;
          }}
        />
        <Steps.Step title="Store info" />
      </Steps>
      <Formik
        initialValues={initialVals}
        validationSchema={getValidationSchemaMerchant(currentStep)}
        onSubmit={async (values: IMerchantFinalStep, formikHelpers) => {
          if (currentStep === 3) {
            if (!session?.user?.userDetails?.id) {
              toast.error("Please login first");
              return;
            }
            const response = await merchantCompleteSignUp({
              ...values,
              remember_token: token,
              category_ids: JSON.stringify(
                values.category_ids.map((item) => item.value),
              ),
            });
            if (!response.error) {
              if (session?.user?.userDetails?.account_status === 3) {
                toast.success("User profile saved successfully");
                router.replace("/");
                router.refresh();
              } else {
                toast.success(response.data.message);
                router.replace("/");
              }
            } else {
              if (typeof response.data.message === "object") {
                const errorMessage = Object.values<string[]>(
                  response.data.message,
                );
                toast.error(errorMessage[0][0]);
              } else {
                toast.error(response.data.message);
              }
            }
          } else {
            setCurrentStep(currentStep + 1);
            formikHelpers.setTouched({});
            formikHelpers.setSubmitting(false);
          }
        }}
      >
        {({ setFieldValue, values, errors, touched, submitForm }) => {
          const getStep = () => {
            switch (currentStep) {
              case 1:
                return (
                  <StepOne
                    errors={errors}
                    merchantCategories={merchantCategories}
                    setFieldValue={setFieldValue}
                    touched={touched}
                    values={values}
                    isDisabled={isDisabled}
                  />
                );
              case 2:
                return (
                  <StepTwo
                    countries={countries}
                    currentStep={currentStep}
                    fetchStates={fetchStates}
                    handleCurrentStepChange={handleCurrentStepChange}
                    setFieldValue={setFieldValue}
                    state={state}
                    values={values}
                    isDisabled={isDisabled}
                  />
                );
              case 3:
                return (
                  <StepThree
                    currentStep={currentStep}
                    handleCurrentStepChange={handleCurrentStepChange}
                    setFieldValue={setFieldValue}
                    values={values}
                    isDisabled={isDisabled}
                  />
                );
              default:
                return (
                  <StepOne
                    errors={errors}
                    merchantCategories={merchantCategories}
                    setFieldValue={setFieldValue}
                    touched={touched}
                    values={values}
                    isDisabled={isDisabled}
                  />
                );
            }
          };
          const handleSaveReviewChange = (val: boolean) => {
            setFieldValue("send_review", val);
            submitForm();
          };
          return (
            <Form className="h-full" id={currentStep + ""}>
              <div className="pb-6">
                <RCSteps
                  labelPlacement="horizontal"
                  current={currentStep - 1}
                  items={[
                    {
                      title: "Category",
                      onClick: () => {
                        setCurrentStep(1);
                      },
                      icon: <Layers3 />,
                    },
                    {
                      title: "Contact Information",
                      onClick: () => {
                        if (currentStep > 2) setCurrentStep(2);
                      },
                      icon: <User />,
                    },
                    {
                      title: "Business Information",
                      onClick: () => {
                        if (currentStep > 3) setCurrentStep(3);
                      },
                      icon: <BadgeInfo />,
                    },
                  ]}
                />
              </div>
              <div className="flex h-full flex-col justify-between rounded-xl bg-white px-[15px] pb-[25px] pt-[30px]   shadow-equally_distributed_bluish lg:p-8">
                {getStep()}
                <div className="pt-4">
                  <RegistrationProgress
                    className="!mt-0 pb-10"
                    currentStep={currentStep}
                    maxStep={3}
                    saved={true}
                    handleSaveReviewChange={handleSaveReviewChange}
                    disabled={isDisabled}
                  />
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default MerchantForm;

const StepOne = ({
  setFieldValue,
  values,
  merchantCategories,
  errors,
  touched,
  isDisabled,
}: any) => {
  return (
    <div className="mt-8">
      <div className="flex gap-5">
        <p>Type:</p>
        <div className="flex flex-col gap-5 md:flex-row">
          <RadioButton
            value={1}
            name="type"
            onChange={(value) => setFieldValue("type", value)}
            checked={values.type === 1}
            label="Online"
            classNameLabel="cursor-pointer"
            classNameContaine="cursor-pointer"
            disable={isDisabled}
          />
          {/* <RadioButton
          value={2}
          name="type"
          onChange={(value) =>
            setFieldValue("type", value)
          }
          checked={values.type === 2}
          label="Brick and Mortar"
          classNameLabel="cursor-pointer"
          classNameContaine="cursor-pointer"
        /> */}
        </div>
      </div>
      <p className="pt-3 text-[#2F2F35] md:text-lg">
        Please select the category that best describes you. You must choose at
        least one category.
      </p>
      <JoinginCategorySection
        initialOptions={values.category_ids}
        categories={merchantCategories}
        handleChange={(values) => {
          setFieldValue("category_ids", values);
        }}
        min={1}
        isDisabled={isDisabled}
      />
      {errors.category_ids && touched.category_ids && (
        <div className="text-red-500">
          {typeof errors.category_ids === "string" ? errors.category_ids : ""}
        </div>
      )}
    </div>
  );
};

const StepTwo = ({
  handleCurrentStepChange,
  currentStep,
  values,
  fetchStates,
  setFieldValue,
  state,
  countries,
  isDisabled,
}: any) => {
  useEffect(() => {
    if (values.country_id) {
      fetchStates(values.country_id);
    }
  }, [values.country_id]);

  return (
    <div className="lg:min-h-[450px] lg:max-w-[950px]">
      <div
        className="w-fit cursor-pointer rounded-xl p-1 px-2 text-links_color transition-transform duration-300 ease-in-out hover:scale-[1.1]"
        onClick={() => {
          handleCurrentStepChange(currentStep - 1);
        }}
      >
        <FontAwesomeIcon className="pr-2" icon={faArrowLeft} />
        Back
      </div>
      <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 lg:gap-6">
        <Field
          component={CustomInputFieldFormik}
          name="phone"
          placeholder="Phone number"
          required
          isDisabled={isDisabled}
        />
        <Field
          component={CustomInputFieldFormik}
          name="email"
          placeholder="Email address"
          type="text"
          required
          isDisabled={isDisabled}
        />
        <Field
          component={CustomInputFieldFormik}
          name="address_line_1"
          placeholder="Address line 1"
          type="text"
          required
          isDisabled={isDisabled}
        />
        <Field
          component={CustomInputFieldFormik}
          name="address_line_2"
          placeholder="Address line 2"
          type="text"
          required
          isDisabled={isDisabled}
        />
        <Field
          component={CustomInputFieldFormik}
          name="postal_code"
          placeholder="Postal code"
          required
          isDisabled={isDisabled}
        />
        <Field
          component={CustomInputFieldFormik}
          name="city"
          placeholder="City"
          type="text"
          required
          isDisabled={isDisabled}
        />
        <div>
          <Select
            disabled={isDisabled}
            value={values.country_id}
            onValueChange={(value) => {
              fetchStates(value);
              setFieldValue("country_id", value);
            }}
          >
            <SelectTrigger
              classNameIcon="!text-black font-bold"
              className={`h-14 rounded-md border-[1px] border-borders_color px-3 !text-base text-[13px] ${values.country_id ? "text-black" : "text-merchant_gray"} font-normal outline-none`}
            >
              <SelectValue placeholder="Select country" />
            </SelectTrigger>
            <SelectContent className="text-merchant_gray">
              {countries &&
                countries?.map((item: any) => {
                  return (
                    <SelectItem
                      key={item.id}
                      value={item.id.toString()}
                      className="text-base"
                    >
                      {item.name}
                    </SelectItem>
                  );
                })}
            </SelectContent>
          </Select>
          <div className="text-sm text-red-600">
            <ErrorMessage name="country_id" />
          </div>
        </div>
        <div>
          <Select
            value={values.state_id}
            onValueChange={(value) => {
              setFieldValue("state_id", value);
            }}
            disabled={isDisabled}
          >
            <SelectTrigger
              classNameIcon="!text-black font-bold"
              className={`h-14 rounded-md border-[1px] border-borders_color px-3 !text-base text-[13px] font-normal ${values.state_id ? "text-black" : "text-merchant_gray"} outline-none`}
            >
              <SelectValue placeholder="Select Province / State" />
            </SelectTrigger>

            <SelectContent className="text-merchant_gray">
              {state &&
                state?.map((item: any) => {
                  return (
                    <SelectItem
                      key={item.id}
                      value={item.id.toString()}
                      className="text-base"
                    >
                      {item.name}
                    </SelectItem>
                  );
                })}
            </SelectContent>
          </Select>
          <div className="text-sm text-red-600">
            <ErrorMessage name="state_id" />
          </div>
        </div>
      </div>
    </div>
  );
};
const StepThree = ({
  values,
  setFieldValue,
  handleCurrentStepChange,
  currentStep,
  isDisabled,
}: any) => {
  return (
    <div className="lg:min-h-[450px] lg:max-w-[950px]">
      <div
        className="w-fit cursor-pointer rounded-xl p-1 px-2 text-links_color transition-transform duration-300 ease-in-out hover:scale-[1.1]"
        onClick={() => {
          handleCurrentStepChange(currentStep - 1);
        }}
      >
        <FontAwesomeIcon className="pr-2" icon={faArrowLeft} />
        Back
      </div>
      <div className="py-4">
        <Field
          component={CustomInputFieldFormik}
          name="business_number"
          placeholder="Business number"
          type="text"
          required
          isDisabled={isDisabled}
        />
      </div>
      <div className="pb-4">
        <ProofUpload
          name="files"
          maxSize={2097152}
          className="border-1 border-borders_color"
          classNameDrag="border-1 border-borders_color"
          setFieldValue={setFieldValue}
          removedFiles={values.remove_doc}
          initialFiles={values.initialFiles}
          isDisabled={isDisabled}
        />
        <div className="text-sm text-red-600">
          <ErrorMessage name="files" />
        </div>
      </div>
      <div className="pb-4">
        <Field
          component={CustomInputFieldFormik}
          name="charity_support"
          placeholder="Charities You Currently Support"
          type="text"
          required
          isDisabled={isDisabled}
        />
      </div>
      <div className="pb-4">
        <SelectCategories
          disabled={isDisabled}
          placeholder="How Long Selling Products/Services"
          productCategories={[
            { name: "0-1 year", id: "1" },
            { name: "1-3 years", id: "2" },
            { name: "3-5 years", id: "3" },
            { name: "5-10 years", id: "4" },
            { name: "10 years +", id: "5" },
          ]}
          className="h-12 rounded-md border-borders_color !text-base"
          value={values.selling_duration}
          handleSelectChange={(value) =>
            setFieldValue("selling_duration", value)
          }
          all={false}
        />
        <div className="text-sm text-red-600">
          <ErrorMessage name="selling_duration" />
        </div>
      </div>
      <div className="pb-4">
        <SelectCategories
          disabled={isDisabled}
          placeholder="Current Yearly Revenue"
          productCategories={[
            { name: "$0 - $100,000", id: "1" },
            { name: "$100,000 - $500,000", id: "2" },
            { name: "$500,000 - $1,000,000", id: "3" },
            { name: " $1,000,000 - $5,000,000", id: "4" },
            { name: "$5,000,000 +", id: "5" },
          ]}
          className="h-12 rounded-md border-borders_color text-base"
          value={values.yearly_revenue}
          handleSelectChange={(value) => setFieldValue("yearly_revenue", value)}
          all={false}
        />
        <div className="text-sm text-red-600">
          <ErrorMessage name="yearly_revenue" />
        </div>
      </div>
      <div className="pb-4">
        <SelectCategories
          disabled={isDisabled}
          placeholder="How many SKUs"
          productCategories={[
            { name: "1", id: "1" },
            { name: "2-10", id: "2" },
            { name: " 10-100", id: "3" },
            { name: "100-1,000", id: "4" },
            { name: "1,000 +", id: "5" },
          ]}
          className="h-12 rounded-md border-borders_color text-base"
          value={values.sku_count}
          handleSelectChange={(value) => setFieldValue("sku_count", value)}
          all={false}
        />
        <div className="text-sm text-red-600">
          <ErrorMessage name="sku_count" />
        </div>
      </div>
      <Field
        component={CustomInputFieldFormik}
        name="website"
        placeholder="Website"
        type="text"
        required
        isDisabled={isDisabled}
      />
    </div>
  );
};
