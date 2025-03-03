import { getSupportMessages } from "@/api/charity/charitysupportCounts";
import { adminChatHistory } from "@/api/common/adminSupport";
import ManageSupportChat from "@/components/charity/Support";
import AdminSupportChat from "@/components/common/adminSupport/AdminSupportChat";
import Title from "@/components/merchant/Title";
import { revalidateTag } from "next/cache";
import React from "react";

const page = async (context: {
  params: { request_id: string };
  searchParams: { status: string };
}) => {
  // const response = await getSupportMessages(context.params.request_id);
  // const revalidateChatHistoryApi = async () => {
  //   "use server";
  //   revalidateTag("chat-support-charity");
  // };

  const chatHistoryData = await adminChatHistory(context.params.request_id);

  return (
    <div>
      <Title label="Support" />
      <div className="py-4">
        {/* <ManageSupportChat
          request_id={context.params.request_id}
          data={response.data}
          status={context.searchParams.status}
          revalidateChatHistoryApi={revalidateChatHistoryApi}
        /> */}
        <AdminSupportChat
          data={chatHistoryData?.data?.data || []}
          support_id={context.params.request_id || ""}
        />
      </div>
    </div>
  );
};

export default page;
