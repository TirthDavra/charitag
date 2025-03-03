import { getSupportMessages } from "@/api/charity/charitysupportCounts";
import ManageSupportChat from "@/components/charity/Support";
import Title from "@/components/merchant/Title";
import React from "react";

const page = async (context: {
  params: { request_id: string };
  searchParams: { status: string };
}) => {
  const response = await getSupportMessages(context.params.request_id);

  console.log("first response", response.data);

  return (
    <div>
      <Title label="Support" />
      <div className="py-4">
        <ManageSupportChat
          request_id={context.params.request_id}
          data={response.data}
          status={context.searchParams.status}
        />
      </div>
    </div>
  );
};

export default page;
