"use client";
import React, { useEffect, useState } from "react";
import CustomInputFieldFormik from "@/components/common/customFormComponents/CustomTextFieldFormik";
import CustomTable from "../../Custom/Tables/CustomTable";
import { ShippingZoneColumnDef } from "./ShippingZoneColumnDef";
import ButtonPrimary from "@/components/common/ButtonPrimary";
import ShippingTable from "./ShippingTable";
import {
  addShippingZone,
  updateShippingZone,
} from "@/api/merchant/merchantShipping";
import { toast } from "react-toastify";
import { useRouter, useSearchParams } from "next/navigation";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { validationSchemaForShiping } from "../../ValidationForMerchant";
import Link from "next/link";
import MultipleSelector, { Option } from "@/components/ui/multiple-selector";

interface IShippingZone {
  name: string;
  regions: string;
  is_shipping_free_shipping: number;
  is_shipping_flat_rate: number;
}

export interface IShippingMethod {
  title: string;
  enabled: number;
  fieldName: string;
  description: string;
}

interface IAddOrEditProps {
  initialState: IShippingZone;
}

const AddOrEdit = ({ initialState }: IAddOrEditProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("zoneId");

  const data: IShippingMethod[] = [
    {
      title: "Free Shipping",
      enabled: initialState.is_shipping_free_shipping,
      fieldName: "is_shipping_free_shipping",
      description:
        "Free shipping is a special method which can be triggered with coupons and minimum spends.",
    },
    {
      title: "Flat Rate",
      enabled: initialState.is_shipping_flat_rate,
      fieldName: "is_shipping_flat_rate",
      description: "Let's you charge a fixed rate for shipping.",
    },
  ];

  return (
    <div className="mt-[25px]">
      <Formik
        initialValues={initialState}
        validationSchema={validationSchemaForShiping}
        onSubmit={async (values: IShippingZone) => {
          if (id) {
            const response = await updateShippingZone({ data: values, id: id });
            if (response.error) {
              const message = response.data.message;
              if (typeof message === "object" && message !== null) {
                const errorMessage = Object.values<string>(message);
                toast.error(errorMessage[0].toString());
              } else {
                toast.error(message);
              }
            } else {
              toast.success(response.data.message);
              router.push("/merchant/shipping");
              router.refresh();
            }
          } else {
            const response = await addShippingZone(values);
            if (response.error) {
              const message = response.data.message;
              if (typeof message === "object" && message !== null) {
                const errorMessage = Object.values<string>(message);
                toast.error(errorMessage[0].toString());
              } else {
                toast.error(message);
              }
            } else {
              toast.success(response.data.message);
              router.push("/merchant/shipping");
              router.refresh();
            }
          }
        }}
      >
        {({ values, setFieldValue, isSubmitting }) => (
          <Form>
            <div>
              <span className="text-lg font-medium text-merchant_sidebar_text">
                Zone Name
              </span>
              <div className="grid-cols-5 gap-x-10 pt-[10px] xl:grid">
                <div className="col-span-1">
                  <span className="text-xs  text-merchant_placeholder">
                    Give your zone a name! E.g. local, or worldwide.
                  </span>
                </div>
                <div className="col-span-4">
                  <Field
                    name="name"
                    type="text"
                    component={CustomInputFieldFormik}
                    value={values.name}
                    inputPlaceholder="Zone Name"
                    classNameWrapper="max-w-[550px]"
                    className="!py-2 text-xs"
                    classNameContainer="border-merchant_border rounded-sm"
                  />
                </div>
              </div>
            </div>
            <div className="mt-[50px]">
              <span className="text-lg font-medium text-merchant_sidebar_text">
                Zone Region
              </span>
              <div className="grid-cols-5 gap-x-10 pt-[10px] xl:grid">
                <div className="col-span-1">
                  <span className="text-xs text-merchant_placeholder">
                    List regions you’d like to include in your shipping zone.
                    Customers will be matched against these regions.
                  </span>
                </div>
                {/* <div className="col-span-4 max-w-[550px]">
                  <MultipleSelector
                    options={[]}
                    value={values.regions}
                    triggerSearchOnFocus
                    delay={300}
                    placeholder={"Zone Region"}
                    onChange={(value) => setFieldValue("regions", value)}
                    loadingIndicator={
                      <p className="py-2 text-center text-sm leading-10 text-muted-foreground">
                        loading...
                      </p>
                    }
                    emptyIndicator={
                      <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                        No results
                      </p>
                    }
                  />
                  <div className="-mt-[10px] text-sm text-red-600">
                    <ErrorMessage name="regions" />
                  </div>
                </div> */}
                <div className="col-span-4">
                  <Field
                    name="regions"
                    type="text"
                    component={CustomInputFieldFormik}
                    value={values.regions}
                    inputPlaceholder="Zone Region"
                    classNameWrapper="max-w-[550px]"
                    className="!py-2 text-xs"
                    classNameContainer="border-merchant_border rounded-sm"
                  />
                </div>
              </div>
            </div>
            <div className="mt-[50px] grid-cols-5 gap-x-10 xl:grid">
              <div className="flex flex-col">
                <div>
                  <span className="text-lg font-medium text-merchant_sidebar_text">
                    Shipping Methods
                  </span>
                </div>
                <div className="pt-[10px]">
                  <div className="col-span-1 ">
                    <span className="text-xs text-merchant_placeholder">
                      Add the shipping methods you’d like to make available to
                      customers in this zone.
                    </span>
                  </div>
                </div>
              </div>
              <div className="col-span-4">
                <ShippingTable
                  columns={ShippingZoneColumnDef}
                  data={data}
                  className="!mt-0"
                  tableHeaders={false}
                  handleShippingMethodChange={(methodValues) => {
                    setFieldValue(
                      "is_shipping_free_shipping",
                      methodValues.is_shipping_free_shipping ? 1 : 0,
                    );
                    setFieldValue(
                      "is_shipping_flat_rate",
                      methodValues.is_shipping_flat_rate ? 1 : 0,
                    );
                  }}
                />
                <ErrorMessage name="is_shipping_free_shipping" />
                <ErrorMessage name="is_shipping_flat_rate" />
                <div className="flex items-center gap-[10px] pt-[30px]">
                  <ButtonPrimary
                    label="Save Changes"
                    className="!h-[34px] rounded-sm px-[10px] py-2 !shadow-none"
                    classNameLabel="text-xs font-normal"
                    type="submit"
                    disabled={isSubmitting}
                  />
                  <button
                    onClick={() => router.push("/merchant/dashboard")}
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

export default AddOrEdit;
