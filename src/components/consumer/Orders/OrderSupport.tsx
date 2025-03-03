"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import dummyProductImage from "@images/wish_resturant.jpg"; // Assume this is a placeholder image in your project
import ButtonPrimary from "@/components/common/ButtonPrimary";
import { IChatHistoryData, ISupportOrderData } from "./types";

import { useAppDispatch, useAppSelectorCommon } from "@/lib/Store/hooks";
import { getTimeAgo } from "@/utils/basicfunctions";
import { sendMessageToCM, socket, supportRoomJoinCM } from "@/socket";
import { addOrderSupportMessage } from "@/api/consumer/order";
import AutoScrollDiv from "@/components/common/AutoScrollDiv";
import CustomInputField from "@/components/common/customFormComponents/CustomInputField";
import Link from "next/link";
import {
  addMessageToCMSupportChatHistory,
  setCMSupportChatHistoryData,
} from "@/lib/Store/slices/commonFeatures/merchantConsumerSupportChatSlice";
import { useSession } from "next-auth/react";

interface Product {
  image: string;
  title: string;
  description: string;
  color: string;
  size: string;
  status: string;
  ticketNumber: string;
}

interface OrderSupportProps {
  product: ISupportOrderData;
  messages: IChatHistoryData[];
  request_id: string;
}

const OrderSupport: React.FC<OrderSupportProps> = ({
  product,
  messages,
  request_id,
}) => {
  const [inputValue, setInputValue] = React.useState("");
  const [isSubmiting, setIsSubmiting] = React.useState(false);
  const dispatch = useAppDispatch();
  const session = useSession();
  const allChatData = useAppSelectorCommon((state) => state.cmSupport);
  useEffect(() => {
    // revalidateChatHistoryApi();
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

  useEffect(() => {
    dispatch(setCMSupportChatHistoryData(messages));
  }, []);

  // useEffect(() => {
  //   revalidateChatHistoryConsumerMerachantApi(
  //     `chat-support-consumer-${request_id}`,
  //   );
  // }, []);

  const handleSendMessage = async () => {
    if (isSubmiting) return;
    setIsSubmiting(true);
    if (inputValue.trim() !== "") {
      const respones = await addOrderSupportMessage({
        data: { message: inputValue, support_id: request_id },
      });
      if (!respones.error) {
        console.log("res kjfdlkfd", respones.data.data);
        sendMessageToCM({
          ...respones.data.data,
          cmSupportId: request_id,
          user_type: session?.data?.user?.userDetails?.type,
        });
        dispatch(addMessageToCMSupportChatHistory(respones.data.data));
      }
      setInputValue("");
    }
    setIsSubmiting(false);
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    } else if (event.key === "Enter" && event.ctrlKey) {
      event.preventDefault();
      setInputValue((prev) => prev + "\n");
    }
  };

  return (
    <div className="mt-[65px]">
      <h2 className="text-2xl font-semibold">Support for:</h2>
      <div className="my-[30px] flex items-center border-b border-t border-consumer_order_border">
        <div className="my-[30px] flex gap-[25px]">
          <div className="max-h-[150px] max-w-[100px]">
            <Link href={`/consumer/products/${product?.product_detail?.slug}`}>
              <Image
                src={
                  process.env.NEXT_PUBLIC_APP_IMAGE_API_ENDPOINT +
                    encodeURIComponent(
                      product?.product_detail?.product_image?.thumbnail_path,
                    ) || dummyProductImage
                }
                alt={product?.title}
                className="rounded-lg object-cover"
                width={100}
                height={100}
              />
            </Link>
          </div>
          <div>
            <Link href={`/consumer/products/${product?.product_detail.slug}`}>
              <h3 className="text-lg font-bold">{product?.title}</h3>
            </Link>
            <div>
              <p className="text-base text-consumer_order_text">
                By {product?.product_detail?.merchant_name}
              </p>
              <div className="flex gap-2 py-[15px] text-consumer_order_text">
                {product?.product_detail?.product_attributes.map(
                  (item, index) => (
                    <div key={index}>
                      <span className="font-semibold">{item.parent_name}</span>:{" "}
                      {item.child.name}{" "}
                      {`${index !== product?.product_detail?.product_attributes.length - 1 ? " | " : ""}`}
                    </div>
                  ),
                )}
              </div>
            </div>

            <div className="gap-2 max-sm:space-y-4 sm:flex">
              <ButtonPrimary
                className="rounded-full !px-4 !py-[5px] !font-normal"
                label={product?.status}
              />
              <button className="rounded-full border border-blue-500 px-4 py-[5px] font-normal text-blue-500">
                {`Ticket - #${product?.request_id}`}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4 justify-between sm:flex">
        <div>
          <span className="text-[18px] font-semibold">Get help form</span>
          <ul className="list-disc pl-5 pt-5">
            <li>Set-up and troubleshooting tips.</li>
            <li>Replacement parts and manuals.</li>
            <li>Free 90 day coverage.</li>
          </ul>
        </div>
        <div className="flex gap-[15px] pt-[25px]">
          <div>
            <button className="!h-10 rounded-full border border-blue-500 px-4 py-[5px] font-semibold text-blue-500">
              Call Now
            </button>{" "}
            <p className="pt-[15px] text-blue-500">Available now</p>
          </div>
          <ButtonPrimary label="Chat now" className="!h-10 rounded-full" />
        </div>
      </div>
      <div className="my-[30px] flex items-center border-b border-t border-consumer_order_border"></div>
      {allChatData?.supportChat?.length > 0 && (
        <AutoScrollDiv
          className="h-[calc(70vh - 114 px)]  mt-4 max-h-[60vh] scrollbar"
          dependency={[allChatData.supportChat]}
        >
          {allChatData.supportChat.length > 0 &&
            allChatData?.supportChat.map((message) => (
              <div
                key={message?.id}
                className="my-[30px] flex items-center border-b border-consumer_order_border"
              >
                <div className="mb-4">
                  <div className="flex gap-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-300">
                      <Image
                        src={
                          process.env.NEXT_PUBLIC_APP_IMAGE_API_ENDPOINT +
                            encodeURIComponent(message?.sender_image) ||
                          dummyProductImage
                        }
                        alt={product.title}
                        className="rounded-full object-cover"
                        width={100}
                        height={100}
                      />{" "}
                    </div>
                    <div>
                      <div className="flex gap-[5px]">
                        <p className="font-semibold">{message?.sender_name}</p>
                        <div className="flex items-center gap-1">
                          <span className="pl-1 text-[20px] text-gray-500">
                            •
                          </span>{" "}
                          <p className="text-sm text-gray-500">
                            {getTimeAgo(message?.created_at)}
                          </p>
                        </div>
                      </div>
                      <p className="mt-2">{message?.message}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </AutoScrollDiv>
      )}
      <div className="pt-4">
        <div>
          <CustomInputField
            value={inputValue}
            onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
              setInputValue(event.target.value);
            }}
            styleInput={{ resize: "none" }}
            classNameContainer="h-[114px] !items-start rounded-sm border-merchant_border"
            classNameWrapper="md:pt-[5px]"
            className="!py-2 !text-[13px]"
            textArea={true}
            textAreaRows={4}
            inputPlaceholder="Write a message..."
            onKeyDown={handleKeyDown}
          />
        </div>
        <div className="flex justify-end pt-[30px]">
          <ButtonPrimary
            label="Submit"
            type="submit"
            onClick={handleSendMessage}
            disabled={!inputValue || isSubmiting}
            className="rounded-full bg-blue-500 px-4 py-2 text-white"
          />
        </div>
      </div>
    </div>
  );
};

export default OrderSupport;
