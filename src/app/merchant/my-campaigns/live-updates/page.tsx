import { getLiveUpdates } from "@/api/charity/charityCampaign";
import { LiveUpdateTable } from "@/components/charity/MyCampaigns/LiveUpdates/LiveUpdatesTable";
import TablePagination from "@/components/merchant/Custom/Tables/TablePagination";
import TableSearch from "@/components/merchant/Custom/Tables/TableSearch";
import Title from "@/components/merchant/Title";
import React from "react";

const page = async ({
  searchParams,
}: {
  searchParams: { progressId: string };
}) => {
  const updateData = await getLiveUpdates(searchParams.progressId);

  return (
    <div className="pb-10">
      <Title label="Live updates" />
      <div className="mt-4 flex items-center justify-end">
        <TableSearch label="Search Updates" />
      </div>
      <TablePagination
        className="flex items-center justify-end gap-[5px] pt-[10px] text-[12px]"
        itemsPerPage={10}
        totalItems={updateData.data?.total || 0}
      />
      <LiveUpdateTable updateData={updateData.data?.data || []} />
      <TablePagination
        className="flex items-center justify-end gap-[5px] pt-[10px] text-[12px]"
        itemsPerPage={10}
        totalItems={updateData.data?.total || 0}
      />
    </div>
  );
};

export default page;
