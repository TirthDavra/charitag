"use client";
import { ICharityCampaignBySlugResponse } from "@/api/common/types";
import CharityCard from "@/components/common/CharityCard";
import React, { useEffect, useRef, useState } from "react";
import ShowMore from "../../CorporateFundraisers/ShowMore";

const CampaignCardContainer = ({
  campaignDataProp,
  context,
}: {
  campaignDataProp: ICharityCampaignBySlugResponse;
  context?: {
    params: { slug: string };
    searchParams: {
      per_page: string;
      charity_id: string;
      prev_campaign: string;
      page: number;
      sort_field?: string;
      country_id?: string;
    };
  };
}) => {
  const [campaignData, setCampaignData] = useState(campaignDataProp.data);
  const [curPage, setCurPage] = useState(1);

  const handlePageChange = (newPage: number) => {
    setCurPage(newPage);
  };

  useEffect(() => {
    setCampaignData(campaignDataProp.data);
    setCurPage(1);
  }, [
    context?.searchParams.charity_id,
    context?.searchParams.country_id,
    context?.searchParams.sort_field,
  ]);
  const prevCampaignValue = context?.searchParams.prev_campaign === "true";
  return (
    <div className="mt-6">
      <div className="grid grid-cols-1 gap-x-5 gap-y-[45px] md:grid-cols-2 lg:grid-cols-3">
        {campaignData &&
          campaignData.map((campaign, index) => (
            <CharityCard
              index={index}
              key={campaign.id + index + Math.round(campaign.id)}
              charity={{
                charity_name: campaign.charity.charity_name,
                charity_short_description:
                  campaign.charity.charity_short_description,
                feature_image: campaign.feature_image,
                id: campaign.id,
                last_donation: campaign.last_donation,
                logo: campaign.charity.logo,
                total_fund_target: campaign.total_fund_target,
                total_raised: campaign.total_raised,
                redirect_url: prevCampaignValue
                  ? `/campaigns/${campaign.slug}?prev_campaign=true`
                  : `/campaigns/${campaign.slug}`,
                progress_percentage: campaign.progress_percentage,
                end_date: campaign.end_date,
              }}
              fundPercentage={true}
              classNameShadow="!shadow-[#e4eafa]"
              expiry={true}
            />
          ))}
      </div>
      <div className="pt-14">
        <ShowMore
          page={curPage}
          handlePageChange={handlePageChange}
          setData={setCampaignData}
          url="/campaigns"
          accessorKey="data"
          total={campaignDataProp?.total}
          currentLength={campaignData?.length}
          per_page={12}
        />
      </div>
    </div>
  );
};

export default CampaignCardContainer;
