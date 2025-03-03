import Title from "@/components/merchant/Title";
import PolicyDescription from "@/components/merchant/Policy/addPolicy/PolicyDescription";
import PolicyName from "@/components/merchant/Policy/addPolicy/PolicyName";
import PolicyType from "@/components/merchant/Policy/addPolicy/PolicyType";
import React, { useEffect, useState } from "react";
import PublishEdit from "@/components/merchant/Policy/addPolicy/PublishEdit";
import { getPolicyApi } from "@/api/merchant/merchantPolicy";
import PolicyContextProvider from "@/components/merchant/store/PolicyContext";

interface SinglePolicyPageProps {
  params: {
    policyId: number;
  };
}

const SinglepolicyPage: React.FC<SinglePolicyPageProps> = async ({
  params,
}) => {
  const { policyId } = params;

  const response = await getPolicyApi(policyId);
  return (
    <PolicyContextProvider
      initVal={{
        description: response.data.data.description,
        name: response.data.data.name,
        policies_type: response.data.data.policy_type.toString(),
        status: response.data.data.status,
      }}
    >
      <Title label="Policy" />
      <div className="py-4">
        <div className="grid grid-cols-1 gap-x-[30px] gap-y-3 md:grid-cols-[233px,1fr] md:gap-y-[45px]">
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
            <p className="mt-2 text-[12px] text-gray-500">
              List regions you&apos;d like to include in your shipping zone.
              customers will be matched against these regions
            </p>
          </div>
          <div className="max-w-[551px] flex-grow md:pt-11">
            <PolicyType />
          </div>
        </div>
        <div className="mt-4">
          <div className="text-[18px] font-medium">Policy</div>
          <div className="mt-[10px] flex  items-center">
            <div className="flex-grow">
              <PolicyDescription />
            </div>
          </div>
        </div>
        <PublishEdit policyId={policyId} />
      </div>
    </PolicyContextProvider>
  );
};

export default SinglepolicyPage;
