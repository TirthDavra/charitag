import Image from "next/image";
import React, { useContext } from "react";
import gearIconSvg from "@images/svg/GearSix.svg";
import { Bell, ChevronDown, Mail, Menu, Settings } from "lucide-react";
import Link from "next/link";
import { getMerhantProfile } from "@/api/merchant/merchantAccount";
import MerchantResSIdebar from "../Sidebar/MerchantResSIdebar";
import profileImg from "@images/user_default_img.jpg";
import MerchantUserProfile from "./MerchantUserProfile";
import ProfileHeaderImage from "@/components/merchant/Header/ProfileHeaderImage";
import NotificationsBell from "@/components/common/Header/NotificationsBell";
import MerchantMenu from "./MerchantMenu";

const MerchantHeader = async ({ className }: { className?: string }) => {
  const response = await getMerhantProfile();
  const profileData = response.data.user;

  return (
    <div
      className={`flex h-[71px] w-full items-center justify-between rounded-xl bg-white pl-4 pr-8 drop-shadow-md	 ${className} `}
    >
      <div>
        <MerchantResSIdebar />
      </div>
      <div className="">
        <div className="flex items-center justify-center  gap-2  xs:gap-3">
          {/* <div className="flex  items-center justify-center rounded-full hover:bg-merchant_main_bg">
          <Mail className="h-[22px] w-[22px] text-merchant_primary" />
        </div> */}
          <div className="flex  items-center justify-center rounded-full ">
            <NotificationsBell redirectUrl="/merchant/notification" />
          </div>
          <div className="flex items-center gap-2 xs:gap-3">
            <div className="hidden items-center gap-3 xs:flex ">
              <ProfileHeaderImage
                defaultImg={
                  profileData?.profile_image?.thumbnail_path
                    ? process.env.NEXT_PUBLIC_APP_IMAGE_API_ENDPOINT +
                      encodeURIComponent(
                        profileData.profile_image.thumbnail_path,
                      )
                    : profileImg
                }
              />
              <div className="">
                <MerchantUserProfile />
              </div>
            </div>
            <MerchantMenu />
            <div className="ml-[7px]  mr-[7px] h-[40px] border-l border-[#dfdfdf] xs:ml-[14px]"></div>
            <Image src={gearIconSvg} alt="setting" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MerchantHeader;
