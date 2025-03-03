"use client";
import React, { useEffect, useRef, useState } from "react";
import RecieveMessage from "./RecieveMessage";
import SendMessage from "./SendMessage";
import CustomInputField from "@/components/common/customFormComponents/CustomInputField";
import { IGetSupportMessages } from "@/api/charity/types";
import ButtonPrimary from "@/components/common/ButtonPrimary";
import { useSession } from "next-auth/react";
import { addNewSupportMessage } from "@/api/charity/charitysupportCounts";
import { sendMessage, socket, supportRoomJoin, userIsTyping } from "@/socket";
import { useAppDispatch, useAppSelectorCharity } from "@/lib/Store/hooks";
import {
  addMessageToCharityChatHistory,
  setCharityChatHistoryData,
} from "@/lib/Store/slices/charityFeatures/charitySupport/chairtySupportSlice";

const ManageSupportChat = ({
  request_id,
  data,
  status,
  revalidateChatHistoryApi,
}: {
  request_id: string;
  data: IGetSupportMessages[];
  status: string;
  revalidateChatHistoryApi: () => Promise<void>;
}) => {
  useEffect(() => {
    revalidateChatHistoryApi();
    console.log("request_id", request_id);
    console.log("socket", socket?.connected);
    if (typeof request_id === "string") {
      if (socket && socket.connected) {
        supportRoomJoin(request_id);
      } else {
        socket?.on("connect", () => supportRoomJoin(request_id));
      }
    }
  }, [socket]);
  const { data: session } = useSession();
  const user_id = session?.user.userDetails?.id || 0;
  // const [newData, setNewData] = useState<IGetSupportMessages[]>(data);
  const allChatData = useAppSelectorCharity((state) => state.chatHistory);
  const [inputValue, setInputValue] = useState("");
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const timer = useRef<NodeJS.Timeout | null>(null);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);

    if (timer.current === null) {
      userIsTyping({
        admin_support_id: request_id,
        userName:
          session?.user.userDetails?.first_name +
          " " +
          session?.user.userDetails?.last_name,
      });
      timer.current = setTimeout(() => {
        timer.current = null;
      }, 5000);
    }

    // Set a new interval to call userIsTyping every 5 seconds
    // typingIntervalRef.current = setInterval(() => {
    //   userIsTyping({
    //     admin_support_id: request_id,
    //     userName:
    //       session?.user.userDetails?.first_name +
    //       " " +
    //       session?.user.userDetails?.last_name,
    //   });
    // }, 5000); // Interval in milliseconds (5000ms = 5 seconds)
  };

  const handleKeyPress = (
    e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };
  useEffect(() => {
    dispatch(setCharityChatHistoryData(data));
  }, []);

  const handleSendMessage = async () => {
    if (inputValue.trim() !== "") {
      timer.current && clearInterval(timer.current);
      timer.current = null;
      const respones = await addNewSupportMessage({
        data: { message: inputValue, support_id: request_id },
      });
      if (!respones.error) {
        // sendMessageToAdmin(respones.data.data);
        // sendMessage(respones.data.data);
        dispatch(addMessageToCharityChatHistory(respones.data.data));
        // setNewData([
        //   ...newData,
        //   {
        //     ...respones.data.data,
        //     sender:
        //       session?.user.userDetails?.first_name +
        //       " " +
        //       session?.user.userDetails?.last_name,
        //     received_id: 1,
        //   },
        // ]);
      }
      setInputValue("");
    }
  };

  const scrollToBottom = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop =
        scrollContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [allChatData.chatHistory]);

  return (
    <div>
      <div className="flex items-center gap-3">
        {request_id && (
          <span className="text-lg font-semibold text-merchant_sidebar_text">
            {`#${request_id}`} - It Is A Long Established Fact That A
          </span>
        )}
        <div
          className={`w-[121px] rounded-sm py-[7.5px] text-center text-[11px] font-normal ${status === "Closed" ? "bg-[#FD3939]/25 text-[#FD3939]" : "bg-[#6DE263]/25 text-[#6DE263]"}`}
        >
          {status}
        </div>
      </div>
      <div className="mt-6 max-w-[1188px]  bg-merchant_header px-3 py-[30px] lg:px-5">
        <div
          className="thin_scrollbar max-h-[500px] overflow-y-scroll"
          ref={scrollContainerRef}
        >
          {allChatData.chatHistory && allChatData.chatHistory.length > 0 ? (
            allChatData.chatHistory.map((message) =>
              message.sender_id === user_id ? (
                <SendMessage
                  key={message.id}
                  message={{
                    ...message,
                  }}
                />
              ) : (
                <RecieveMessage
                  key={message.id}
                  message={{
                    ...message,
                  }}
                />
              ),
            )
          ) : (
            <div>No messages yet.</div>
          )}
        </div>

        <div className="relative pt-6 lg:pt-[54px]">
          {allChatData.userTyping && (
            <div className="flex items-center">
              <span className="text-sm font-medium text-gray-700 mr-1">
                {allChatData.userTyping}
              </span>
              <div className="flex space-x-1">
                <div className="animate-flow h-2 w-2 rounded-full bg-blue-500"></div>
                <div className="animate-flow h-2 w-2 rounded-full bg-blue-500 delay-150"></div>
                <div className="animate-flow h-2 w-2 rounded-full bg-blue-500 delay-300"></div>
              </div>
            </div>
          )}

          {/* {allChatData.userTyping && <span>{allChatData.userTyping}....</span>} */}
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
            />
          </div>

          {/* <Paperclip className="absolute right-20 top-[79%] h-[18px] w-[18px] -translate-y-1/2 transform cursor-pointer" /> */}
        </div>
      </div>
    </div>
  );
};

export default ManageSupportChat;
