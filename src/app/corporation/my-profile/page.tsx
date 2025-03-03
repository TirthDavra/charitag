import ProfileDetails from "@/components/merchant/MyAccount/ProfileDetails";
import Title from "@/components/merchant/Title";
import Link from "next/link";
import React from "react";
import CorporateProfile from "./@profile/page";
import CorporateLocation from "./@locations/page";
import CorporatePassword from "./@password/page";
import CorporateUniqueCode from "./@uniqueCode/page";
import CorporateOrganization from "./@organization/page";
import CorporateProfileDetails from "@/components/corporate/MyProfile/CorporateProfileDetails";

const page = (context: {
  searchParams: {
    tab: string | undefined;
  };
}) => {
  return (
    <div className="pb-10">
      <Title label="Profile" />
      <div className="flex flex-wrap gap-5 py-4 max-xl:justify-center xl:flex-nowrap">
        <div>
          <CorporateProfileDetails />
        </div>
        <div className="w-full">
          <div className="flex gap-[10px] divide-x divide-[#2F2F35] overflow-y-auto pb-[20px] md:gap-[25px] md:pb-[35px]">
            <Link href="?tab=profile">
              <div
                className={`w-[max-content] text-sm font-normal ${
                  context.searchParams.tab === "profile" ||
                  !context.searchParams.tab
                    ? "text-merchant_text_color_blue"
                    : "text-merchant_sidebar_text"
                }`}
              >
                Personal Profile
              </div>
            </Link>
            <Link href="?tab=organization">
              <div
                className={`w-[max-content] pl-[10px] text-sm font-normal md:pl-[25px] ${context.searchParams.tab === "organization" ? "text-merchant_text_color_blue" : "text-merchant_sidebar_text"}`}
              >
                Organization information
              </div>
            </Link>
            <Link href="?tab=location">
              <div
                className={`w-[max-content] pl-[10px] text-sm font-normal md:pl-[25px] ${context.searchParams.tab === "location" ? "text-merchant_text_color_blue" : "text-merchant_sidebar_text"}`}
              >
                Manage Locations
              </div>
            </Link>
            <Link href="?tab=uniqueCode">
              <div
                className={`w-[max-content] pl-[10px] text-sm font-normal md:pl-[25px] ${context.searchParams.tab === "uniqueCode" ? "text-merchant_text_color_blue" : "text-merchant_sidebar_text"}`}
              >
                Get Unique Code
              </div>
            </Link>
            <Link href="?tab=password">
              <div
                className={`w-[max-content] pl-[10px] text-sm font-normal md:pl-[25px] ${context.searchParams.tab === "password" ? "text-merchant_text_color_blue" : "text-merchant_sidebar_text"}`}
              >
                Change Password
              </div>
            </Link>
          </div>

          {(context.searchParams.tab === "profile" ||
            !context.searchParams.tab) && <CorporateProfile />}

          {context.searchParams.tab === "organization" && (
            <CorporateOrganization />
          )}
          {context.searchParams.tab === "uniqueCode" && <CorporateUniqueCode />}
          {context.searchParams.tab === "password" && <CorporatePassword />}
          {context.searchParams.tab === "location" && <CorporateLocation />}
        </div>
      </div>
    </div>
  );
};

export default page;
