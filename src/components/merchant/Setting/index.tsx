"use client";
import Help from "@/components/common/Help";
import { Switch } from "@/components/ui/switch";
import RadioButton from "../Custom/RadioButton";
import SelectCategories from "../Custom/SelectCategories";
import CheckBox from "../Custom/CheckBox";
import CustomInputField from "@/components/common/customFormComponents/CustomInputField";
import ButtonPrimary from "@/components/common/ButtonPrimary";
import { useState } from "react";
import { addTax } from "@/api/merchant/merchantSettings";
import { toast } from "react-toastify";
import { ITax } from "@/api/merchant/types";
import { useRouter } from "next/navigation";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  tax_based_on: Yup.string().required("Select one option"),
  shipping_tax_class: Yup.string().required("Select one shipping tax class"),
  tax_classes: Yup.string().required("Add additional tax classes"),
  tax_display_shop: Yup.string().required("Select display prices in shop"),
  tax_display_cart: Yup.string().required("Select display prices in cart"),
  tax_total_display: Yup.string().required("Select display duties totals"),
});

const TaxForm = ({ initialState }: { initialState: ITax }) => {
  const router = useRouter();

  // const handleSwitchChange = () => {
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     automated_tax: prevData.automated_tax === 1 ? 2 : 1,
  //   }));
  // };

  // const handleRadioButtonChange = (value: number) => {
  //   setFormData((prevFormData) => ({
  //     ...prevFormData,
  //     price_with_tax: value,
  //   }));
  // };

  // const handleCheckBoxChange = () => {
  //   setFormData((prevFormData) => ({
  //     ...prevFormData,
  //     tax_round_at_subtotal: prevFormData.tax_round_at_subtotal === 1 ? 2 : 1,
  //   }));
  // };

  // const handleTaxClassesChange = (e: { target: { value: any } }) => {
  //   const value = e.target.value;
  //   setFormData((prevFormData) => ({
  //     ...prevFormData,
  //     tax_classes: value,
  //   }));
  // };

  // const handleSelectChange = (fieldName: string, selectedValue: string) => {
  //   setFormData((prevFormData) => {
  //     return {
  //       ...prevFormData,
  //       [fieldName]: selectedValue,
  //     };
  //   });
  // };

  const handleSaveChanges = async (values: ITax) => {
    const response = await addTax(values);
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
                  Automated Taxes
                </span>
              </div>
              <div className=" flex items-center gap-[10px]">
                <Help />
                <Switch
                  checked={values.automated_tax === 1}
                  onCheckedChange={(checked) =>
                    setFieldValue("automated_tax", checked ? 1 : 2)
                  }
                />
              </div>

              <div className="">
                <span className="text-sm text-merchant_sidebar_text">
                  Price Entered With Tax
                </span>
              </div>
              <div className=" flex  gap-[10px]">
                <Help />

                <div className="">
                  <div className="flex flex-col gap-y-[10px]">
                    <Field
                      name="price_with_tax"
                      component={RadioButton}
                      value={1}
                      label="Yes, I Will Enter Prices Inclusive Of Tax"
                      checked={values.price_with_tax === 1}
                      onChange={() => setFieldValue("price_with_tax", 1)}
                      classNameContainer="min-h-5 min-w-5"
                      classNameLabel="text-merchant_sidebar_text text-sm"
                    />
                    <Field
                      name="price_with_tax"
                      component={RadioButton}
                      value={2}
                      label="No, I Will Enter Prices Exclusive Of Tax"
                      checked={values.price_with_tax === 2}
                      onChange={() => setFieldValue("price_with_tax", 2)}
                      classNameContainer="min-h-5 min-w-5"
                      classNameLabel="text-merchant_sidebar_text text-sm"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center">
                <span className="text-sm text-merchant_sidebar_text">
                  Calculate Tax Based On
                </span>
              </div>
              <div className=" flex items-center gap-[10px]">
                <Help />
                <div className="max-w-[544px] flex-grow">
                  <SelectCategories
                    all={false}
                    value={values.tax_based_on}
                    placeholder="Customer Shipping Address"
                    productCategories={[
                      { name: "Customer Shipping Address", id: 1 },
                      { name: "Customer Billing Address", id: 2 },
                      { name: "Shop Base Address", id: 3 },
                    ]}
                    handleSelectChange={(selectedValue) =>
                      setFieldValue("tax_based_on", selectedValue)
                    }
                  />
                  <div className="text-sm text-red-600">
                    <ErrorMessage name="tax_based_on" />
                  </div>
                </div>
              </div>

              <div className="flex items-center">
                <span className="text-sm text-merchant_sidebar_text">
                  Select Shipping Tax Class
                </span>
              </div>
              <div className=" flex items-center gap-[10px]">
                <Help />
                <div className="max-w-[544px] flex-grow">
                  <SelectCategories
                    all={false}
                    value={values.shipping_tax_class}
                    placeholder="Select Shipping Tax Class Based On Cart Items"
                    productCategories={[
                      { name: "Shipping Tax Class Based On Cart Items", id: 1 },
                      { name: "Standard", id: 2 },
                      { name: "Reduced Rate", id: 3 },
                      { name: "Zero Rate", id: 4 },
                    ]}
                    handleSelectChange={(selectedValue) =>
                      setFieldValue("shipping_tax_class", selectedValue)
                    }
                  />
                  <div className="text-sm text-red-600">
                    <ErrorMessage name="shipping_tax_class" />
                  </div>
                </div>
              </div>

              <div className="">
                <span className="text-sm text-merchant_sidebar_text">
                  Rounding
                </span>
              </div>
              <div className=" pl-[25px]">
                <Field
                  name="duty_round_at_subtotal"
                  component={CheckBox}
                  label="Round Duties At Subtotal Level, Instead Of Rounding Per Line"
                  checked={values.tax_round_at_subtotal === 1}
                  onChange={(checked: boolean) =>
                    setFieldValue("tax_round_at_subtotal", checked ? 1 : 2)
                  }
                  classNameCheckbox="!h-5 !w-5"
                />
              </div>

              <div className="!pt-2">
                <span className="text-sm text-merchant_sidebar_text">
                  Additional Tax Classes
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
                    value={values.tax_classes}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setFieldValue("tax_classes", e.target.value)
                    }
                    textArea={true}
                    classNameContainer="h-[141px] !w-full rounded-sm border-merchant_border"
                    textAreaRows={6}
                    styleInput={{ resize: "none" }}
                    classNameWrapper="pt-[5px] md:pt-0"
                  />
                  <div className="text-sm text-red-600">
                    <ErrorMessage name="tax_classes" />
                  </div>
                </div>
              </div>

              <div className="flex items-center">
                <span className="text-sm text-merchant_sidebar_text">
                  Display Prices In Shop
                </span>
              </div>
              <div className=" pl-[25px]">
                <div className="max-w-[544px]">
                  <SelectCategories
                    all={false}
                    value={values.tax_display_shop}
                    placeholder="Excluding Tax"
                    productCategories={[
                      { name: "Including Tax", id: 1 },
                      { name: "Excluding Tax", id: 2 },
                    ]}
                    handleSelectChange={(selectedValue) =>
                      setFieldValue("tax_display_shop", selectedValue)
                    }
                  />
                  <div className="text-sm text-red-600">
                    <ErrorMessage name="tax_display_shop" />
                  </div>
                </div>
              </div>

              <div className="flex items-center">
                <span className="text-sm text-merchant_sidebar_text">
                  Display Prices During Cart And Checkout
                </span>
              </div>
              <div className=" pl-[25px]">
                <div className="max-w-[544px]">
                  <SelectCategories
                    all={false}
                    value={values.tax_display_cart}
                    placeholder="Excluding Tax"
                    productCategories={[
                      { name: "Including Tax", id: 1 },
                      { name: "Excluding Tax", id: 2 },
                    ]}
                    handleSelectChange={(selectedValue) =>
                      setFieldValue("tax_display_cart", selectedValue)
                    }
                  />
                  <div className="text-sm text-red-600">
                    <ErrorMessage name="tax_display_cart" />
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <span className="text-sm text-merchant_sidebar_text">
                  {" "}
                  Display Tax Totals
                </span>
              </div>
              <div className=" pl-[25px]">
                <div className="max-w-[544px]">
                  <SelectCategories
                    all={false}
                    value={values.tax_total_display}
                    placeholder="Itemized"
                    productCategories={[
                      { name: "As a Single Total", id: 1 },
                      { name: "Itemized", id: 2 },
                    ]}
                    handleSelectChange={(selectedValue) =>
                      setFieldValue("tax_total_display", selectedValue)
                    }
                  />
                  <div className="text-sm text-red-600">
                    <ErrorMessage name="tax_total_display" />
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

export default TaxForm;
