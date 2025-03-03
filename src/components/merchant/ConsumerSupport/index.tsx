"use client";
import {
  IConsumerChatistoryData,
  IGetOrderSupportDetailsData,
} from "@/api/merchant/types";
import {
  useAppDispatch,
  useAppSelectorCommon,
  useAppSelectorMerchant,
} from "@/lib/Store/hooks";
import {
  addMessageToStoreSupportChatHistory,
  setStoreSupportChatHistoryData,
} from "@/lib/Store/slices/merchantFeatures/merchantStoreSupport/merchantStoreSupportSlice";
import { useSession } from "next-auth/react";
import React, { useEffect, useRef, useState } from "react";
import MerchantSendMessage from "./MerchantSendMessage";
import MerchantRecevieMessage from "./MerchantRecevieMessage";
import CustomInputField from "@/components/common/customFormComponents/CustomInputField";
import ButtonPrimary from "@/components/common/ButtonPrimary";
import {
  addNewSupportMessageForConsumer,
  supportMarkAsResolved,
} from "@/api/merchant/merchantConsumerSupport";
import {
  sendMessageToCM,
  sendMessageToConsumer,
  socket,
  supportRoomJoinCM,
} from "@/socket";
import Image from "next/image";
import defaultImg from "@images/No-Data-Found.jpg";

import { useModal } from "@/components/context/ModalContext";
import ActionContent from "@/components/common/Modals/actionModal/ActionContent";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import {
  addMessageToCMSupportChatHistory,
  setCMSupportChatHistoryData,
} from "@/lib/Store/slices/commonFeatures/merchantConsumerSupportChatSlice";

const ManageConsmnerChat = ({
  data,
  request_id,
  productDetails,
}: {
  data: IConsumerChatistoryData[];
  request_id: string;
  productDetails: IGetOrderSupportDetailsData;
}) => {
  useEffect(() => {
    console.log("request_id", request_id);
    console.log("socket", socket?.connected);
    if (typeof request_id === "string") {
      if (socket && socket.connected) {
        supportRoomJoinCM(request_id);
      } else {
        socket?.on("connect", () => supportRoomJoinCM(request_id));
      }
    }
  }, [socket]);

  const [inputValue, setInputValue] = useState("");
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const { data: session } = useSession();
  const { openModal, closeModal } = useModal();
  const router = useRouter();
  const user_id = session?.user.userDetails?.id || -1;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleKeyPress = (
    e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const allChatData = useAppSelectorCommon((state) => state.cmSupport);

  useEffect(() => {
    dispatch(setCMSupportChatHistoryData(data));
  }, []);

  const handleSendMessage = async () => {
    if (inputValue.trim() !== "") {
      const response = await addNewSupportMessageForConsumer({
        message: inputValue,
        support_id: request_id,
      });
      if (!response.error) {
        sendMessageToCM({
          ...response.data.data,
          cmSupportId: request_id,
        });
        dispatch(addMessageToCMSupportChatHistory(response.data.data));
        setInputValue("");
      }
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
  }, [allChatData.supportChat]);

  return (
    <div>
      <div className="flex items-center gap-3 pt-4">
        {request_id && (
          <span className="text-lg font-semibold text-merchant_sidebar_text">
            {`#${request_id}`} - It Is A Long Established Fact That A
          </span>
        )}
        <div
          className={`w-[121px] rounded-sm py-[7.5px] text-center text-[11px] font-normal ${productDetails?.status === "Closed" ? "bg-[#FD3939]/25 text-[#FD3939]" : "bg-[#6DE263]/25 text-[#6DE263]"}`}
        >
          {productDetails?.status}
        </div>
      </div>
      <div className="flex items-center">
        <div className="my-[30px] flex gap-[25px]">
          <div className="max-h-[150px] max-w-[100px]">
            <Image
              src={
                productDetails?.product?.feature_image?.path
                  ? process.env.NEXT_PUBLIC_APP_IMAGE_API_ENDPOINT +
                    productDetails.product?.feature_image?.path
                  : defaultImg
              }
              alt={productDetails?.title || ""}
              className="rounded-lg object-cover"
              width={100}
              height={100}
            />
          </div>
          <div>
            <h3 className="text-lg font-bold">
              {productDetails?.product?.product_name || ""}
            </h3>
            <div className="py-2">
              <p>{productDetails?.description}</p>
              <p className="text-base text-consumer_order_text">
                By {productDetails?.product?.merchant_name || "Test"}
              </p>
              {/* <div className="flex gap-2 py-[15px] text-consumer_order_text">
                <p> {product.color}</p>
                <p>Size: {product.size}</p>
              </div> */}
            </div>

            <div className="flex gap-2">
              {productDetails?.status === "Open" && (
                <ButtonPrimary
                  className={`rounded-full px-4 py-[5px] !font-normal`}
                  label={
                    productDetails?.status === "Open" ? "Mark as resolved" : ""
                  }
                  onClick={async () => {
                    openModal({
                      content: (
                        <ActionContent
                          type="info"
                          message="Are you sure you want to mark this issue as resolved?"
                          confirmLabel="Confirm"
                          cancelLabel="Cancel"
                          onCancel={closeModal}
                          onOk={async () => {
                            const response = await supportMarkAsResolved(
                              request_id ?? "",
                            );
                            if (!response.error) {
                              toast.success(
                                "Issue marked as resolved successfully.",
                              );
                              router.refresh();
                            } else {
                              toast.error("Issue marked as resolved failed.");
                            }
                            closeModal();
                          }}
                        />
                      ),
                    });
                  }}
                />
              )}
              <button className="rounded-full border border-blue-500 px-4 py-[5px] font-normal text-blue-500">
                {`Ticket ${request_id}`}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 max-w-[1188px]  bg-merchant_header px-3 py-[30px] lg:px-5">
        <div
          className="thin_scrollbar h-[370px] overflow-y-scroll"
          ref={scrollContainerRef}
        >
          {allChatData?.supportChat && allChatData?.supportChat.length > 0 ? (
            allChatData.supportChat.map((message) =>
              message.sender_id === user_id ? (
                <MerchantSendMessage key={message.id} message={message} />
              ) : (
                <MerchantRecevieMessage key={message.id} message={message} />
              ),
            )
          ) : (
            <div>No Chat History</div>
          )}
        </div>
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
            />
          </div>

          {/* <Paperclip className="absolute right-20 top-[79%] h-[18px] w-[18px] -translate-y-1/2 transform cursor-pointer" /> */}
        </div>
      </div>
    </div>
  );
};

export default ManageConsmnerChat;
