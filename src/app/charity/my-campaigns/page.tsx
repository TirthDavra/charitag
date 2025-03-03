import Title from "@/components/merchant/Title";
import Link from "next/link";
import React from "react";
import ManageActiveCampaigns from "@/components/charity/MyCampaigns/ManageActiveCampaigns";
import PreviousCampaigns from "@/components/charity/MyCampaigns/ManagePreviousCampaigns";

const page = (context: {
  searchParams: {
    active: string;
    charity_id?: string;
    campaign_type?: string;
    search?: string;
    page?: string;
    per_page?: number;
    sort_field?: string;
    sort_order?: string;
  };
}) => {
  return (
    <div className="pb-10">
      <Title label="Campaigns" />
      <div className="py-4">
        <div className="flex gap-[10px] divide-x divide-[#2F2F35] pb-[35px]">
          <Link href={"?active=true"}>
            <div
              className={`text-sm font-normal ${context.searchParams.active === "false" ? "text-merchant_text_color_blue " : "text-merchant_sidebar_text"}`}
            >
              Active Campaigns
            </div>
          </Link>
          <Link href={"?active=false"}>
            <div
              className={`pl-[10px] text-sm font-normal ${context.searchParams.active === "false" ? "text-merchant_sidebar_text" : "text-merchant_text_color_blue"} `}
            >
              Previous Campaigns
            </div>
          </Link>
        </div>
      </div>
      {context.searchParams.active === "false" ? (
        <PreviousCampaigns searchParams={context.searchParams} />
      ) : (
        <ManageActiveCampaigns searchParams={context.searchParams} />
      )}
    </div>
  );
};

export default page;
