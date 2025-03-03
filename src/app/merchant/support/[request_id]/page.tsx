import {
  getConsumerChatHistory,
  getOrderSupportDetails,
} from "@/api/merchant/merchantConsumerSupport";
import ManageConsmnerChat from "@/components/merchant/ConsumerSupport";
import Title from "@/components/merchant/Title";
import React from "react";

const page = async ({ params }: { params: { request_id: string } }) => {
  const chatHistory = await getConsumerChatHistory(params.request_id);

  const productData = await getOrderSupportDetails(params.request_id);

  return (
    <div>
      <Title label="Support" />
      <div>
        <ManageConsmnerChat
          data={chatHistory.data?.data || []}
          request_id={params?.request_id || ""}
          productDetails={productData.data}
        />
      </div>
    </div>
  );
};

export default page;
