"use client";
import { ICharityProfile } from "@/api/charity/types";
import { useSession } from "next-auth/react";
import React from "react";

const CharityUserProfile = ({ profileData }: { profileData: ICharityProfile }) => {
  const { data: session } = useSession();
  return (
    <div className="">
      <p className="font-semibold text-merchant_primary">
        {(session?.user.userDetails?.first_name || profileData?.first_name) ??
          ""}{" "}
        {(session?.user.userDetails?.last_name || profileData?.last_name) ?? ""}
      </p>
      <p className="text-[12px] text-[#202021]">
        {(session?.user.userDetails?.email || profileData?.email) ?? ""}
      </p>
    </div>
  );
};

export default CharityUserProfile;
