"use client";
import React, { useEffect, useState } from "react";
import CustomInputField from "@/components/common/customFormComponents/CustomInputField";
import ButtonPrimary from "@/components/common/ButtonPrimary";
import { useSession } from "next-auth/react";
import SendMessageAdmin from "@/components/common/adminSupport/SendMessageAdmin";
import { IAdminChatistoryData } from "@/api/common/types";
import RecieveMessageAdmin from "@/components/common/adminSupport/RecieveMessageAdmin";
import { useAppDispatch, useAppSelectorCommon } from "@/lib/Store/hooks";
import {
  addMessageToAdminSupportChatHistory,
  setAdminSupportChatHistoryData,
} from "@/lib/Store/slices/commonFeatures/adminSupportSlice";
import { sendMessageToAdmin } from "@/api/common/adminSupport";
import AutoScrollDiv from "@/components/common/AutoScrollDiv";
import {
  connectionWithSocketServer,
  sendMessage,
  socket,
  supportRoomJoin,
} from "@/socket";

const AdminSupportChat = ({
  data,
  support_id,
}: {
  data: IAdminChatistoryData[];
  support_id: string;
}) => {
  useEffect(() => {
    // revalidateChatHistoryApi();
    console.log("request_id", support_id);
    console.log("socket", socket?.connected);
    if (typeof support_id === "string") {
      if (socket && socket.connected) {
        supportRoomJoin(support_id);
      } else {
        connectionWithSocketServer(support_id);
        socket?.on("connect", () => supportRoomJoin(support_id));
      }
    }
  }, [socket]);

  const { data: session } = useSession();
  const dispatch = useAppDispatch();
  const [inputValue, setInputValue] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const user_id = session?.user.userDetails?.id || -1;

  const allSupportChat = useAppSelectorCommon((state) => state.adminSupport);

  useEffect(() => {
    dispatch(setAdminSupportChatHistoryData(data));
  }, [dispatch]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSendMessage = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    if (inputValue.trim() !== "") {
      const response = await sendMessageToAdmin({
        message: inputValue,
        support_id: support_id,
      });
      if (!response.error) {
        sendMessage({ ...response.data.data, supportId: support_id });
        dispatch(addMessageToAdminSupportChatHistory(response.data.data));
      }
      setInputValue("");
    }
    setIsSubmitting(false);
  };

  const handleKeyPress = (
    e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div>
      <div className="flex items-center gap-3">
        {100 && (
          <span className="text-lg font-semibold text-merchant_sidebar_text">
            {`#${100}`} - It Is A Long Established Fact That A
          </span>
        )}
        {/* <div
          className={`w-[121px] rounded-sm py-[7.5px] text-center text-[11px] font-normal ${status === "Closed" ? "bg-[#FD3939]/25 text-[#FD3939]" : "bg-[#6DE263]/25 text-[#6DE263]"}`}
        >
          {status}
        </div> */}
      </div>
      <div className="mt-6 max-w-[1188px] bg-merchant_header px-3 py-[30px] lg:px-5">
        <AutoScrollDiv
          className="mt-4 max-h-[53vh] scrollbar"
          dependency={[allSupportChat.supportChat]}
        >
          {allSupportChat && allSupportChat?.supportChat?.length > 0 ? (
            allSupportChat.supportChat.map((message) =>
              message.sender_id === user_id ? (
                <SendMessageAdmin key={message.id} message={message} />
              ) : (
                <RecieveMessageAdmin key={message.id} message={message} />
              ),
            )
          ) : (
            <div>No messages yet.</div>
          )}
        </AutoScrollDiv>

        <div className="relative pt-6 lg:pt-[54px]">
          <div className="sticky bottom-0 z-10">
            <CustomInputField
              value={inputValue}
              onChange={handleInputChange}
              inputPlaceholder="Write a meassge.."
              type="text"
              classNameContainer="rounded-md border-merchant_border bg-white"
              styleInput={{ resize: "none" }}
              classNameWrapper="pt-[5px]"
              className="!py-2"
              onKeyDown={handleKeyPress}
            />

            <ButtonPrimary
              label="Send"
              className="absolute right-2 top-[26px] -translate-y-1/2 transform rounded-sm !bg-merchant_text_color_blue !px-3 py-[6px] !shadow-none"
              classNameLabel="text-[13px] font-normal"
              onClick={handleSendMessage}
              disabled={inputValue.trim() === "" || isSubmitting}
            />
          </div>

          {/* <Paperclip className="absolute right-20 top-[79%] h-[18px] w-[18px] -translate-y-1/2 transform cursor-pointer" /> */}
        </div>
      </div>
    </div>
  );
};

export default AdminSupportChat;
