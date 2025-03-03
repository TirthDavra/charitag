import {
  getCharities,
  getMerchantCampaigns,
  getMerchantCampaignsCount,
} from "@/api/merchant/merchantCampaigns";
import Await from "@/components/common/Await";
import ButtonPrimary from "@/components/common/ButtonPrimary";
import TablePagination from "@/components/merchant/Custom/Tables/TablePagination";
import TableSearch from "@/components/merchant/Custom/Tables/TableSearch";
import Title from "@/components/merchant/Title";
import CampaignTable from "@/components/merchant/my-campaigns/CampaignTable";
import FilterCampaign from "@/components/merchant/my-campaigns/FilterCampaign";
import Link from "next/link";
import React, { Suspense } from "react";

const page = async ({
  searchParams,
}: {
  searchParams: {
    charity_id: string;
    campaign_type: string | number;
    search: string;
    sort_field: string;
    sort_order: string;
    per_page: number;
    page: number;
  };
}) => {
  const count = await getMerchantCampaignsCount();
  const charities = await getCharities();
  const campaign = getMerchantCampaigns({
    campaign_type: searchParams.campaign_type || "",
    charity_id: searchParams.charity_id || "",
    page: Number(searchParams.page) || 0,
    per_page: 10,
    search: searchParams.search || "",
    sort_field: searchParams.sort_field || "",
    sort_order: searchParams.sort_order || "",
  });
  return (
    <div>
      <Title label="Campaigns" />
      <div className="py-4">
        <div className="flex items-center gap-[10px]">
          <span className="text-lg font-medium">Campaigns</span>
          <Link href={"my-campaigns/add-campaign"}>
            <ButtonPrimary
              label="Add New"
              className="rounded-sm px-[10px] py-2 !h-[34px] !shadow-none"
              classNameLabel="text-[13px] font-normal"
            />
          </Link>
        </div>
        <div className="mt-4 inline-block flex-wrap items-center justify-between text-sm xl:flex">
          <div className="h-[34px]">
            <span className="text-merchant_sidebar_text">
              All ({count?.all_count || 0}) |
            </span>{" "}
            <span className="text-merchant_text_color_blue">
              Published{" "}
              <span className="text-merchant_sidebar_text">
                ({count?.published_count || 0})
              </span>
            </span>
          </div>
          <div>
            <TableSearch label="Search Deals" />
          </div>
        </div>
        <Suspense
          key={Math.random()}
          fallback={
            <div className="h-[500px] animate-pulse">
              <div className="my-[13px] h-[20px] bg-gray-100"></div>
              <div className="my-[13px] h-[20px] bg-gray-100"></div>
              <div className="my-[16px] h-[113px] bg-gray-100"></div>
              <div className="my-[16px] h-[113px] bg-gray-100"></div>
              <div className="my-[16px] h-[113px] bg-gray-100"></div>
              <div className="my-[16px] h-[113px] bg-gray-100"></div>
              <div className="my-[16px] h-[113px] bg-gray-100"></div>
              <div className="my-[16px] h-[113px] bg-gray-100"></div>
              <div className="my-[16px] h-[113px] bg-gray-100"></div>
              <div className="my-[16px] h-[113px] bg-gray-100"></div>
              <div className="my-[16px] h-[113px] bg-gray-100"></div>
            </div>
          }
        >
          <Await promise={campaign}>
            {(campaign) => {
              return (
                <>
                  <div className="mt-[10px] flex flex-wrap items-center justify-between pt-[10px] md:pt-0">
                    <FilterCampaign
                      charities={charities.data.data}
                      defaultValues={{
                        charity_id: searchParams.charity_id,
                      }}
                    />
                    <TablePagination
                      className="flex items-center justify-end gap-[5px] pt-[10px] text-[12px] md:pt-0"
                      itemsPerPage={10}
                      totalItems={campaign?.total ?? 0}
                    />
                  </div>

                  <CampaignTable campaign={campaign.data} />
                  <TablePagination
                    className="flex items-center justify-end gap-[5px] pt-[10px] text-[12px] md:pt-[15px]"
                    itemsPerPage={10}
                    totalItems={campaign?.total ?? 0}
                  />
                </>
              );
            }}
          </Await>
        </Suspense>
      </div>
    </div>
  );
};

export default page;
