import PreviousCampaigntable from "@/components/charity/MyCampaigns/ManagePreviousCampaigns/PreviousCampaigntable";
import TablePagination from "@/components/merchant/Custom/Tables/TablePagination";
import TableSearch from "@/components/merchant/Custom/Tables/TableSearch";
import React from "react";
import productImg from "@images/productDefault.jpg";
import { getCharityPreviousCampaign } from "@/api/charity/charityCampaign";

const data = [
  {
    id: "1",
    image: productImg,
    title: "Test",
    target: "50",
    total_fund: "500",
    type: "Testing",
  },
  {
    id: "2",
    image: productImg,
    title: "Test",
    target: "50",
    total_fund: "500",
    type: "Testing",
  },
];

const PreviousCampaigns = async (context: {
  searchParams?: {
    charity_id?: string;
    campaign_type?: string;
    search?: string;
    page?: string;
    per_page?: number;
    sort_field?: string;
    sort_order?: string;
  };
}) => {
  const campaignData = await getCharityPreviousCampaign({
    campaign_type: context.searchParams?.campaign_type || "",
    charity_id: context.searchParams?.charity_id || "",
    search: context.searchParams?.search || "",
    sort_field: context.searchParams?.sort_field || "",
    sort_order: context.searchParams?.sort_order || "",
    page: Number(context.searchParams?.page) || 1,
    per_page: 10,
  });

  return (
    <div>
      <div className="flex items-center gap-[10px]">
        <span className="text-lg font-semibold text-merchant_sidebar_text">
          Previous Campaigns
        </span>
      </div>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-y-2 text-sm">
        <div className="max-w-[800px] ">
          <span className="text-xs text-merchant_sidebar_text">
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout. The point
            of using Lorem Ipsum is that it has a more-or-less normal
            distribution
          </span>
        </div>
        <TableSearch label="Search Campaign" />
      </div>
      <TablePagination
        className="flex items-center justify-end gap-[5px] pt-[10px] text-[12px]"
        itemsPerPage={10}
        totalItems={campaignData.total}
      />
      <PreviousCampaigntable campaign={campaignData.data} />
      <TablePagination
        className="flex items-center justify-end gap-[5px] pt-[10px] text-[12px]"
        itemsPerPage={10}
        totalItems={campaignData.total}
      />
    </div>
  );
};

export default PreviousCampaigns;
