"use client";
import Animate from "@/components/common/Animate";
import ProofUpload, {
  CustomFile,
} from "@/components/auth/RegisterComponents/ProofUpload";
import { ErrorMessage, Field, Form, Formik } from "formik";
import CustomInputFieldFormik from "@/components/common/customFormComponents/CustomTextFieldFormik";
import MultipleSelector, { Option } from "@/components/ui/multiple-selector";
import {
  ICorporateFundraiser,
  ICountries,
  IStatesById,
} from "@/api/common/types";
import { charityCompleteSignUp } from "@/api/auth/auth";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import RegistrationProgress from "./RegistrationProgress";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faLayerGroup } from "@fortawesome/free-solid-svg-icons";
import JoinginCategorySection, { IOptionType } from "./JoiningCategorySection";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import SelectCategories from "@/components/merchant/Custom/SelectCategories";
import { getStatesByCountryId } from "@/api/common/charities";
import CustomInputField from "@/components/common/customFormComponents/CustomInputField";
import RCSteps from "rc-steps";
import { getValidationSchemaCharity } from "./ValiadtionSchemaForRegister";
import { useRouter } from "next/navigation";
import { BadgeInfo, Layers3, User } from "lucide-react";
import path from "path";

const charityArea = [
  {
    name: "Local",
    id: "1",
  },
  {
    name: "State",
    id: "2",
  },
  {
    name: "National",
    id: "3",
  },
  {
    name: "International",
    id: "4",
  },
];

export interface ICharityFinalStep {
  registration_number: number | string;
  files: (File | CustomFile)[];
  number_of_employees: number | string;
  total_donor_base: number | string;
  category_ids: IOptionType[];
  area_id: string;
  country_id: string;
  state_id: string;
  address_line_1: string;
  address_line_2: string;
  postal_code: string;
  city: string;
  locations: string;
  website: string;
  phone: string;
  email: string;
  company_support: string;
  send_review: boolean;
  remove_doc: number[];
  initialFiles: CustomFile[];
}

/**
 * CharitySignUpForm Component
 *
 * This component renders a form for charity sign-up including fields for registration number, proof upload, number of employees,
 * total donor base, and companies who support the charity currently.
 *
 * @prop {Object} props - The component props.
 * @prop {ICorporateFundraiser[]} props.corporate - The list of corporate fundraisers available for selection.
 *
 * @returns {JSX.Element} The rendered charity sign-up form.
 */

const CharitySignUpForm = ({
  corporate,
  charityCategories,
  countries,
  searchParams,
  initialValues,
  // varification,
}: {
  corporate: ICorporateFundraiser[];
  charityCategories: IOptionType[];
  countries: ICountries[];
  searchParams: string;
  initialValues: ICharityFinalStep;
  // varification: any;
}) => {
  const router = useRouter();
  const [initialVals, setInitialVals] = useState(initialValues);

  useEffect(() => {
    setInitialVals(initialValues);
  }, [initialValues]);

  const [currentStep, setCurrentStep] = useState(1);
  const [state, setState] = useState<IStatesById[]>([]);
  const { data: session } = useSession();
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    if (session?.user?.userDetails?.account_status) {
      setIsDisabled(session.user.userDetails.account_status === 2);
    }
  }, [session]);

  const fetchStates = async (countryId: string) => {
    const response = await getStatesByCountryId(countryId);
    setState(response.data);
  };

  useEffect(() => {
    if (initialValues.country_id) {
      fetchStates(initialValues.country_id);
    }
  }, [initialValues.country_id]);

  const handleCurrentStepChange = (val: number) => {
    setCurrentStep(val < 1 ? 1 : val);
  };

  return (
    <Animate className="h-full">
      <div className="h-full">
        <Formik
          initialValues={initialVals}
          validationSchema={getValidationSchemaCharity(currentStep)}
          onSubmit={async (values: ICharityFinalStep, formikHelpers) => {
            if (currentStep === 3) {
              const response = await charityCompleteSignUp({
                ...values,
                category_ids: values.category_ids.map(
                  (category) => category.value,
                ),
                remember_token: searchParams,
              });
              if (!response.error) {
                if (session?.user?.userDetails?.account_status === 3) {
                  toast.success("User profile saved successfully");
                  router.replace("/");
                  router.refresh();
                } else {
                  toast.success(response.data.message);
                }
                // router.replace("/");
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
                      values={values}
                      charityCategories={charityCategories}
                      setFieldValue={setFieldValue}
                      touched={touched}
                      errors={errors}
                      isDisabled={isDisabled}
                    />
                  );
                case 2:
                  return (
                    <StepTwo
                      setFieldValue={setFieldValue}
                      fetchStates={fetchStates}
                      values={values}
                      handleCurrentStepChange={handleCurrentStepChange}
                      currentStep={currentStep}
                      countries={countries}
                      state={state}
                      isDisabled={isDisabled}
                    />
                  );
                case 3:
                  return (
                    <StepThree
                      handleCurrentStepChange={handleCurrentStepChange}
                      currentStep={currentStep}
                      setFieldValue={setFieldValue}
                      values={values}
                      isDisabled={isDisabled}
                    />
                  );
                default:
                  return (
                    <StepOne
                      values={values}
                      charityCategories={charityCategories}
                      setFieldValue={setFieldValue}
                      touched={touched}
                      errors={errors}
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
              <Form className="h-full">
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
                        title: "Charity Information",
                        onClick: () => {
                          if (currentStep > 3) setCurrentStep(3);
                        },
                        icon: <BadgeInfo />,
                      },
                    ]}
                  />
                </div>
                <div className="flex h-full flex-col justify-between rounded-xl bg-white px-[15px] pb-[25px] pt-[30px] shadow-equally_distributed_bluish lg:p-8">
                  {getStep()}
                  <RegistrationProgress
                    className="!mt-0 pb-10"
                    currentStep={currentStep}
                    maxStep={3}
                    saved={true}
                    handleSaveReviewChange={handleSaveReviewChange}
                    disabled={isDisabled}
                  />
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </Animate>
  );
};

export default CharitySignUpForm;

const StepOne = ({
  values,
  charityCategories,
  setFieldValue,
  touched,
  errors,
  isDisabled,
}: any) => {
  return (
    <div className="mt-8">
      <div>
        <p className="text-[#2F2F35] md:text-lg">
          Please select the category that best describes you. You must choose at
          least one category.
        </p>
        <JoinginCategorySection
          initialOptions={values.category_ids}
          categories={charityCategories}
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
      <div className="pt-4">
        <p className="text-[#2F2F35] md:text-lg">
          Please select the area that best describes you. You must choose at
          least one area.
        </p>

        <div className="pt-4">
          <SelectCategories
            placeholder="Select Area"
            all={false}
            productCategories={charityArea}
            className={`h-14 rounded-md border-[1px] border-borders_color px-3 !text-base text-[13px] font-normal ${values.area_id ? "text-black" : "text-merchant_gray"} outline-none`}
            value={values.area_id}
            handleSelectChange={(value) => {
              setFieldValue("area_id", value);
            }}
            disabled={isDisabled}
          />
          <div className="text-sm text-red-600">
            <ErrorMessage name="area_id" />
          </div>
        </div>
      </div>
    </div>
  );
};

const StepTwo = ({
  setFieldValue,
  fetchStates,
  values,
  handleCurrentStepChange,
  currentStep,
  countries,
  state,
  isDisabled,
}: any) => {
  return (
    <div className=" lg:min-h-[450px] lg:max-w-[950px]">
      <div
        className="w-fit cursor-pointer rounded-xl p-1 px-2 text-links_color transition-transform duration-300 ease-in-out hover:scale-[1.1]"
        onClick={() => {
          handleCurrentStepChange(currentStep - 1);
        }}
      >
        <FontAwesomeIcon className="pr-2" icon={faArrowLeft} />
        Back
      </div>
      <p className="py-2 text-merchant_sidebar_text md:text-lg">
        Number of locations.
      </p>
      <div className="pb-5 lg:pb-6">
        <Field
          component={CustomInputFieldFormik}
          name="locations"
          placeholder="Locations"
          type="number"
          required
          isDisabled={isDisabled}
          min={0}
        />
      </div>
      <p className="py-2 text-merchant_sidebar_text md:text-lg">
        Main Address.
      </p>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:gap-6">
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
            value={values.country_id}
            onValueChange={(value) => {
              fetchStates(value);
              setFieldValue("country_id", value);
            }}
            disabled={isDisabled}
          >
            <SelectTrigger
              classNameIcon="!text-black font-bold"
              className={`h-14 rounded-md border-[1px] border-borders_color px-3 !text-base text-[13px] font-normal ${values.country_id ? "text-black" : "text-merchant_gray"}  outline-none`}
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
  handleCurrentStepChange,
  currentStep,
  setFieldValue,
  values,
  isDisabled,
}: any) => {
  return (
    <div className=" lg:min-h-[450px] lg:max-w-[950px]">
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
          name="registration_number"
          placeholder="Charity registration number"
          type="text"
          required
          isDisabled={isDisabled}
        />
      </div>
      <div
        className="pb-4"
        onClick={(e) => {
          e.preventDefault();
        }}
      >
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
      <div className="grid grid-cols-1 gap-5 pb-4 md:grid-cols-2 lg:gap-6">
        <Field
          component={CustomInputFieldFormik}
          name="number_of_employees"
          placeholder="Number of employees"
          type="number"
          required
          isDisabled={isDisabled}
          min={0}
        />
        <Field
          component={CustomInputFieldFormik}
          name="total_donor_base"
          placeholder="Total donor base"
          type="number"
          required
          isDisabled={isDisabled}
          min={0}
        />
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
          name="website"
          placeholder="Website"
          type="text"
          required
          isDisabled={isDisabled}
        />
        <Field
          component={CustomInputFieldFormik}
          name="company_support"
          placeholder="Charities You Currently Support"
          type="text"
          isDisabled={isDisabled}
          required
        />
        <div />
      </div>
    </div>
  );
};
