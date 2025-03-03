"use client";
import React, { useContext, useEffect, useState } from "react";
import { PolicyContext } from "../../store/PolicyContext";
import CustomInputField from "@/components/common/customFormComponents/CustomInputField";

const PolicyName = () => {
  const { policyDetails, setPolicyDetails } = useContext(PolicyContext);

  return (
    // <input
    //   placeholder="Label Name"
    //   className="h-fit rounded-sm border border-merchant_blue/15 p-1 font-light"
    //   style={{ width: 50 + "%" }}
    //   value={policyDetails.name}
    //   onChange={(e) => {
    //     setPolicyDetails((prev) => {
    //       return {
    //         ...prev,
    //         name: e.target.value,
    //       };
    //     });
    //   }}
    // />
    <CustomInputField
      onChange={(e: { target: { value: string } }) => {
        setPolicyDetails((prev) => {
          return {
            ...prev,
            name: e.target.value,
          };
        });
      }}
      value={policyDetails.name}
      inputPlaceholder="Label Name"
      className="!py-2"
      classNameContainer="max-w-[551px] rounded-sm border-merchant_border"
      styleInput={{ resize: "none" }}
      classNameWrapper="pt-[5px] md:pt-0 flex-grow"
      textPlaceholder="!text-[13px]"
    />
  );
};

export default PolicyName;
