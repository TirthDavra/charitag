import { IConsumerChatistoryData } from "@/api/merchant/types";
import { formatTime } from "@/utils/basicfunctions";
import Image from "next/image";
import React from "react";
import profileImg from "@images/default_user.png";

const MerchantSendMessage = ({
  message,
}: {
  message: IConsumerChatistoryData;
}) => {
  return (
    <div className="flex w-full justify-end px-2 py-5">
      <div className="max-w-[540px] flex-grow">
        <div className="flex flex-grow gap-2">
          <div className="w-full">
            <div className="flex items-center justify-end max-lg:gap-3 xl:justify-between">
              <span className="text-xs text-merchant_placeholder lg:mx-auto xl:mx-[unset]">
                {formatTime(message?.created_at)}
              </span>
              <span className="text-end text-sm font-medium text-merchant_sidebar_text">
                {message?.sender_name || ""}
                {/* {message?.sender.first_name + " " + message?.sender.last_name ||
                  ""} */}
              </span>
            </div>
            <div className="flex justify-end pt-3">
              <div className="w-fit rounded-t-2xl rounded-bl-2xl  bg-merchant_header p-3 lg:p-5">
                <span className="text-sm font-normal text-merchant_sidebar_text">
                  {message?.message || ""}
                </span>
              </div>
            </div>
          </div>
          <div>
            <Image
              src={
                message?.sender_image
                  ? process.env.NEXT_PUBLIC_APP_IMAGE_API_ENDPOINT +
                    encodeURIComponent(message?.sender_image)
                  : profileImg
              }
              alt=""
              className="h-10 max-w-10 rounded-full"
              width={100}
              height={100}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MerchantSendMessage;
