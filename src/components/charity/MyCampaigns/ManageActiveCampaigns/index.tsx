import ButtonPrimary from "@/components/common/ButtonPrimary";
import TableSearch from "@/components/merchant/Custom/Tables/TableSearch";
import Link from "next/link";
import React from "react";
import ActiveCampaigntable from "./ActiveCampaigntable";
import TablePagination from "@/components/merchant/Custom/Tables/TablePagination";
import { getCharityCampaign } from "@/api/charity/charityCampaign";

const ManageActiveCampaigns = async (context: {
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
  const campaignData = await getCharityCampaign({
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
          Active Campaigns
        </span>
        <Link href={"my-campaigns/add-campaigns"}>
          <ButtonPrimary
            label="Add New"
            className="rounded-sm px-[13px] py-2 !shadow-none"
            classNameLabel="text-[12px] font-normal"
          />
        </Link>
      </div>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-y-2 text-sm">
        <div className="max-w-[800px]">
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
        totalItems={campaignData.data.total ?? 0}
      />
      <ActiveCampaigntable campaign={campaignData?.data.data ?? []} />
      <TablePagination
        className="flex items-center justify-end gap-[5px] pt-[10px] text-[12px]"
        itemsPerPage={10}
        totalItems={campaignData.data.total ?? 0}
      />
    </div>
  );
};

export default ManageActiveCampaigns;
