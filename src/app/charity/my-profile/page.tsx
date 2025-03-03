import ProfileDetails from "@/components/merchant/MyAccount/ProfileDetails";
import Title from "@/components/merchant/Title";
import Link from "next/link";
import React from "react";
import Profile from "./@profile/page";
import BankInformation from "./@bankInformation/page";
import ChangePassword from "./@changePassword/page";
import Locations from "./@locations/page";
import CharityINformation from "./@charityinformation/page";
import CharityProfileDetails from "@/components/charity/MyProfile.tsx/CharityProfileDetails";
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
          <CharityProfileDetails
            disabled={
              context.searchParams.tab === "profile" ||
              !context.searchParams.tab
            }
          />
        </div>
        <div className="w-full ">
          <div className="flex gap-[10px] divide-x divide-[#2F2F35] overflow-y-auto pb-[20px] md:gap-[25px] md:pb-[35px]">
            <Link href="?tab=profile" shallow={true}>
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
            <Link href="?tab=location" shallow={true}>
              <div
                className={`w-[max-content] pl-[10px] text-sm font-normal md:pl-[25px] ${context.searchParams.tab === "location" ? "text-merchant_text_color_blue" : "text-merchant_sidebar_text"}`}
              >
                Manage Locations
              </div>
            </Link>
            <Link href="?tab=bankAccount" shallow={true}>
              <div
                className={`w-[max-content] pl-[10px] text-sm font-normal md:pl-[25px] ${context.searchParams.tab === "bankAccount" ? "text-merchant_text_color_blue" : "text-merchant_sidebar_text"}`}
              >
                Manage Bank Information
              </div>
            </Link>
            <Link href="?tab=password" shallow={true}>
              <div
                className={`w-[max-content] pl-[10px] text-sm font-normal md:pl-[25px] ${context.searchParams.tab === "password" ? "text-merchant_text_color_blue" : "text-merchant_sidebar_text"}`}
              >
                Change Password
              </div>
            </Link>
            <Link href="?tab=charityinfo" shallow={true}>
              <div
                className={`w-[max-content] pl-[10px] text-sm font-normal md:pl-[25px] ${context.searchParams.tab === "charityinfo" ? "text-merchant_text_color_blue" : "text-merchant_sidebar_text"}`}
              >
                Charity Information
              </div>
            </Link>
          </div>

          {(context.searchParams.tab === "profile" ||
            !context.searchParams.tab) && <Profile />}

          {context.searchParams.tab === "bankAccount" && <BankInformation />}
          {context.searchParams.tab === "password" && <ChangePassword />}
          {context.searchParams.tab === "location" && (
            <Locations
              allCountries={
                allCountriesResponse.error ? [] : allCountriesResponse.data.data
              }
            />
          )}
          {context.searchParams.tab === "charityinfo" && <CharityINformation />}
        </div>
      </div>
    </div>
  );
};

export default page;
