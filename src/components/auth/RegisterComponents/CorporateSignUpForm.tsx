"use client";
import { corporateCompleteSignUp } from "@/api/auth/auth";
import { ICharityOnlyName } from "@/api/charity/types";
import { ICorporateCauses } from "@/api/merchant/types";
import Animate from "@/components/common/Animate";
import CustomInputFieldFormik from "@/components/common/customFormComponents/CustomTextFieldFormik";
import { DateTimePicker } from "@/components/ui/DateTimePicker";
import MultipleSelector, { Option } from "@/components/ui/multiple-selector";
import { convertUTCtoLocalISO } from "@/utils/basicfunctions";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import RegistrationProgress from "./RegistrationProgress";
import RadioButton from "@/components/merchant/Custom/RadioButton";
import JoinginCategorySection, { IOptionType } from "./JoiningCategorySection";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import SelectCategories from "@/components/merchant/Custom/SelectCategories";
import { ICategories } from "@/api/auth/types";
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
import { Steps, Step, StepBase } from "@axa-fr/react-toolkit-form-steps";
import RCSteps from "rc-steps";
import { getValidationSchemaCorporate } from "./ValiadtionSchemaForRegister";
import { USER_ROLES } from "@/lib/userRoles";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { BadgeInfo, Layers3, User } from "lucide-react";
export interface CorporateFinalStep {
  fundraising_goal: string;
  date_to_achieve_goal: Date | string;
  number_of_employees: string | number;
  supporting_charities: string;
  cause: string;
  category_ids: string;
  type_id: string;
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
  send_review: boolean;
}

/**
 * Displays a form for corporate sign-up with various input fields and selectors.
 *
 * @prop causes An array of causes available for selection.
 * @prop charities An array of charities available for selection.
 */

const CorporateSignUpForm = ({
  // causes,
  // charities,
  corporateCategories,
  countries,
  token,
  initialValues,
  // verificationResponse,
}: {
  // causes: ICorporateCauses[];
  // charities: ICharityOnlyName[];
  corporateCategories: ICategories[];
  countries: ICountries[];
  token: string;
  initialValues: CorporateFinalStep;
  // verificationResponse?: any;
}) => {
  const router = useRouter();
  const { data: session } = useSession();

  const [isDisabled, setIsDisabled] = useState(false);

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
          initialValues={initialValues}
          validationSchema={getValidationSchemaCorporate(currentStep)}
          onSubmit={async (values: CorporateFinalStep, formikHelpers) => {
            if (currentStep === 3) {
              const response = await corporateCompleteSignUp({
                ...values,
                remember_token: token,
              });
              if (!response.error) {
                toast.success(response.data.message);
                router.replace("/");
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
                        title: "Corporation Information",
                        onClick: () => {
                          if (currentStep > 3) setCurrentStep(3);
                        },
                        icon: <BadgeInfo />,
                      },
                    ]}
                  />
                </div>

                <div className="flex h-full flex-col justify-between rounded-xl bg-white px-[15px] pb-[25px] pt-[30px] shadow-equally_distributed_bluish lg:min-h-[450px] lg:max-w-[950px] lg:p-8">
                  {currentStep === 1 && (
                    <div className="mt-8">
                      <p className="pb-3 text-merchant_sidebar_text md:text-lg">
                        Account Type:
                      </p>
                      <SelectCategories
                        disabled={isDisabled}
                        all={false}
                        value={values.type_id}
                        productCategories={[
                          { name: "New Account", id: "1" },
                          { name: "Existing Account", id: "2" },
                        ]}
                        className={`h-14 rounded-md border-borders_color ${values.type_id ? "text-black" : "text-merchant_gray"} px-3 !text-base`}
                        handleSelectChange={(value) =>
                          setFieldValue("type_id", value)
                        }
                        placeholder="Select Type"
                      />
                      <div className="text-sm text-red-600">
                        <ErrorMessage name="type_id" />
                      </div>
                      <p className="py-3 text-merchant_sidebar_text md:text-lg">
                        Please select a category that best describes you.
                      </p>

                      <Select
                        disabled={isDisabled}
                        value={values.category_ids}
                        onValueChange={(value) => {
                          setFieldValue("category_ids", value);
                        }}
                      >
                        <SelectTrigger
                          classNameIcon="!text-black font-bold"
                          className={`h-14 rounded-md border-[1px] border-borders_color px-3 !text-base text-[13px] font-normal ${values.country_id ? "text-black" : "text-merchant_gray"} outline-none`}
                        >
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent className="text-merchant_gray">
                          {corporateCategories &&
                            corporateCategories?.map((item) => {
                              return (
                                <SelectItem
                                  key={item.id}
                                  value={item.id.toString()}
                                  className="text-base"
                                >
                                  {item.title}
                                </SelectItem>
                              );
                            })}
                        </SelectContent>
                      </Select>
                      {errors.category_ids && touched.category_ids && (
                        <div className="text-sm text-red-600">
                          {typeof errors.category_ids === "string"
                            ? errors.category_ids
                            : ""}
                        </div>
                      )}
                    </div>
                  )}
                  {currentStep === 2 && (
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
                            disabled={isDisabled}
                            value={values.country_id}
                            onValueChange={(value) => {
                              fetchStates(value);
                              setFieldValue("country_id", value);
                            }}
                          >
                            <SelectTrigger
                              classNameIcon="!text-black font-bold"
                              className={`h-14 rounded-md border-[1px] border-borders_color px-3 !text-base text-[13px] font-normal ${values.country_id ? "text-black" : "text-merchant_gray"} outline-none`}
                            >
                              <SelectValue placeholder="Select country" />
                            </SelectTrigger>
                            <SelectContent className="text-merchant_gray">
                              {countries &&
                                countries?.map((item) => {
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
                            disabled={isDisabled}
                            value={values.state_id}
                            onValueChange={(value) => {
                              setFieldValue("state_id", value);
                            }}
                          >
                            <SelectTrigger
                              classNameIcon="!text-black font-bold"
                              className={`h-14 rounded-md border-[1px] border-borders_color px-3 !text-base text-[13px] font-normal ${values.state_id ? "text-black" : "text-merchant_gray"} outline-none`}
                            >
                              <SelectValue placeholder="Select Province / State" />
                            </SelectTrigger>
                            <SelectContent className="text-merchant_gray">
                              {state &&
                                state?.map((item) => {
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
                      {/* <p className="py-2 text-merchant_sidebar_text md:text-lg">
                        Individual Addresses (Branch and District only)
                      </p> */}
                    </div>
                  )}
                  {currentStep === 3 && (
                    <div className="">
                      <div
                        className="w-fit cursor-pointer rounded-xl p-1 px-2 text-links_color transition-transform duration-300 ease-in-out hover:scale-[1.1]"
                        onClick={() => {
                          handleCurrentStepChange(currentStep - 1);
                        }}
                      >
                        <FontAwesomeIcon className="pr-2" icon={faArrowLeft} />
                        Back
                      </div>
                      <div className="">
                        <div className="grid grid-cols-1 gap-5 py-4  md:grid-cols-2 lg:gap-6">
                          <Field
                            component={CustomInputFieldFormik}
                            name="fundraising_goal"
                            placeholder="Fundraising goal"
                            type="number"
                            required
                            isDisabled={isDisabled}
                            min={0}
                          />
                          <Field
                            component={CustomInputFieldFormik}
                            name="number_of_employees"
                            placeholder="Number of employees"
                            type="number"
                            required
                            isDisabled={isDisabled}
                            min={0}
                          />
                          <div
                            aria-label="date and time picker"
                            aria-labelledby="date and time picker"
                            className=""
                          >
                            <div className="!rounded-md !border-[1.2px] !border-borders_color">
                              <DatePicker
                                disabled={isDisabled}
                                wrapperClassName="w-full"
                                selected={
                                  values.date_to_achieve_goal === ""
                                    ? null
                                    : new Date(values.date_to_achieve_goal)
                                }
                                onChange={(date) => {
                                  const newEndDate = date
                                    ? date.toISOString()
                                    : "";
                                  if (
                                    values.date_to_achieve_goal === newEndDate
                                  ) {
                                    return values;
                                  }
                                  setFieldValue(
                                    "date_to_achieve_goal",
                                    date?.toISOString(),
                                  );
                                }}
                                showTimeSelect
                                dateFormat="MM/dd/yyyy h:mm aa"
                                className="w-full cursor-pointer py-2 placeholder:text-merchant_gray"
                                placeholderText="Date to achieve goal"
                              />
                            </div>
                            <div className="text-sm text-red-600">
                              <ErrorMessage name="date_to_achieve_goal" />
                            </div>
                          </div>
                          <div>
                            <Field
                              component={CustomInputFieldFormik}
                              name="supporting_charities"
                              placeholder="Charities You Currently Support"
                              type="text"
                              value={values.supporting_charities}
                              styleInput={{ resize: "none" }}
                              textArea={true}
                              onChange={(
                                e: React.ChangeEvent<HTMLTextAreaElement>,
                              ) =>
                                setFieldValue(
                                  "supporting_charities",
                                  e.target.value,
                                )
                              }
                              textAreaRows={2}
                              required
                              isDisabled={isDisabled}
                            />
                          </div>
                          <div>
                            <Field
                              component={CustomInputFieldFormik}
                              name="cause"
                              placeholder="Cause You Currently Support"
                              type="text"
                              value={values.cause}
                              styleInput={{ resize: "none" }}
                              textArea={true}
                              onChange={(
                                e: React.ChangeEvent<HTMLTextAreaElement>,
                              ) => setFieldValue("cause", e.target.value)}
                              textAreaRows={2}
                              required
                              isDisabled={isDisabled}
                            />
                          </div>
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
                        </div>
                      </div>
                    </div>
                  )}
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

export default CorporateSignUpForm;
