import Image from "next/image";
import React from "react";
import profilePic from "@images/user_default_img.jpg";
import gearIconSvg from "@images/svg/GearSix.svg";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { getCharityProfile } from "@/api/charity/charityProfile";
import CorporateMenuResposive from "../Sidebar/CorporateMenuResposive";
import CorporateUserProfile from "./CorporateUserProfile";
import CorporateHeaderImage from "./CorporateHeaderImage";
import NotificationsBell from "@/components/common/Header/NotificationsBell";
const CorporateHeader = async ({ className }: { className?: string }) => {
  const response = await getCharityProfile();
  const profileData = response.data.user;

  return (
    <div
      className={`flex h-[71px] w-full items-center justify-between rounded-xl bg-white pl-4 pr-8 drop-shadow-md	 ${className} `}
    >
      <div>
        <CorporateMenuResposive />
      </div>
      <div className="flex items-center justify-center  gap-2  xs:gap-3">
        {/* <CorporateNotifications /> */}
        <NotificationsBell redirectUrl="/corporation/notifications" />
        <div className="flex items-center gap-2 xs:gap-3">
          <div className="hidden items-center gap-3 xs:flex ">
            <CorporateHeaderImage
              defaultImg={
                profileData?.profile_image?.thumbnail_path
                  ? process.env.NEXT_PUBLIC_APP_IMAGE_API_ENDPOINT +
                    encodeURIComponent(profileData.profile_image.thumbnail_path)
                  : profilePic
              }
            />
            <div className="">
              <CorporateUserProfile />
            </div>
          </div>
          <Link href="/corporation/my-profile">
            <ChevronDown className="text-merchant_primary" />
          </Link>
          <div className="ml-[7px]  mr-[7px] h-[40px] border-l border-[#dfdfdf] xs:ml-[14px]"></div>
          <Image src={gearIconSvg} alt="setting" />
        </div>
      </div>
    </div>
  );
};

export default CorporateHeader;
