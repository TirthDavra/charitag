import { IConsumerChatistoryData } from "@/api/merchant/types";
import Image from "next/image";
import React from "react";
import profileImg from "@images/default_user.png";
import { formatTime } from "@/utils/basicfunctions";

const MerchantRecevieMessage = ({
  message,
}: {
  message: IConsumerChatistoryData;
}) => {
  return (
    <div className="flex w-full justify-start pb-5">
      <div className="max-w-[540px] flex-grow">
        <div className="flex flex-grow gap-2">
          <div>
            <Image
              src={profileImg}
              alt=""
              className="h-10 max-w-10 rounded-full"
              width={100}
              height={100}
            />
          </div>
          <div className="w-full">
            <div className="flex items-center justify-start max-lg:gap-3 xl:justify-between">
              <span className="text-sm font-medium text-merchant_sidebar_text">
                {message?.sender_name || "Testing"}
                {/* {message?.sender.first_name + " " + message?.sender.last_name ||
                  ""} */}
              </span>
              <span className="text-xs text-merchant_placeholder lg:mx-auto xl:mx-[unset]">
                {formatTime(message.created_at)}
              </span>
            </div>
            <div className="pt-3">
              <div className="w-fit rounded-t-2xl  rounded-br-2xl bg-merchant_text_color_blue p-2 lg:p-4">
                <span className="text-sm font-normal text-charity_message">
                  {message?.message || ""}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MerchantRecevieMessage;
