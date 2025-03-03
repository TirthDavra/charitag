"use client";
import React, { useState } from "react";
import ButtonPrimary from "@/components/common/ButtonPrimary";
import Help from "@/components/common/Help";
import RadioButton from "../Custom/RadioButton";
import { Switch } from "@/components/ui/switch";
import SelectCategories from "../Custom/SelectCategories";
import CheckBox from "../Custom/CheckBox";
import CustomInputField from "@/components/common/customFormComponents/CustomInputField";
import { addDuty } from "@/api/merchant/merchantSettings";
import { toast } from "react-toastify";
import { IDuty } from "@/api/merchant/types";
import { useRouter } from "next/navigation";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  duty_based_on: Yup.string().required("Select one option"),
  shipping_duty_class: Yup.string().required(
    "Select one shipping duties class",
  ),
  duty_classes: Yup.string().required("Add ddditional duties dlasses"),
  duty_display_shop: Yup.string().required("Select display prices in shop"),
  duty_display_cart: Yup.string().required("Select display prices in cart"),
  duty_total_display: Yup.string().required(
    "Select display duties totals in cart",
  ),
});

const DutiesForm = ({ initialState }: { initialState: IDuty }) => {
  const router = useRouter();

  // const handleSwitchChange = () => {
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     automated_duty: prevData.automated_duty === 1 ? 2 : 1,
  //   }));
  // };

  // const handleRadioButtonChange = (value: number) => {
  //   setFormData((prevFormData) => ({
  //     ...prevFormData,
  //     price_with_duty: value,
  //   }));
  // };

  // const handleCheckBoxChange = () => {
  //   setFormData((prevFormData) => ({
  //     ...prevFormData,
  //     duty_round_at_subtotal: prevFormData.duty_round_at_subtotal === 1 ? 2 : 1,
  //   }));
  // };

  // const handleDutiesClassesChange = (e: { target: { value: any } }) => {
  //   const value = e.target.value;
  //   setFormData((prevFormData) => ({
  //     ...prevFormData,
  //     duty_classes: value,
  //   }));
  // };

  // const handleSelectChange = (fieldName: string, selectedValue: string) => {
  //   setFormData((prevFormData) => ({
  //     ...prevFormData,
  //     [fieldName]: selectedValue,
  //   }));
  // };

  const handleSaveChanges = async (values: IDuty) => {
    const response = await addDuty(values);
    if (response.error) {
      toast.error(response.data.message);
    } else {
      toast.success(response.data.message);
      router.refresh();
    }
  };

  return (
    <div>
      <span className="text-lg text-merchant_sidebar_text">Inventory</span>
      <Formik
        initialValues={initialState}
        validationSchema={validationSchema}
        onSubmit={handleSaveChanges}
      >
        {({ values, setFieldValue }) => (
          <Form>
            <div className="grid grid-cols-1 gap-y-3 pt-[22px] md:grid-cols-[300px,1fr] md:gap-y-[45px]">
              <div className="">
                <span className="text-sm text-merchant_sidebar_text">
                  Automated Duties
                </span>
              </div>
              <div className="flex items-center gap-[10px]">
                <Help />
                <Switch
                  checked={values.automated_duty === 1}
                  onCheckedChange={(checked) =>
                    setFieldValue("automated_duty", checked ? 1 : 2)
                  }
                />
              </div>
              <div className="">
                <span className="text-sm text-merchant_sidebar_text">
                  Price Entered With Duties
                </span>
              </div>
              <div className="flex  gap-[10px]">
                <Help />

                <div className="flex flex-col gap-y-[10px]">
                  <Field
                    name="price_with_duty"
                    component={RadioButton}
                    value={1}
                    label="Yes, I Will Enter Prices Inclusive Of Duties"
                    checked={values.price_with_duty === 1}
                    onChange={() => setFieldValue("price_with_duty", 1)}
                    classNameContainer="min-h-5 min-w-5"
                    classNameLabel="text-merchant_sidebar_text text-sm"
                  />
                  <Field
                    name="price_with_duty"
                    component={RadioButton}
                    value={2}
                    label="No, I Will Enter Prices Exclusive Of Duties"
                    checked={values.price_with_duty === 2}
                    onChange={() => setFieldValue("price_with_duty", 2)}
                    classNameContainer="min-h-5 min-w-5"
                    classNameLabel="text-merchant_sidebar_text text-sm"
                  />
                </div>
              </div>
              <div className="flex items-center">
                <span className="text-sm text-merchant_sidebar_text">
                  Calculate Duties Based On
                </span>
              </div>
              <div className="flex items-center gap-[10px]">
                <div>
                  <Help />
                </div>
                <div className="max-w-[544px] flex-grow">
                  <SelectCategories
                    all={false}
                    value={values.duty_based_on}
                    placeholder="Customer Shipping Address"
                    productCategories={[
                      { name: "Customer Shipping Address", id: 1 },
                      { name: "Customer Billing Address", id: 2 },
                      { name: "Shop Base Address", id: 3 },
                    ]}
                    handleSelectChange={(selectedValue) =>
                      setFieldValue("duty_based_on", selectedValue)
                    }
                  />
                  <div className="text-sm text-red-600">
                    <ErrorMessage name="duty_based_on" />
                  </div>
                </div>
              </div>

              <div className="flex items-center">
                <span className="text-sm text-merchant_sidebar_text">
                  Select Shipping Duties Class
                </span>
              </div>
              <div className="flex items-center gap-[10px]">
                <Help />
                <div className="max-w-[544px] flex-grow">
                  <SelectCategories
                    all={false}
                    value={values.shipping_duty_class}
                    placeholder="Select Shipping Duty Class Based On Cart Items"
                    productCategories={[
                      {
                        name: "Shipping Duty Class Based On Cart Items",
                        id: 1,
                      },
                      { name: "Standard", id: 2 },
                      { name: "Reduced Rate", id: 3 },
                      { name: "Zero Rate", id: 4 },
                    ]}
                    handleSelectChange={(selectedValue) =>
                      setFieldValue("shipping_duty_class", selectedValue)
                    }
                  />
                  <div className="text-sm text-red-600">
                    <ErrorMessage name="shipping_duty_class" />
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                <span className="text-sm text-merchant_sidebar_text">
                  Rounding
                </span>
              </div>
              <div className="pl-[25px]">
                <Field
                  name="duty_round_at_subtotal"
                  component={CheckBox}
                  label="Round Duties At Subtotal Level, Instead Of Rounding Per Line"
                  checked={values.duty_round_at_subtotal === 1}
                  onChange={(checked: boolean) =>
                    setFieldValue("duty_round_at_subtotal", checked ? 1 : 2)
                  }
                  classNameCheckbox="!h-5 !w-5"
                />
              </div>
              <div className="md:pt-2">
                <span className="text-sm text-merchant_sidebar_text">
                  Additional Duties Classes
                </span>
              </div>
              <div className="flex gap-[10px]">
                <div className="!pt-2">
                  <Help />
                </div>
                <div className="max-w-[544px] flex-grow">
                  <CustomInputField
                    inputPlaceholder="Reduce Rate Zero Rate"
                    className="!py-2"
                    value={values.duty_classes}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setFieldValue("duty_classes", e.target.value)
                    }
                    textArea={true}
                    classNameContainer="h-[141px] !w-full rounded-sm border-merchant_border"
                    textAreaRows={5}
                    styleInput={{ resize: "none" }}
                    classNameWrapper="pt-[5px] md:pt-0"
                    textPlaceholder=""
                  />
                  <div className="text-sm text-red-600">
                    <ErrorMessage name="duty_classes" />
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                <span className="text-sm text-merchant_sidebar_text">
                  Display Prices In Shop
                </span>
              </div>
              <div className="pl-[25px]">
                <div className="max-w-[544px]">
                  <SelectCategories
                    all={false}
                    value={values.duty_display_shop}
                    placeholder="Excluding Duties"
                    productCategories={[
                      { name: "Including Duty", id: 1 },
                      { name: "Excluding Duty", id: 2 },
                    ]}
                    handleSelectChange={(selectedValue) =>
                      setFieldValue("duty_display_shop", selectedValue)
                    }
                  />
                  <div className="text-sm text-red-600">
                    <ErrorMessage name="duty_display_shop" />
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                <span className="text-sm text-merchant_sidebar_text">
                  Display Prices During Cart And Checkout
                </span>
              </div>
              <div className="pl-[25px]">
                <div className="max-w-[544px]">
                  <SelectCategories
                    all={false}
                    value={values.duty_display_cart}
                    placeholder="Excluding Duties"
                    productCategories={[
                      { name: "Including Duty", id: 1 },
                      { name: "Excluding Duty", id: 2 },
                    ]}
                    handleSelectChange={(selectedValue) =>
                      setFieldValue("duty_display_cart", selectedValue)
                    }
                  />
                  <div className="text-sm text-red-600">
                    <ErrorMessage name="duty_display_cart" />
                  </div>
                </div>
              </div>
              <div className="pt-1">
                <span className="text-sm text-merchant_sidebar_text">
                  {" "}
                  Display Duties Totals
                </span>
              </div>
              <div className="pl-[25px]">
                <div className="max-w-[544px]">
                  <SelectCategories
                    all={false}
                    value={values.duty_total_display}
                    placeholder="Itemized"
                    productCategories={[
                      { name: "As a Single Total", id: 1 },
                      { name: "Itemized", id: 2 },
                    ]}
                    handleSelectChange={(selectedValue) =>
                      setFieldValue("duty_total_display", selectedValue)
                    }
                  />
                  <div className="text-sm text-red-600">
                    <ErrorMessage name="duty_total_display" />
                  </div>
                </div>
                <div className="flex items-center gap-[10px] pt-[30px]">
                  <ButtonPrimary
                    label="Save Changes"
                    className="!h-[34px] rounded-sm px-[10px] py-2 !shadow-none"
                    classNameLabel="text-xs font-normal"
                    type="submit"
                  />
                  <button className="!h-[34px] rounded-sm border border-solid border-merchant_border bg-buttonGradient px-[13px] py-2 text-xs font-medium text-merchant_text_color_blue">
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

export default DutiesForm;
