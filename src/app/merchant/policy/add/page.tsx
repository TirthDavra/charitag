import React from "react";
import Title from "@/components/merchant/Title";
import PolicyDescription from "@/components/merchant/Policy/addPolicy/PolicyDescription";
import PolicyName from "@/components/merchant/Policy/addPolicy/PolicyName";
import PolicyType from "@/components/merchant/Policy/addPolicy/PolicyType";
import Publish from "@/components/merchant/Policy/addPolicy/Publish";
import PolicyContextProvider from "@/components/merchant/store/PolicyContext";
import { initialPolicy } from "@/app/merchant/policy/add/initVal";

const AddPolicy = () => {
  return (
    <PolicyContextProvider initVal={initialPolicy}>
      <Title label="Policy" />
      <div className="py-4">
        <div className="grid grid-cols-1 gap-x-[30px] gap-y-3 md:grid-cols-[233px,1fr] md:gap-y-[50px]">
          <div>
            <div className="text-[18px] font-medium">Label</div>
            <p className="mt-4 text-[12px] text-gray-500">
              give your zone a name! E.g local, or worldwide
            </p>
          </div>
          <div className="md:pt-11">
            <PolicyName />
          </div>
          <div>
            <div className="text-[18px] font-medium">Type</div>
            <p className="mt-4 text-[12px] text-gray-500">
              List regions you&apos;d like to include in your shipping zone.
              customers will be matched against these regions
            </p>
          </div>
          <div className="max-w-[551px] flex-grow md:pt-11">
            <PolicyType />
          </div>
        </div>
        <div className="mt-[50px]">
          <div className="text-[18px] font-medium">Policy</div>
          <div className="mt-[10px] flex  items-center">
            <div className="flex-grow">
              <PolicyDescription />
            </div>
          </div>
        </div>
        <Publish />
      </div>
    </PolicyContextProvider>
  );
};

export default AddPolicy;
