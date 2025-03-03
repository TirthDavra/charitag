import React from "react";
import Image from "next/image";
import profileImg from "@images/profile4.jpeg";
import { formatTime } from "@/utils/basicfunctions";
import { IAdminChatistoryData } from "@/api/common/types";

const RecieveMessageAdmin = ({
  message,
}: {
  message: IAdminChatistoryData;
}) => {
  return (
    <div className="flex w-full justify-start pb-5">
      <div className="max-w-[540px] flex-grow">
        <div className="flex flex-grow gap-2">
          <div>
            <Image
              src={
                message?.receiver_image
                  ? process.env.NEXT_PUBLIC_APP_IMAGE_API_ENDPOINT +
                    encodeURIComponent(message?.receiver_image)
                  : profileImg
              }
              alt=""
              className="h-10 max-w-10 rounded-full"
              width={100}
              height={100}
            />
          </div>
          <div className="w-full">
            <div className="flex items-center justify-start max-lg:gap-3 xl:justify-between">
              <span className="text-sm font-medium text-merchant_sidebar_text">
                {message?.sender_name || ""}
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

export default RecieveMessageAdmin;
