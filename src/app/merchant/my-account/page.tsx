import Title from "@/components/merchant/Title";
import Link from "next/link";
import React from "react";
import PersonalProfile from "./@personalProfile/page";
import BankAccount from "./@bankAccount/page";
import ProfileDetails from "@/components/merchant/MyAccount/ProfileDetails";
import Password from "./@password/page";
import StoreProfile from "./@storeProfile/page";
import MerchantUniqueCode from "./@uniqueCode/page";
import BusinessInfo from "./@businessInfo/page";
import { getCountries } from "@/api/common/common";

const page = async (context: {
  searchParams: {
    tab: string | undefined;
  };
}) => {
  const allCountriesResponse = await getCountries();
  return (
    <div className="pb-10">
      <Title label="Profile" />
      <div className="flex flex-wrap gap-5 py-4 xl:flex-nowrap">
        <div>
          <ProfileDetails
            disabled={
              context.searchParams.tab === "personalProfile" ||
              !context.searchParams.tab
            }
          />
        </div>
        <div className="w-full ">
          <div className="flex gap-[10px] divide-x divide-[#2F2F35] overflow-y-auto pb-[35px] md:gap-[25px]">
            <Link href="?tab=personalProfile">
              <div
                className={`w-[max-content] text-sm font-normal ${
                  context.searchParams.tab === "personalProfile" ||
                  !context.searchParams.tab
                    ? "text-merchant_text_color_blue"
                    : "text-merchant_sidebar_text"
                }`}
              >
                Personal Profile
              </div>
            </Link>
            <Link href="?tab=storeProfile">
              <div
                className={`w-[max-content] pl-[10px] text-sm font-normal md:pl-[25px] ${context.searchParams.tab === "storeProfile" ? "text-merchant_text_color_blue" : "text-merchant_sidebar_text"}`}
              >
                Store Profile
              </div>
            </Link>
            <Link href="?tab=bankAccount">
              <div
                className={`w-[max-content] pl-[10px] text-sm font-normal md:pl-[25px] ${context.searchParams.tab === "bankAccount" ? "text-merchant_text_color_blue" : "text-merchant_sidebar_text"}`}
              >
                Connect Bank Account
              </div>
            </Link>
            <Link href="?tab=password">
              <div
                className={`w-[max-content] pl-[10px] text-sm font-normal md:pl-[25px] ${context.searchParams.tab === "password" ? "text-merchant_text_color_blue" : "text-merchant_sidebar_text"}`}
              >
                Change Password
              </div>
            </Link>
            <Link href="?tab=businessInfo">
              <div
                className={`w-[max-content] pl-[10px] text-sm font-normal md:pl-[25px] ${context.searchParams.tab === "businessInfo" ? "text-merchant_text_color_blue" : "text-merchant_sidebar_text"}`}
              >
                Business Information
              </div>
            </Link>
            {/* <Link href="?tab=uniqueCode">
              <div
                className={`pl-[10px] md:pl-[25px] text-sm font-normal ${context.searchParams.tab === "uniqueCode" ? "text-merchant_text_color_blue" : "text-merchant_sidebar_text"}`}
              >
                Get Unique Code
              </div>
            </Link> */}
          </div>

          {(context.searchParams.tab === "personalProfile" ||
            !context.searchParams.tab) && <PersonalProfile />}

          {context.searchParams.tab === "bankAccount" && <BankAccount />}
          {context.searchParams.tab === "password" && <Password />}
          {context.searchParams.tab === "storeProfile" && <StoreProfile />}
          {context.searchParams.tab === "businessInfo" && (
            <BusinessInfo
              allCountries={
                allCountriesResponse.error ? [] : allCountriesResponse.data.data
              }
            />
          )}
          {/* {context.searchParams.tab === "uniqueCode" && <MerchantUniqueCode />} */}
        </div>
      </div>
    </div>
  );
};

export default page;
