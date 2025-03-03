"use client";
import { useSession } from "next-auth/react";
import React from "react";

const MerchantUserProfile = () => {

    const {data: session} = useSession()

  return (
    <div>
      <p className="font-semibold text-merchant_primary">
        {session?.user?.userDetails?.first_name || ""}{" "}
        {session?.user?.userDetails?.last_name || ""}
      </p>
      <p className="text-[12px] text-[#202021]">
        {session?.user?.userDetails?.email || ""}
      </p>
    </div>
  );
};

export default MerchantUserProfile;
