"use client";
import React, { useContext, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PolicyContext } from "../../store/PolicyContext";
import { PolicyTypes } from "../../constants";

const PolicyType = () => {
  const { policyDetails, setPolicyDetails } = useContext(PolicyContext);
  return (
    <div className="h-fit">
      <Select
        onValueChange={(id) => {
          setPolicyDetails((prev) => {
            return {
              ...prev,
              policies_type: id,
            };
          });
        }}
        value={policyDetails.policies_type}
      >
        <SelectTrigger className="rounded-sm border-merchant_border text-[13px] font-normal text-merchant_gray outline-none">
          <SelectValue placeholder="Policy Types" />
        </SelectTrigger>
        <SelectContent>
          {PolicyTypes.map((policy) => {
            return (
              <SelectItem
                className="text-merchant_gray"
                key={policy.value}
                value={policy.value}
              >
                {policy.label}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  );
};

export default PolicyType;
