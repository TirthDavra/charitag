"use client";
import CustomInputFieldFormik from "@/components/common/customFormComponents/CustomTextFieldFormik";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Field, Form, Formik } from "formik";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React, { useContext } from "react";
import Help from "@/components/common/Help";
import CustomInputField from "@/components/common/customFormComponents/CustomInputField";
import { ProductContext } from "../../store/ProductContext";

const Shipping = () => {
  const { productDetails, setProductDetails } = useContext(ProductContext);
  return (
    <div className="pl-[15px]">
      <div className="border-b-[1px] border-merchant_border pb-[32px] ">
        <div className="py-[13px] pr-[15px] md:py-0 md:pr-0">
          <div className="items-center gap-x-[45px] xl:grid xl:grid-cols-4">
            <div className="col-span-1">
              <span className="text-[14px] text-merchant_text">
                Weight (kg)
              </span>
            </div>
            <div className="col-span-3 flex max-w-[427px] items-center ">
              <CustomInputField
                value={productDetails.shipping.weight}
                className="!py-[3px]"
                classNameContainer="border-merchant_border rounded-sm"
                classNameWrapper="flex-grow"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  if (/^\d*\.?\d{0,3}$/.test(e.target.value))
                    setProductDetails((prev) => {
                      return {
                        ...prev,
                        shipping: {
                          ...productDetails.shipping,
                          weight: e.target.value,
                        },
                      };
                    });
                }}
              />
              <Help className="ml-2" />
            </div>
          </div>
          <div className="items-center gap-x-[45px] pt-[15px]  xl:grid xl:grid-cols-4">
            <div className="col-span-1">
              <span className="text-[14px] text-merchant_text">
                Dimensions (Cm)
              </span>
            </div>
            <div className="col-span-3 flex max-w-[427px] items-center">
              <div className="flex gap-[19px]">
                <div>
                  <CustomInputField
                    value={productDetails.shipping.length}
                    className="!py-[3px]"
                    classNameContainer="border-merchant_border rounded-sm"
                    classNameWrapper="flex-grow"
                    inputPlaceholder="Length"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      if (/^\d*\.?\d{0,2}$/.test(e.target.value))
                        setProductDetails((prev) => {
                          return {
                            ...prev,
                            shipping: {
                              ...productDetails.shipping,
                              length: e.target.value,
                            },
                          };
                        });
                    }}
                  />
                </div>
                <div>
                  <CustomInputField
                    value={productDetails.shipping.width}
                    className="!py-[3px]"
                    classNameContainer="border-merchant_border rounded-sm"
                    classNameWrapper="flex-grow"
                    inputPlaceholder="Width"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      if (/^\d*\.?\d{0,2}$/.test(e.target.value))
                        setProductDetails((prev) => {
                          return {
                            ...prev,
                            shipping: {
                              ...productDetails.shipping,
                              width: e.target.value,
                            },
                          };
                        });
                    }}
                  />
                </div>
                <div>
                  <CustomInputField
                    value={productDetails.shipping.height}
                    className="!py-[3px]"
                    classNameContainer="border-merchant_border rounded-sm"
                    classNameWrapper="flex-grow"
                    inputPlaceholder="Height"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      if (/^\d*\.?\d{0,2}$/.test(e.target.value))
                        setProductDetails((prev) => {
                          return {
                            ...prev,
                            shipping: {
                              ...productDetails.shipping,
                              height: e.target.value,
                            },
                          };
                        });
                    }}
                  />
                </div>
              </div>
              <Help className="ml-2" />
            </div>
          </div>
        </div>
      </div>
      {/* <div className="border-b-[1px] border-merchant_border pt-[32px]" /> */}
      <div className="items-center gap-x-[45px] pt-[32px] xl:grid xl:grid-cols-4">
        <div className="col-span-1">
          <span className="text-[14px] text-merchant_text">Shipping Class</span>
        </div>
        <div className="col-span-3 flex max-w-[427px] items-center">
          {/* <select
                    name="shippingClass"
                    className="flex-grow rounded-sm border-merchant_border !py-[3px]"
                    onChange={() =>
                      setFieldValue("shippingClass", values.shippingClass)
                    }
                  >
                    <option value="">No Shipping Class</option>
                  </select> */}
          <Select
            onValueChange={(value) =>
              setProductDetails((prev) => {
                return {
                  ...prev,
                  shipping: {
                    ...productDetails.shipping,
                    shipping_class: value,
                  },
                };
              })
            }
            defaultValue={productDetails.shipping.shipping_class}
          >
            <SelectTrigger
              classNameIcon="!text-black font-bold"
              className="text-merchant_select h-[34px] rounded-sm  border-[1px] border-merchant_border text-[13px] font-normal text-merchant_gray outline-none"
            >
              <SelectValue placeholder="No Shipping Class" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="slow" className="text-merchant_gray">
                Slow
              </SelectItem>
              <SelectItem value="medium" className="text-merchant_gray">
                Medium
              </SelectItem>
              <SelectItem value="fast" className="text-merchant_gray">
                Fast
              </SelectItem>
            </SelectContent>
          </Select>
          <Help className="ml-2" />
        </div>
      </div>
    </div>
  );
};

export default Shipping;
