"use client";
import { getStatesByCountryId } from "@/api/common/common";
import { ICountries, IStatesById } from "@/api/common/types";
import ButtonPrimary from "@/components/common/ButtonPrimary";
import CustomInputFieldFormik from "@/components/common/customFormComponents/CustomTextFieldFormik";
import SelectCategories from "@/components/merchant/Custom/SelectCategories";

import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { validationForCharityLocation } from "./ValidationSchemaForCharity";
import { useRouter } from "next/navigation";
import CharityLcationstable from "./CharityLcationstable";
import { ICharityAddresses } from "@/api/charity/types";
import { useAppDispatch, useAppSelectorCharity } from "@/lib/Store/hooks";
import {
  addCharityLocation,
  editCharityLocation,
  setCharityLocationsById,
  setStep,
} from "@/lib/Store/slices/charityFeatures/charityProfile/charityInfoSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Combobox from "@/components/common/Combobox";
import { Option } from "@/components/ui/multiple-selector";
import { addOrUpdateCharityAddress } from "@/api/charity/charityProfile";

export interface IMainCharityLocation {
  address: string;
  address2: string;
  city: string;
  postal_code: string;
  country_id: Option | null;
  state_id: Option | null;
}

interface ManageCharityLocationsProps {
  initialState: IMainCharityLocation;
  locationData: ICharityAddresses[];
  allCountries: ICountries[];
}

const ManageCharityLocations = ({
  initialState,
  locationData,
  allCountries,
}: ManageCharityLocationsProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useAppDispatch();

  const allLocationsInfo = useAppSelectorCharity(
    (state) => state.charityInfo.charityLocations,
  );

  const manageLocations = allLocationsInfo.managaeState;

  const allCountriesRef = useRef(
    allCountries?.map((item) => ({
      label: item.name,
      value: item.id.toString(),
    })),
  );

  const [states, setStates] = useState<Option[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    (async () => {
      if (allLocationsInfo.step === 2 && manageLocations.country_id !== null) {
        const response = await getStatesByCountryId(
          manageLocations.country_id.value,
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
  }, [manageLocations]);

  return (
    <div className="max-w-[900px]">
      <div className="flex justify-between">
        <div className="text-lg font-medium text-merchant_sidebar_text">
          View Locations
        </div>
        <div>
          {allLocationsInfo.step === 1 && (
            <ButtonPrimary
              label="Add new"
              className="!h-[34px] rounded-sm px-[10px] py-2 !shadow-none"
              classNameLabel="text-xs font-normal"
              type="button"
              onClick={() => {
                dispatch(setStep(2));
              }}
            />
          )}
          {allLocationsInfo.step === 2 && (
            <div
              className="w-fit cursor-pointer rounded-xl p-1 px-2 text-links_color transition-transform duration-300 ease-in-out hover:scale-[1.1]"
              onClick={() => {
                dispatch(setStep(1));
                dispatch(setCharityLocationsById(initialState));
              }}
            >
              <FontAwesomeIcon className="pr-2" icon={faArrowLeft} />
              Back
            </div>
          )}
        </div>
      </div>
      <div className=" pb-5">
        {allLocationsInfo.step === 1 && (
          <CharityLcationstable data={locationData} />
        )}
      </div>
      {allLocationsInfo.step === 2 && (
        <Formik
          initialValues={manageLocations}
          enableReinitialize
          validationSchema={validationForCharityLocation}
          onSubmit={async (values) => {
            setIsSubmitting(true);

            try {
              if (allLocationsInfo.managaeState.id) {
                const response = await addOrUpdateCharityAddress({
                  data: {
                    ...values,
                    state_id: Number(values.state_id?.value),
                    country_id: Number(values.country_id?.value),
                    address2: values.address2,
                    address: values.address,
                    city: values.city,
                    postal_code: values.postal_code,
                  },
                  id: allLocationsInfo.managaeState.id,
                });
                if (!response.error) {
                  toast.success(response.data.message);
                  dispatch(
                    editCharityLocation({
                      id: allLocationsInfo.managaeState.id,
                      updatedMethod: response.data.data,
                    }),
                  );
                  dispatch(setStep(1));
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
                const response = await addOrUpdateCharityAddress({
                  data: {
                    ...values,
                    state_id: Number(values.state_id?.value),
                    country_id: Number(values.country_id?.value),
                    address2: values.address2,
                    address: values.address,
                    city: values.city,
                    postal_code: values.postal_code,
                  },
                });
                if (!response.error) {
                  toast.success(response.data.message);
                  dispatch(addCharityLocation(response.data.data));
                  dispatch(setStep(1));
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
              }
            } catch (error) {
              toast.error("Something went wrong");
            } finally {
              setIsSubmitting(false);
            }
          }}
        >
          {({ setFieldValue, values, setFieldTouched }) => {
            return (
              <Form>
                <div>
                  <div>
                    <div className="grid grid-cols-1  gap-y-3 pt-[22px] md:grid-cols-[217px,1fr] md:gap-y-[45px] ">
                      <div className="flex items-center">
                        <span className="text-[15px] font-normal text-merchant_sidebar_text">
                          Address Line 1:
                        </span>
                      </div>
                      <div>
                        <Field
                          component={CustomInputFieldFormik}
                          type="text"
                          name="address"
                          inputPlaceholder="Adress Line 1"
                          value={values.address}
                          classNameContainer="xl:max-w-[360px] rounded-sm border-merchant_border"
                          styleInput={{ resize: "none" }}
                          classNameWrapper="md:pt-[5px] flex-grow"
                          className="!py-2 !text-[13px]"
                        />
                      </div>
                      <div className="flex items-center">
                        <span className="text-[15px] font-normal text-merchant_sidebar_text">
                          Address Line 2:
                        </span>
                      </div>
                      <div>
                        <Field
                          component={CustomInputFieldFormik}
                          type="text"
                          name="address2"
                          inputPlaceholder="Adress Line 2"
                          value={values.address2}
                          classNameContainer="xl:max-w-[360px] rounded-sm border-merchant_border"
                          styleInput={{ resize: "none" }}
                          classNameWrapper="flex-grow"
                          className="!py-2 !text-[13px]"
                        />
                      </div>
                      <div className="flex items-center">
                        <span className="text-[15px] font-normal text-merchant_sidebar_text">
                          Select City:
                        </span>
                      </div>
                      <div>
                        <Field
                          component={CustomInputFieldFormik}
                          name="city"
                          inputPlaceholder="City"
                          value={values.city ?? ""}
                          classNameContainer="xl:max-w-[360px] rounded-sm border-merchant_border"
                          styleInput={{ resize: "none" }}
                          classNameWrapper="md:pt-[5px] flex-grow"
                          className="!py-2 !text-[13px]"
                        />
                      </div>
                      <div className="flex items-center">
                        <span className="text-[15px] font-normal text-merchant_sidebar_text">
                          Enter Postal Code:
                        </span>
                      </div>

                      <div>
                        <Field
                          component={CustomInputFieldFormik}
                          name="postal_code"
                          inputPlaceholder="Postal Code"
                          value={values.postal_code ?? ""}
                          classNameContainer="xl:max-w-[360px] rounded-sm border-merchant_border"
                          styleInput={{ resize: "none" }}
                          classNameWrapper="md:pt-[5px] flex-grow"
                          className="!py-2 !text-[13px]"
                        />
                      </div>
                      <div className="flex items-center">
                        <span className="text-[15px] font-normal text-merchant_sidebar_text">
                          Select Country:
                        </span>
                      </div>

                      <div className="xl:max-w-[360px]">
                        <Combobox
                          defaultOptions={allCountriesRef.current}
                          value={values?.country_id || null}
                          onSearch={async (value) => {
                            return new Promise((resolve) => {
                              setTimeout(() => {
                                const res = allCountriesRef.current.filter(
                                  (option) =>
                                    option.label
                                      .toLowerCase()
                                      .includes(value.toLowerCase()),
                                );
                                resolve(res);
                              }, 1000);
                            });
                          }}
                          triggerSearchOnFocus={true}
                          placeholder={"Search and Select Country..."}
                          searchPlaceholder="Search and Select Country..."
                          onChange={async (values) => {
                            setIsLoading(true);
                            setFieldValue("country_id", values);
                            setTimeout(() =>
                              setFieldTouched("country_id", true),
                            );
                            setFieldValue("state_id", null);

                            let states: Option[] = [];
                            if (values !== null) {
                              const stateResponse = await getStatesByCountryId(
                                values.value,
                              );
                              if (!stateResponse.error) {
                                states = stateResponse.data.data.map(
                                  (item) => ({
                                    label: item.name,
                                    value: item.id.toString(),
                                  }),
                                );
                              }
                            }
                            setStates(states);
                            setIsLoading(false);
                          }}
                          className={`rounded-sm !border-merchant_border !text-[13px]  ${values.country_id ? "py-3" : "py-4"}`}
                          emptyIndicator={<div>No country found</div>}
                          loadingIndicator={<div>Loading...</div>}
                        />
                        <div className="text-sm text-red-600">
                          <ErrorMessage name="country_id" />
                        </div>
                      </div>
                      <div className="flex items-center">
                        <span className="text-[15px] font-normal text-merchant_sidebar_text">
                          Select state:
                        </span>
                      </div>

                      <div className="xl:max-w-[360px]">
                        <div>
                          <Combobox
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
                            placeholder={
                              values.country_id === null
                                ? "Please select a country first"
                                : isLoading
                                  ? "Loading..."
                                  : states.length === 0
                                    ? "No states available for this country"
                                    : "Search and select state..."
                            }
                            searchPlaceholder="Search and select state..."
                            onChange={(values) => {
                              setFieldValue("state_id", values);
                              // setTimeout(() =>
                              //   setFieldTouched("state_id", true),
                              // );
                            }}
                            disabled={
                              values.country_id === null
                                ? true
                                : states.length === 0
                                  ? true
                                  : false
                            }
                            className={`rounded-sm !border-merchant_border !text-[13px]  ${values.state_id ? "py-3" : "py-4"}`}
                            emptyIndicator={<div>No state found</div>}
                          />
                        </div>
                        <div className="text-sm text-red-600">
                          <ErrorMessage name="state_id" />
                        </div>
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
                          onClick={() => {
                            dispatch(setStep(1));
                            // router.push("/charity/dashboard");
                          }}
                          type="reset"
                          className="!h-[34px] rounded border border-solid border-merchant_border bg-buttonGradient px-[13px] py-2 text-xs font-medium text-merchant_text_color_blue"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </Form>
            );
          }}
        </Formik>
      )}
    </div>
  );
};

export default ManageCharityLocations;
