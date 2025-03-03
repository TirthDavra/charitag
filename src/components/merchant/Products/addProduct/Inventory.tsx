"use client";
import CustomInputFieldFormik from "@/components/common/customFormComponents/CustomTextFieldFormik";
import {
  faCheck,
  faCircleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useContext } from "react";
import { inventorySchema } from "./ValidationSchema";
import Help from "@/components/common/Help";
import CheckBox from "../../Custom/CheckBox";
import RadioButton from "../../Custom/RadioButton";
import CustomInputField from "@/components/common/customFormComponents/CustomInputField";
import { ProductContext } from "../../store/ProductContext";
import { steps } from "framer-motion";

const Inventory = () => {
  const { productDetails, setProductDetails } = useContext(ProductContext);
  return (
    <div className="py-[13px] pl-5 pr-[15px] md:py-0 md:pr-0">
      <div>
        <div className="items-center gap-x-[45px] xl:grid xl:grid-cols-4">
          <div className="col-span-1">
            <span className="text-[14px] text-merchant_text">SKU</span>
          </div>
          <div className="col-span-3 flex max-w-[427px] items-center ">
            <CustomInputField
              // type="number"
              className="!py-[3px]"
              classNameContainer="border-merchant_border rounded-sm"
              classNameWrapper="flex-grow"
              value={productDetails.inventory.sku}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setProductDetails((prev) => {
                  return {
                    ...prev,
                    inventory: {
                      ...productDetails.inventory,
                      sku: e.target.value,
                    },
                  };
                });
              }}
            />

            <Help className="ml-2" />
          </div>
        </div>
        <div className="gap-x-[45px] pt-[15px] xl:grid xl:grid-cols-4">
          <div className="col-span-1">
            <span className="text-[14px] text-merchant_text">
              Stock Management
            </span>
          </div>
          <div className="col-span-3 flex items-center gap-[10px]">
            <CheckBox
              label="Track Stock Quantity For This Product"
              classNameCheckbox="text=[#303136] !h-[20px] !w-[20px] !pl-[2px]"
              value={productDetails.inventory.is_stock_management === 1}
              onChange={() => {
                setProductDetails((prev) => {
                  return {
                    ...prev,
                    inventory: {
                      ...productDetails.inventory,
                      is_stock_management:
                        productDetails.inventory.is_stock_management === 1
                          ? 0
                          : 1,
                    },
                  };
                });
              }}
            />
          </div>
        </div>
        {productDetails.inventory.is_stock_management === 1 && (
          <>
            <div className="gap-x-[45px] pt-[15px] xl:grid  xl:grid-cols-4">
              <div className="col-span-1 flex items-center">
                <span className="text-[14px] text-merchant_text">
                  Quantaity
                </span>
              </div>
              <div className="col-span-3 flex max-w-[427px] items-center ">
                {/* <Field
                          component={CustomInputFieldFormik}
                          name="quantaity"
                          type="number"
                          className="!py-[3px]"
                          classNameContainer="border-merchant_border rounded-sm"
                          classNameWrapper="flex-grow"
                        /> */}
                <CustomInputField
                  value={productDetails.inventory.stock_quantity}
                  // type="number"
                  className="!py-[3px]"
                  classNameContainer="border-merchant_border rounded-sm"
                  classNameWrapper="flex-grow"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    if (/^[0-9]*$/.test(e.target.value)) {
                      setProductDetails((prev) => {
                        return {
                          ...prev,
                          inventory: {
                            ...productDetails.inventory,
                            stock_quantity: e.target.value,
                          },
                        };
                      });
                    }
                  }}
                />
                <Help className="ml-2" />
              </div>
            </div>
            {/* <div className="gap-x-[45px] pt-[15px] xl:grid xl:grid-cols-4">
              <div className="col-span-1">
                <span className="text-[14px] text-merchant_text">
                  Allow Backorders?
                </span>
              </div>
              <div className="col-span-3">
                <div>
                  <RadioButton
                    name="allowBackorders"
                    checked={productDetails.inventory.backorders_status === 1}
                    onChange={() =>
                      setProductDetails((prev) => {
                        return {
                          ...prev,
                          inventory: {
                            ...productDetails.inventory,
                            backorders_status: 1,
                          },
                        };
                      })
                    }
                    label="Do Not Allow"
                    value="1"
                  />
                </div>
                <div className="pt-[15px]">
                  <RadioButton
                    name="allowBackorders"
                    checked={productDetails.inventory.backorders_status === 2}
                    onChange={() =>
                      setProductDetails((prev) => {
                        return {
                          ...prev,
                          inventory: {
                            ...productDetails.inventory,
                            backorders_status: 2,
                          },
                        };
                      })
                    }
                    label="Allow, But Notify Customer"
                    value="2"
                  />
                </div>
                <div className="pt-[15px]">
                  <RadioButton
                    name="allowBackorders"
                    checked={productDetails.inventory.backorders_status === 3}
                    onChange={() =>
                      setProductDetails((prev) => {
                        return {
                          ...prev,
                          inventory: {
                            ...productDetails.inventory,
                            backorders_status: 3,
                          },
                        };
                      })
                    }
                    label="Allow"
                    value="3"
                  />
                </div>
              </div>
            </div> */}
            <div className="gap-x-[45px] pt-[15px] xl:grid  xl:grid-cols-4">
              <div className="col-span-1 flex items-center">
                <span className="text-[14px]  text-merchant_text">
                  Low Stock Threshold
                </span>
              </div>
              <div className="col-span-3 flex max-w-[427px] items-center ">
                <CustomInputField
                  value={Number(productDetails.inventory.low_stock_threshold).toFixed(0)}
                  // type="number"
                  className="!py-[3px]"
                  classNameContainer="border-merchant_border rounded-sm"
                  classNameWrapper="flex-grow"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    if (/^[0-9]*$/.test(e.target.value)) {
                      setProductDetails((prev) => {
                        return {
                          ...prev,
                          inventory: {
                            ...productDetails.inventory,
                            low_stock_threshold: e.target.value,
                          },
                        };
                      });
                    }
                  }}
                />

                <Help className="ml-2" />
              </div>
            </div>
          </>
        )}
        {productDetails.inventory.is_stock_management === 0 && (
          <div className="gap-x-[45px] pt-[15px] xl:grid xl:grid-cols-4">
            <div className="col-span-1">
              <span className="text-[14px] text-merchant_text">
                Stock Status
              </span>
            </div>
            <div className="col-span-3">
              <div>
                <RadioButton
                  name="stockStatus"
                  checked={productDetails.inventory.stock_status === 1}
                  onChange={() =>
                    setProductDetails((prev) => {
                      return {
                        ...prev,
                        inventory: {
                          ...productDetails.inventory,
                          stock_status: 1,
                        },
                      };
                    })
                  }
                  label="In Stock"
                  value="1"
                  classNameLabel="text-[#303136] text-sm font-normal leading-5 !pl-[2px]"
                />
              </div>
              <div className="pt-[15px]">
                <RadioButton
                  name="stockStatus"
                  checked={productDetails.inventory.stock_status === 2}
                  onChange={() =>
                    setProductDetails((prev) => {
                      return {
                        ...prev,
                        inventory: {
                          ...productDetails.inventory,
                          stock_status: 2,
                        },
                      };
                    })
                  }
                  label="Out Of Stock"
                  value="2"
                  classNameLabel="text-[#303136] text-sm font-normal leading-5 !pl-[2px]"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Inventory;
