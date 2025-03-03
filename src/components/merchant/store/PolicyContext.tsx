"use client";
import { IPolicy, initialPolicy } from "@/app/merchant/policy/add/initVal";
import React, { createContext, useState } from "react";

interface PolicyContextValue {
  policyDetails: IPolicy; // Assuming Product is the type of initialProduct
  setPolicyDetails: React.Dispatch<React.SetStateAction<IPolicy>>;
}

export const PolicyContext = createContext<PolicyContextValue>({
  policyDetails: initialPolicy,
  setPolicyDetails: () => {},
});

const PolicyContextProvider = ({
  children,
  initVal,
}: {
  children: React.ReactNode;
  initVal: IPolicy;
}) => {
  const [policyDetails, setPolicyDetails] = useState<IPolicy>(initVal);

  return (
    <PolicyContext.Provider
      value={{
        policyDetails,
        setPolicyDetails,
      }}
    >
      {children}
    </PolicyContext.Provider>
  );
};

export default PolicyContextProvider;
