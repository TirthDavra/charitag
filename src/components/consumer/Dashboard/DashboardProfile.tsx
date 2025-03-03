import React from "react";
import Heading from "@/components/common/Heading";
import { IConsumerDetails } from "./types";
import Link from "next/link";
import { formatDate } from "@/utils/basicfunctions";

const DashboardProfile = ({
  profileDetails,
}: {
  profileDetails: IConsumerDetails;
}) => {
  return (
    <div className="rounded-xl border border-merchant_border px-4 py-5">
      <div className="flex items-center justify-between">
        <Heading
          content={"My profile"}
          className="!text-[22px] text-merchant_sidebar_text"
        />
        <Link
          href={"/consumer/profile"}
          className="text-sidebar_icon_color underline"
        >
          Modify
        </Link>
      </div>
      <div className="pt-1">
        <span className="text-merchant_sidebar_text">
          Find and update all your personal information here.
        </span>
      </div>
      <div className="grid grid-cols-[65px,1fr] gap-x-4 gap-y-2 pt-3 xs:gap-x-[36px]">
        {profileDetails?.last_name && (
          <>
            <div className="font-bold text-merchant_sidebar_text">Name:</div>
            <div>
              {profileDetails?.first_name} {profileDetails?.last_name}
            </div>
          </>
        )}
        {profileDetails?.email && (
          <>
            <div className="font-bold text-merchant_sidebar_text">Email:</div>
            <div>{profileDetails?.email}</div>
          </>
        )}
        {profileDetails?.dob && (
          <>
            <div className="font-bold text-merchant_sidebar_text">
              Birthday:
            </div>
            <div>{formatDate(profileDetails?.dob)}</div>
          </>
        )}
      </div>
    </div>
  );
};

export default DashboardProfile;
