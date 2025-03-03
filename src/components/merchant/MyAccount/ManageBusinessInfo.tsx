"use client";
import CustomInputField from "@/components/common/customFormComponents/CustomInputField";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect, useRef, useState } from "react";
import RadioButton from "../Custom/RadioButton";
import MultipleSelector, {
  MultipleSelectorRef,
  Option,
} from "@/components/ui/multiple-selector";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getStatesByCountryId } from "@/api/common/common";
import { ICountries, IStatesById } from "@/api/common/types";
import ProofUpload, {
  CustomFile,
} from "@/components/auth/RegisterComponents/ProofUpload";
import SelectCategories from "../Custom/SelectCategories";
import ButtonPrimary from "@/components/common/ButtonPrimary";
import { validationSchemaMerchantInfo } from "./validationSchemaMerchant";
import CustomInputFieldFormik from "@/components/common/customFormComponents/CustomTextFieldFormik";
import { IMerchantBusniessData } from "./types";
import { updateMerchantBusinessInfo } from "@/api/merchant/merchantAccount";
import { toast } from "react-toastify";

import {
  setMerchantBusinessInfo,
  updateMerchantBusinessInformation,
} from "@/lib/Store/slices/merchantFeatures/merchantProfile/merchantInfoSlice";
import { debouncedGetCountries, debouncedGetStates } from "@/api/common/common";
import Combobox from "@/components/common/Combobox";
import { useAppDispatch, useAppSelectorMerchant } from "@/lib/Store/hooks";
import { useRouter } from "next/navigation";

export interface IMerchantInitState {
  business_name: string;
  category_ids: Option[];
  type: number | null;
  business_number: number | string;
  files: CustomFile[];
  selling_duration: number | string;
  yearly_revenue: number | string;
  sku_count: number | string;
  country_id: Option | null;
  state_id: Option | null;
  charity_support: string;
  address_line_1: string;
  address_line_2: string | null;
  postal_code: string;
  city: string;
  initialFiles: CustomFile[];
  remove_doc: number[];
}

const ManageBusinessInfo = ({
  merchantCategories,
  initialValues,
  allCountries,
}: {
  merchantCategories: Option[];
  initialValues: IMerchantInitState;
  allCountries: ICountries[];
}) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const allCountriesRef = useRef(
    allCountries?.map((item) => ({
      label: item.name,
      value: item.id.toString(),
    })),
  );
  const allBuinsessInfo = useAppSelectorMerchant((state) => state.merchantInfo);
  const businessInfo = allBuinsessInfo.businessInfo.businessInfoDetails;

  useEffect(() => {
    console.log("businessInfo", businessInfo);
  }, [businessInfo]);
  useEffect(() => {
    if (!allBuinsessInfo.businessInfo.init) {
      dispatch(
        setMerchantBusinessInfo({
          businessInfoDetails: initialValues,
          init: true,
        }),
      );
    }
  }, [dispatch]);

  const [states, setStates] = useState<Option[]>([]);
  const [isStateLoading, setIsStateLoading] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      if (initialValues.country_id !== null) {
        const response = await getStatesByCountryId(
          initialValues.country_id.value,
        );
        if (!response.error) {
          setStates(
            response.data.data.map((item) => ({
              label: item.name,
              value: item.id.toString(),
            })),
          );
        }
      }
    })();
  }, []);

  return (
    <div>
      <Formik
        initialValues={businessInfo}
        validationSchema={validationSchemaMerchantInfo}
        enableReinitialize
        onSubmit={async (values: IMerchantInitState) => {
          const countryValue = values.country_id
            ? values.country_id.value
            : null;
          const stateValue = values.state_id ? values.state_id.value : null;
          const _values = {
            address_line_1: values.address_line_1,
            address_line_2: values.address_line_2,
            business_name: values.business_name,
            business_number: values.business_number,
            charity_support: values.charity_support,
            city: values.city,
            country_id: Number(countryValue),
            files: values.files,
            postal_code: values.postal_code,
            remove_doc: values.remove_doc,
            selling_duration: Number(values.selling_duration),
            sku_count: Number(values.sku_count),
            state_id: Number(stateValue),
            type: Number(values.type),
            yearly_revenue: Number(values.yearly_revenue),
            category_ids: values.category_ids.map((item) => Number(item.value)),
          };
          const response = await updateMerchantBusinessInfo(_values);

          if (!response.error) {
            toast.success(response.data.message);
            dispatch(updateMerchantBusinessInformation(values));
          } else {
            toast.error(response.data.message);
          }
        }}
      >
        {({ values, setFieldValue, isSubmitting, setFieldTouched }) => {
          // console.log("values", values);
          return (
            <Form>
              <div className="grid grid-cols-1  gap-y-3 pt-[22px] md:grid-cols-[217px,1fr] md:gap-y-[45px] ">
                <div className="flex items-center">
                  <span className="text-[15px] font-normal text-merchant_sidebar_text">
                    Enter Business Name:
                  </span>
                </div>
                <Field
                  component={CustomInputFieldFormik}
                  name="business_name"
                  inputPlaceholder="Business name"
                  type="text"
                  value={values.business_name}
                  classNameContainer="rounded-sm border-merchant_border xl:max-w-[360px]"
                  className="!py-2"
                  textPlaceholder="text-[13px]"
                />
                <div className="flex items-center">
                  <span className="text-[15px] font-normal text-merchant_sidebar_text">
                    Select type:
                  </span>
                </div>
                <RadioButton
                  value={1}
                  name="type"
                  onChange={(value) => setFieldValue("type", value)}
                  checked={values.type === 1}
                  label="Online"
                  classNameLabel="cursor-pointer"
                  classNameContaine="cursor-pointer"
                />
                <div className="flex items-center">
                  <span className="text-[15px] font-normal text-merchant_sidebar_text">
                    Main Merchant Category:
                  </span>
                </div>
                <div className="xl:!max-w-[360px]">
                  <MultipleSelector
                    options={merchantCategories}
                    className="rounded-sm border-merchant_border !text-[13px] placeholder:!text-[13px] placeholder:!font-normal placeholder:!text-[#828282] xl:!max-w-[360px]"
                    value={values.category_ids}
                    placeholder="Merchant Category"
                    onChange={(values) => setFieldValue("category_ids", values)}
                  />
                  <div className="-mt-[10px] text-sm text-red-600">
                    <ErrorMessage name="category_ids" />
                  </div>
                </div>
                {/* <div className="flex items-center">
                  <span className="text-[15px] font-normal text-merchant_sidebar_text">
                    Number of locations:
                  </span>
                </div>
                <Field
                  component={CustomInputField}
                  name="locations"
                  inputPlaceholder="Number of locations"
                  type="number"
                  classNameContainer="rounded-sm border-merchant_border xl:max-w-[360px]"
                  styleInput={{ resize: "none" }}
                  classNameWrapper="pt-[5px] md:pt-0 flex-grow"
                  className="!py-2"
                  textPlaceholder="!text-[13px]"
                /> */}
                <div className="flex items-center">
                  <span className="text-[15px] font-normal text-merchant_sidebar_text">
                    Address Line 1:
                  </span>
                </div>
                <Field
                  component={CustomInputFieldFormik}
                  name="address_line_1"
                  inputPlaceholder="Address Line 1"
                  type="text"
                  value={values.address_line_1}
                  classNameContainer="rounded-sm border-merchant_border xl:max-w-[360px]"
                  className="!py-2"
                  textPlaceholder="text-[13px]"
                />
                <div className="flex items-center">
                  <span className="text-[15px] font-normal text-merchant_sidebar_text">
                    Address Line 2:
                  </span>
                </div>
                <Field
                  component={CustomInputFieldFormik}
                  name="address_line_2"
                  inputPlaceholder="Address Line 2"
                  type="text"
                  value={values.address_line_2}
                  classNameContainer="rounded-sm border-merchant_border xl:max-w-[360px]"
                  className="!py-2"
                  textPlaceholder="text-[13px]"
                />
                <div className="flex items-center">
                  <span className="text-[15px] font-normal text-merchant_sidebar_text">
                    City:
                  </span>
                </div>
                <Field
                  component={CustomInputFieldFormik}
                  name="city"
                  inputPlaceholder="City"
                  type="text"
                  value={values.city}
                  classNameContainer="rounded-sm border-merchant_border xl:max-w-[360px]"
                  className="!py-2"
                  textPlaceholder="text-[13px]"
                />
                <div className="flex items-center">
                  <span className="text-[15px] font-normal text-merchant_sidebar_text">
                    Postal Code:
                  </span>
                </div>

                <Field
                  component={CustomInputFieldFormik}
                  name="postal_code"
                  inputPlaceholder="Postal Code"
                  type="text"
                  value={values.postal_code}
                  classNameContainer="rounded-sm border-merchant_border xl:max-w-[360px]"
                  className="!py-2"
                  textPlaceholder="text-[13px]"
                />

                <div className="flex items-center">
                  <span className="text-[15px] font-normal text-merchant_sidebar_text">
                    Select Country:
                  </span>
                </div>
                <div className="xl:max-w-[360px]">
                  <Combobox
                    key="country_id"
                    defaultOptions={allCountriesRef.current}
                    value={values?.country_id}
                    onSearch={async (value) => {
                      if (value.trim() === "") {
                        return allCountriesRef.current;
                      }
                      return new Promise((resolve) => {
                        setTimeout(() => {
                          const res = allCountriesRef.current.filter((option) =>
                            option.label
                              .toLowerCase()
                              .includes(value.toLowerCase()),
                          );
                          resolve(res);
                        }, 1000);
                      });
                    }}
                    delay={0}
                    triggerSearchOnFocus={true}
                    placeholder={"Search and Select Country..."}
                    onChange={async (values) => {
                      setFieldValue("country_id", values);
                      setFieldValue("state_id", null);
                      setTimeout(() => setFieldTouched("country_id", true));
                      let states: Option[] = [];
                      setStates([]);
                      if (values !== null) {
                        setIsStateLoading(true); // Start loading state
                        const stateResponse = await getStatesByCountryId(
                          values.value,
                        );
                        setIsStateLoading(false); // End loading state
                        if (!stateResponse.error) {
                          const fetchedStates = stateResponse.data.data.map(
                            (item) => ({
                              label: item.name,
                              value: item.id.toString(),
                            }),
                          );
                          setStates(fetchedStates);
                        }
                      } else {
                        setStates([]);
                      }
                    }}
                    className={`rounded-sm border-merchant_border text-[13px] xl:max-w-[360px] ${values.country_id ? "py-3" : "py-4"}`}
                    hidePlaceholderWhenSelected
                    loadingIndicator={
                      <p className="text-center text-sm text-muted-foreground">
                        loading...
                      </p>
                    }
                    emptyIndicator={
                      <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                        No results found.
                      </p>
                    }
                  />
                  <div className="text-sm text-red-500">
                    <ErrorMessage name="country_id" />
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="text-[15px] font-normal text-merchant_sidebar_text">
                    Select state:
                  </span>
                </div>
                <div className="xl:max-w-[360px] ">
                  <Combobox
                    key="state_id"
                    value={values?.state_id}
                    options={states}
                    onSearch={async (value) => {
                      return new Promise((resolve) => {
                        setTimeout(() => {
                          const res = states.filter((option) =>
                            option.label
                              .toLowerCase()
                              .includes(value.toLowerCase()),
                          );
                          resolve(res);
                        }, 1000);
                      });
                    }}
                    triggerSearchOnFocus={true}
                    placeholder={
                      isStateLoading
                        ? "Loading states..."
                        : values.country_id === null
                          ? "Please select a country first."
                          : states.length === 0
                            ? "No states were found for this country."
                            : "Search and select state..."
                    }
                    onChange={(values) => {
                      setFieldValue("state_id", values);
                    }}
                    disabled={
                      values.country_id === null
                        ? true
                        : states.length === 0
                          ? true
                          : false
                    }
                    className={`rounded-sm !border-merchant_border !text-[13px]  ${values.country_id ? "py-3" : "py-4"}`}
                    hidePlaceholderWhenSelected
                    loadingIndicator={
                      <p className="text-center text-sm text-muted-foreground">
                        loading...
                      </p>
                    }
                    emptyIndicator={
                      <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                        No results found.
                      </p>
                    }
                  />
                  <div className="text-sm text-red-500">
                    <ErrorMessage name="state_id" />
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="text-[15px] font-normal text-merchant_sidebar_text">
                    Enter Business Number:
                  </span>
                </div>

                <Field
                  component={CustomInputFieldFormik}
                  name="business_number"
                  inputPlaceholder="Business number"
                  type="number"
                  value={values.business_number}
                  classNameContainer="rounded-sm border-merchant_border xl:max-w-[360px]"
                  className="!py-2"
                  textPlaceholder="text-[13px]"
                  min={0}
                />
                <div className="flex items-center">
                  <span className="text-[15px] font-normal text-merchant_sidebar_text">
                    Add Business Proof:
                  </span>
                </div>
                <div className="pb-4 xl:max-w-[360px]">
                  <ProofUpload
                    name="files"
                    maxSize={10485760}
                    setFieldValue={setFieldValue}
                    initialFiles={values.initialFiles}
                    removedFiles={values.remove_doc}
                  />
                  <div className="text-sm text-red-600">
                    <ErrorMessage name="files" />
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="text-[15px] font-normal text-merchant_sidebar_text">
                    Charities You Currently Support:
                  </span>
                </div>
                <div>
                  <Field
                    component={CustomInputFieldFormik}
                    name="charity_support"
                    inputPlaceholder="Charities You Currently Support"
                    type="text"
                    classNameContainer="rounded-sm border-merchant_border xl:max-w-[360px]"
                    styleInput={{ resize: "none" }}
                    classNameWrapper="pt-[5px] md:pt-0 flex-grow"
                    className="!py-2"
                    textPlaceholder="!text-[13px]"
                    value={values.charity_support}
                  />
                </div>
                {/* <Field
                  component={CustomInputFieldFormik}
                  name="charity_support"
                  inputPlaceholder="Charities You Currently Support"
                  type="text"
                  value={values.charity_support}
                  classNameContainer="rounded-sm border-merchant_border xl:max-w-[360px]"
                  className="!py-2"
                /> */}
                <div className="flex items-center">
                  <span className="text-[15px] font-normal text-merchant_sidebar_text">
                    How Long Selling Products/Services:
                  </span>
                </div>
                <div>
                  <div>
                    {values?.selling_duration ? (
                      <SelectCategories
                        placeholder="How Long Selling Products/Services"
                        productCategories={[
                          { name: "0-1 year", id: "1" },
                          { name: "1-3 years", id: "2" },
                          { name: "3-5 years", id: "3" },
                          { name: "5-10 years", id: "4" },
                          { name: "10 years +", id: "5" },
                        ]}
                        className={`h-[unset] rounded-sm border-merchant_border xl:max-w-[360px]  ${values.selling_duration ? "text-black" : "text-merchant_gray"}`}
                        value={values.selling_duration}
                        handleSelectChange={(value) =>
                          setFieldValue("selling_duration", value)
                        }
                        all={false}
                      />
                    ) : (
                      <div className="rounded bg-slate-200 py-4 xl:max-w-[360px]"></div>
                    )}
                  </div>
                  <div className="text-sm text-red-600">
                    <ErrorMessage name="selling_duration" />
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="text-[15px] font-normal text-merchant_sidebar_text">
                    Current Yearly Revenue:
                  </span>
                </div>
                <div>
                  <div>
                    {values?.yearly_revenue ? (
                      <SelectCategories
                        placeholder="Current Yearly Revenue"
                        productCategories={[
                          { name: "$0 - $100,000", id: "1" },
                          { name: "$100,000 - $500,000", id: "2" },
                          { name: "$500,000 - $1,000,000", id: "3" },
                          { name: " $1,000,000 - $5,000,000", id: "4" },
                          { name: "$5,000,000 +", id: "5" },
                        ]}
                        className={`h-[unset] rounded-sm border-merchant_border xl:max-w-[360px]  ${values.yearly_revenue ? "text-black" : "text-merchant_gray"}`}
                        value={values.yearly_revenue}
                        handleSelectChange={(value) =>
                          setFieldValue("yearly_revenue", value)
                        }
                        all={false}
                      />
                    ) : (
                      <div className="rounded bg-slate-200 py-4 xl:max-w-[360px]"></div>
                    )}
                  </div>
                  <div className="text-sm text-red-600">
                    <ErrorMessage name="yearly_revenue" />
                  </div>
                </div>
                <div className="flex pt-2">
                  <span className="text-[15px] font-normal text-merchant_sidebar_text">
                    How many SKUs:
                  </span>
                </div>
                <div className="pb-4">
                  <div>
                    {values?.sku_count ? (
                      <SelectCategories
                        placeholder="How many SKUs"
                        productCategories={[
                          { name: "1", id: "1" },
                          { name: "2-10", id: "2" },
                          { name: " 10-100", id: "3" },
                          { name: "100-1,000", id: "4" },
                          { name: "1,000 +", id: "5" },
                        ]}
                        className={`h-[unset] rounded-sm border-merchant_border xl:max-w-[360px]  ${values.sku_count ? "text-black" : "text-merchant_gray"}`}
                        value={values.sku_count}
                        handleSelectChange={(value) =>
                          setFieldValue("sku_count", value)
                        }
                        all={false}
                      />
                    ) : (
                      <div className="rounded bg-slate-200 py-4 xl:max-w-[360px]"></div>
                    )}
                  </div>
                  <div className="text-sm text-red-600">
                    <ErrorMessage name="sku_count" />
                  </div>
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

export default ManageBusinessInfo;
