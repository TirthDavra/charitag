import { getListCampaigns } from "@/api/common/campaigns";
import ManageEmailApplication from "@/components/charity/EmailApplication";
import Title from "@/components/merchant/Title";
import React from "react";

const page = async ({
  searchParams,
}: {
  searchParams: { is_active: string; is_previous: string };
}) => {
  const responseList = await getListCampaigns({
    is_active: searchParams.is_active === "true" ? true : false,
    is_previous: searchParams.is_previous === "true" ? true : false,
  });
  return (
    <div>
      <Title label="Email Application" />
      <div className="py-4">
        <ManageEmailApplication option={responseList.data.data || []} />
      </div>
    </div>
  );
};

export default page;
