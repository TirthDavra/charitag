"use client";
import React, { useState } from "react";
import { Field, FieldArray, Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "react-toastify";
import CustomInputFieldFormik from "@/components/common/customFormComponents/CustomTextFieldFormik";
import ButtonPrimary from "@/components/common/ButtonPrimary";
import { getStatesByCountryId } from "@/api/common/charities";
import { ICountries, IStatesById } from "@/api/common/types";
import { Option } from "@/components/ui/multiple-selector";
import { useRouter } from "next/navigation";

// Define the interfaces
export interface IMainCorporateLocation {
  numberOfLocations: number;
  addressLine1: string;
  addressLine2: string;
  city: string;
  postalCode: string;
  country_id: string;
  stateProvince: string;
  state_id: string;
}

interface ManageCorporateLocationProps {
  initialState: IMainCorporateLocation;
  countries: ICountries[];
}

// Validation schema using Yup
const validationSchema = Yup.object().shape({
  numberOfLocations: Yup.number()
    .required("Number of locations is required")
    .positive("Must be a positive number")
    .integer("Must be an number"),
  addressLine1: Yup.string().required("Address line 1 is required"),
  addressLine2: Yup.string().required("Address line 2 is required"),
  city: Yup.string().required("City is required"),
  postalCode: Yup.string()
    .matches(/^\d{6}$/, "Postal Code only contain 6 numbers")
    .required("Postal code is required"),
  country_id: Yup.string().required("Country is required"),
  state_id: Yup.string().required("State/Province is required"),
});

const ManageCorporateLocations = ({
  initialState,
  countries,
}: ManageCorporateLocationProps) => {
  const [state, setState] = useState<IStatesById[]>([]);

  const fetchStates = async (countryId: string) => {
    const response = await getStatesByCountryId(countryId);
    setState(response.data);
  };
  const router = useRouter();

  return (
    <div>
      <Formik
        initialValues={initialState}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          try {
            // Handle form submission logic here
            toast.success("Form submitted successfully!");
          } catch (error) {
            toast.error("Something went wrong");
          }
        }}
      >
        {({ setFieldValue, values, isSubmitting }) => (
          <Form>
            <div>
              <span className="text-lg font-medium text-merchant_sidebar_text">
                Manage Corporate Locations
              </span>
              <div className="grid grid-cols-1 gap-y-3 pt-[22px] md:grid-cols-[276px,1fr] md:gap-y-[45px] ">
                {/* Number of Locations */}
                <div className="flex items-center">
                  <span className="text-[15px] font-normal text-merchant_sidebar_text">
                    Number of Locations:
                  </span>
                </div>
                <div>
                  <Field
                    component={CustomInputFieldFormik}
                    type="number"
                    name="numberOfLocations"
                    value={values.numberOfLocations ?? ""}
                    inputPlaceholder="Number of Locations"
                    classNameContainer="xl:max-w-[360px] rounded-sm border-merchant_border"
                    classNameWrapper="md:pt-[5px] flex-grow"
                    className="!py-2 !text-[13px]"
                    min={0}
                  />
                </div>

                {/* Main Address */}
                <div className="flex items-center">
                  <span className="text-[15px] font-normal text-merchant_sidebar_text">
                    Address line 1:
                  </span>
                </div>
                <div>
                  <Field
                    component={CustomInputFieldFormik}
                    type="text"
                    name="addressLine1"
                    value={values.addressLine1 ?? ""}
                    inputPlaceholder="Address Line 1"
                    classNameContainer="xl:max-w-[360px] rounded-sm border-merchant_border"
                    classNameWrapper="md:pt-[5px] flex-grow"
                    className="!py-2 !text-[13px]"
                  />
                </div>
                <div className="flex items-center">
                  <span className="text-[15px] font-normal text-merchant_sidebar_text">
                    Address line 2:
                  </span>
                </div>
                <div>
                  <Field
                    component={CustomInputFieldFormik}
                    type="text"
                    name="addressLine2"
                    value={values.addressLine2 ?? ""}
                    inputPlaceholder="Address Line 2"
                    classNameContainer="xl:max-w-[360px] rounded-sm border-merchant_border"
                    classNameWrapper="md:pt-[5px] flex-grow"
                    className="!py-2 !text-[13px]"
                  />
                </div>
                <div className="flex items-center">
                  <span className="text-[15px] font-normal text-merchant_sidebar_text">
                    Postal/Area code:
                  </span>
                </div>
                <div>
                  <Field
                    component={CustomInputFieldFormik}
                    name="postalCode"
                    value={values.postalCode ?? ""}
                    inputPlaceholder="Postal/Area code"
                    classNameContainer="xl:max-w-[360px] rounded-sm border-merchant_border"
                    classNameWrapper="md:pt-[5px] flex-grow"
                    className="!py-2 !text-[13px]"
                  />
                </div>
                <div className="flex items-center">
                  <span className="text-[15px] font-normal text-merchant_sidebar_text">
                    City:
                  </span>
                </div>
                <div>
                  <Field
                    component={CustomInputFieldFormik}
                    type="text"
                    name="city"
                    inputPlaceholder="City"
                    value={values.city ?? ""}
                    classNameContainer="xl:max-w-[360px] rounded-sm border-merchant_border"
                    classNameWrapper="md:pt-[5px] flex-grow"
                    className="!py-2 !text-[13px]"
                  />
                </div>
                <div className="flex items-center">
                  <span className="text-[15px] font-normal text-merchant_sidebar_text">
                    Select Country:
                  </span>
                </div>
                <div>
                  <Select
                    value={values.country_id}
                    onValueChange={(value) => {
                      fetchStates(value);
                      setFieldValue("country_id", value);
                    }}
                  >
                    <SelectTrigger
                      classNameIcon="!text-black"
                      className="h-[unset] rounded-sm border-[1px] border-merchant_border !py-2 px-3 text-[13px] font-normal text-merchant_placeholder outline-none xl:max-w-[360px]"
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
                <div className="flex items-center">
                  <span className="text-[15px] font-normal text-merchant_sidebar_text">
                    Select state:
                  </span>
                </div>
                <div>
                  <Select
                    value={values.state_id}
                    onValueChange={(value) => {
                      setFieldValue("state_id", value);
                    }}
                  >
                    <SelectTrigger
                      classNameIcon="!text-black"
                      className="!h-[unset] rounded-sm border-[1px] border-merchant_border px-3 text-[13px] font-normal text-merchant_placeholder outline-none xl:max-w-[360px]"
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
                <div />
                {/* Save and Cancel Buttons */}
                <div className="flex items-center gap-[10px]">
                  <ButtonPrimary
                    label="Save Changes"
                    className="!h-[34px] rounded-sm px-[10px] py-2 !shadow-none"
                    classNameLabel="text-xs font-normal"
                    type="submit"
                    disabled={isSubmitting}
                  />
                  <button
                    onClick={() => router.push("/corporation/dashboard")}
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

export default ManageCorporateLocations;
