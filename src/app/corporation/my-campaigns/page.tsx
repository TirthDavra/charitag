import ButtonPrimary from "@/components/common/ButtonPrimary";
import TablePagination from "@/components/merchant/Custom/Tables/TablePagination";
import TableSearch from "@/components/merchant/Custom/Tables/TableSearch";
import Link from "next/link";
import CorporateCampaignsTable from "@/components/corporate/MyCampaigns/CorporateCampaignsTable";
import { getCorporationCampaigns } from "@/api/corporation/compaigns";

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
  const campaign = await getCorporationCampaigns({
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
      <div className="flex items-center gap-[10px]">
        <span className="text-lg font-semibold text-merchant_sidebar_text">
          Campaigns
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
        className="flex items-center justify-end gap-[5px] pt-[10px] text-[12px] md:pt-0"
        itemsPerPage={10}
        totalItems={campaign.total}
      />
      <CorporateCampaignsTable campaign={campaign.data} />
      <TablePagination
        className="flex items-center justify-end gap-[5px] pt-[10px] text-[12px]"
        itemsPerPage={10}
        totalItems={campaign.total}
      />
    </div>
  );
};

export default page;
