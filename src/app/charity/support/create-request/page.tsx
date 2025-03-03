import CreateNewRequest from "@/components/charity/Support/CreateNewRequest";
import Title from "@/components/merchant/Title";
import React from "react";

const page = () => {
  return (
    <div>
      <Title label="Create Request" />
      <div className="py-4">
        <div className="text-[18px] font-[500] text-merchant_sidebar_text">
          Create Request
        </div>
        <CreateNewRequest />
      </div>
    </div>
  );
};

export default page;
