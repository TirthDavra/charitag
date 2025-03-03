import React from "react";
import charityImg from "@images/charity.jpg";
import charityLogoImg from "@images/charity_logo.png";
import ButtonPrimary from "../ButtonPrimary";
import CharityCard from "../CharityCard";
import { getCharitiesForHome } from "@/api/common/charities";
import Link from "next/link";
import { getCampaigns } from "@/api/common/campaigns";

const Charities = async ({
  searchParams,
}: {
  searchParams: {
    per_page: string;
    charity_id: string;
    prev_campaign: string;
    sort_field?: string;
    country_id?: string;
    page: number;
  };
}) => {
  const campaigns = await getCampaigns({
    per_page: 3,
    is_previous: searchParams?.prev_campaign === "true" ? true : false,
    charity_id: searchParams?.charity_id || "",
    country_id: searchParams?.country_id || "",
    sort_field: searchParams?.sort_field || "",
    page: Number(searchParams.page) || 1,
  });
  return (
    <>
      {campaigns?.data && (
        <div>
          <span className="text-4xl font-bold md:text-5xl">Campaigns</span>
          <div className="max-w-[552px] py-4">
            <span className="block text-lg text-[#6e6f75] ">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus
              delectus numquam corrupti impedit harum nesciunt!
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[20px] py-8">
            {campaigns?.data &&
              campaigns.data.map((campaign, index) => (
                <CharityCard
                  key={campaign.id}
                  index={index}
                  charity={{
                    ...campaign,
                    charity_name: campaign.charity.charity_name,
                    charity_short_description:
                      campaign.charity.charity_short_description,
                    logo: campaign.charity.logo,
                    redirect_url: `/campaigns/${campaign.slug}`,
                  }}
                  fundPercentage={true}
                  classNameShadow="!shadow-[#e4eafa]"
                />
              ))}
          </div>
          <div className="mt-4 justify-center sm:flex">
            <Link href={"/campaigns"}>
              <ButtonPrimary
                label={"View All Our Campaigns"}
                className="flex justify-center rounded-full max-sm:w-full h-[50px]"
              />
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Charities;
