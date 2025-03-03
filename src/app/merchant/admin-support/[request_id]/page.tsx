import { adminChatHistory } from "@/api/common/adminSupport";
import AdminSupportChat from "@/components/common/adminSupport/AdminSupportChat";
import Title from "@/components/merchant/Title";
import React from "react";

const page = async ({ params }: { params: { request_id: string } }) => {
  const chatHistoryData = await adminChatHistory(params.request_id);

  return (
    <div>
      <Title label="Support" />
      <AdminSupportChat
        data={chatHistoryData?.data?.data || []}
        support_id={params?.request_id || ""}
      />
    </div>
  );
};

export default page;
