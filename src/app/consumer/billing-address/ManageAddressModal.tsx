"use client";
import {
  debouncedGetCities,
  debouncedGetCountries,
  debouncedGetStates,
} from "@/api/common/common";
import { addAddress, updateAddress } from "@/api/consumer/checkout";
import { ISavedAddress } from "@/api/consumer/types";
import ButtonPrimary from "@/components/common/ButtonPrimary";
import Heading from "@/components/common/Heading";
import Combobox from "@/components/common/Combobox";
import CustomInputFieldFormik from "@/components/common/customFormComponents/CustomTextFieldFormik";
import { useModal } from "@/components/context/ModalContext";
import MultipleSelector, {
  MultipleSelectorRef,
  Option,
} from "@/components/ui/multiple-selector";
import { Switch } from "@/components/ui/switch";
import { faArrowLeft, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useRef, useState } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { useAppDispatch, useAppSelectorConsumer } from "@/lib/Store/hooks";
import {
  addallAddress,
  updateallAddress,
} from "@/lib/Store/slices/consumerFeatures/address/address";
import { Trash2 } from "lucide-react";
import ActionContent from "@/components/common/Modals/actionModal/ActionContent";

export interface ISaveAddressInternalState
  extends Omit<ISavedAddress, "user_id" | "id" | "state_id" | "country_id"> {
  id: number | null;
  country_id: Option | null;
  state_id: Option | null;
}

const ManageAddressModal = ({
  handleDelete,
  initVal,
  isAdd,
  id,
  allAddresses,
}: {
  handleDelete?: () => void;
  initVal?: ISaveAddressInternalState;
  isAdd: boolean;
  id?: number;
  allAddresses?: ISavedAddress[];
}) => {
  const [currentState, setCurrentState] = useState<0 | 1>(0); // 0 - unable edit | 2 - Edit
  const { closeModal, openModal } = useModal();

  const validationSchema = Yup.object().shape({
    first_name: Yup.string().required("First Name is required"),
    last_name: Yup.string().required("Last Name is required"),
    address: Yup.string().required("Address is required"),
    city: Yup.string().required("City is required"),
    country_id: Yup.object()
      .shape({
        value: Yup.string().required(),
        label: Yup.string().required(),
      })
      .nullable()
      .required("Country is required"),
    postal_code: Yup.string().required("Postal Code is required"),
    state_id: Yup.object()
      .shape({
        value: Yup.string().required(),
        label: Yup.string().required(),
      })
      .nullable()
      .required("State is required"),
    phone_number: Yup.string()
      .matches(/^\d+$/, "Phone number can only contain numbers")
      .min(4, "Minimum 4 digits required")
      .max(15, "Maximum 15 digits allowed")
      .required("Phone number is required"),
    title: Yup.string().required("Title is required"),
  });

  const dispatch = useAppDispatch();

  return (
    <div>
      <Formik
        initialValues={
          initVal
            ? initVal
            : {
                first_name: "",
                last_name: "",
                address: "",
                city: "",
                state_id: null,
                country_id: null,
                postal_code: "",
                phone_number: "",
                title: "",
                id: null,
              }
        }
        validationSchema={validationSchema}
        onSubmit={async (
          values: ISaveAddressInternalState,
          { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void },
        ) => {
          const countryValue = values.country_id?.value || null;
          const stateValue = values.state_id?.value || null;

          try {
            if (isAdd) {
              const response = await addAddress({
                ...values,
                country_id: Number(countryValue),
                state_id: Number(stateValue),
              });
              dispatch(addallAddress(response.data.data));
              toast.success(response.data.message);
            } else {
              const res = await updateAddress(id || 0, {
                ...values,
                country_id: Number(countryValue),
                state_id: Number(stateValue),
              });
              dispatch(
                updateallAddress({
                  id: values.id || 0,
                  updatedMethod: {
                    id: id || 0,
                    state: values.state,
                    country: values.country,
                    country_id: values.country_id?.value || "",
                    state_id: values.state_id?.value || "",
                    address: values.address,
                    postal_code: values.postal_code,
                    city: values.city,
                    phone_number: values.phone_number,
                    title: values.title,
                    first_name: values.first_name,
                    last_name: values.last_name,
                  },
                }),
              );
              toast.success("Address updated successfully");
            }
            closeModal();
          } catch (error) {
            toast.error("Operation failed");
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ values, setFieldValue, setFieldTouched }) => {
          return (
            <Form>
              <div className="flex w-full flex-col gap-5 rounded-xl px-10 py-10 ">
                <Heading
                  varient={"xl"}
                  content={isAdd ? "Add Address" : "Edit Address"}
                  className="text-center"
                />

                <div className="grid grid-cols-1 gap-4">
                  {!isAdd && (
                    <div className="flex justify-end gap-2 text-center">
                      <div>
                        <Trash2
                          type="button"
                          onClick={async () => {
                            openModal({
                              content: (
                                <ActionContent
                                  type="question"
                                  message="Are you sure you want to update this product? Once it's gone, all associated data will be updated."
                                  confirmLabel="Confirm"
                                  cancelLabel="Cancel"
                                  onCancel={closeModal}
                                  onOk={async () => {
                                    handleDelete && handleDelete();

                                    if (handleDelete) {
                                      toast.success(
                                        "Successfully updated the status",
                                      );
                                    } else {
                                      toast.error(
                                        "Failed to update the status. Please try again later!",
                                      );
                                    }
                                    closeModal();
                                  }}
                                />
                              ),
                            });
                          }}
                          className="cursor-pointer text-blue-600"
                        />
                      </div>
                      <div className="flex">
                        <Heading content="Edit" className="mr-1" />
                        <Switch
                          checked={currentState === 1}
                          onCheckedChange={() => {
                            setCurrentState((prevState) =>
                              prevState === 1 ? 0 : 1,
                            );
                          }}
                        />
                      </div>
                    </div>
                  )}
                  <Field
                    type="text"
                    name="title"
                    component={CustomInputFieldFormik}
                    placeholder="Ex: Home, Office, etc."
                    required
                    titleText="Title"
                    isDisabled={!isAdd && currentState === 0}
                    className={!isAdd && currentState === 0 ? "opacity-50" : ""}
                  />
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <Field
                      type="text"
                      name="first_name"
                      component={CustomInputFieldFormik}
                      placeholder="First Name"
                      required
                      isDisabled={!isAdd && currentState === 0}
                      className={
                        !isAdd && currentState === 0 ? "opacity-50" : ""
                      }
                    />
                    <Field
                      type="text"
                      name="last_name"
                      component={CustomInputFieldFormik}
                      placeholder="Last Name"
                      required
                      isDisabled={!isAdd && currentState === 0}
                      className={
                        !isAdd && currentState === 0 ? "opacity-50" : ""
                      }
                    />
                  </div>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <Field
                      type="text"
                      name="address"
                      component={CustomInputFieldFormik}
                      placeholder="Address"
                      required
                      isDisabled={!isAdd && currentState === 0}
                      className={
                        !isAdd && currentState === 0 ? "opacity-50" : ""
                      }
                    />
                    <Field
                      type="text"
                      name="phone_number"
                      component={CustomInputFieldFormik}
                      placeholder="Phone number"
                      required
                      isDisabled={!isAdd && currentState === 0}
                      className={
                        !isAdd && currentState === 0 ? "opacity-50" : ""
                      }
                    />
                  </div>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                      <Combobox
                        value={initVal?.country_id || null}
                        onSearch={async (value) => {
                          if (value.length < 3) return [];
                          const filteredOptions =
                            await debouncedGetCountries(value);
                          return filteredOptions;
                        }}
                        triggerSearchOnFocus
                        placeholder={"Search and Select Country..."}
                        searchPlaceholder="Search and Select Country..."
                        onChange={(values) => {
                          if (values !== null) {
                            setFieldValue("country_id", values);
                            setFieldValue("state_id", null);
                          }
                        }}
                        className={`border-borders_color ${!isAdd && currentState === 0 ? "opacity-50" : ""}py-4 h-14 text-base`}
                        disabled={!isAdd && currentState === 0}
                        emptyIndicator={<div>No country found</div>}
                        loadingIndicator={<div>Loading...</div>}
                      />
                      <div className="text-sm text-red-500">
                        <ErrorMessage name="country_id" />
                      </div>
                    </div>
                    <div>
                      <Combobox
                        value={initVal?.state_id}
                        onSearch={async (value) => {
                          if (value.length < 3) return [];
                          const filteredOptions = await debouncedGetStates({
                            search: value,
                            country_id: values?.country_id
                              ? values.country_id.value
                              : null,
                          });
                          return filteredOptions;
                        }}
                        placeholder={"Search and select state..."}
                        searchPlaceholder="Search and select state..."
                        onChange={(values) => {
                          setFieldValue("state_id", values);
                        }}
                        className={`border-borders_color ${!isAdd && currentState === 0 ? "opacity-50" : ""}  h-14 py-4 !text-base`}
                        disabled={!isAdd && currentState === 0}
                        emptyIndicator={<div>No state found</div>}
                      />
                      <div className="text-sm text-red-500">
                        <ErrorMessage name="state_id" />
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <Field
                      type="text"
                      name="city"
                      component={CustomInputFieldFormik}
                      placeholder="Enter City"
                      required
                      isDisabled={!isAdd && currentState === 0}
                      className={
                        !isAdd && currentState === 0 ? "opacity-50" : ""
                      }
                    />
                    <Field
                      type="text"
                      name="postal_code"
                      component={CustomInputFieldFormik}
                      placeholder="Postal Code"
                      required
                      isDisabled={!isAdd && currentState === 0}
                      className={
                        !isAdd && currentState === 0 ? "opacity-50" : ""
                      }
                    />
                  </div>
                </div>
                <div className="flex items-center gap-[10px]">
                  <ButtonPrimary
                    label="Save Changes"
                    className="!h-[34px] rounded-sm px-[10px] py-2 !shadow-none"
                    classNameLabel="text-xs font-normal"
                    type="submit"
                  />
                  <button
                    className="!h-[34px] rounded border border-solid border-merchant_border bg-buttonGradient px-[13px] py-2 text-xs font-medium text-merchant_text_color_blue"
                    type="reset"
                    onClick={closeModal}
                  >
                    cancel
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

export default ManageAddressModal;
