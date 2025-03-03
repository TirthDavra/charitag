import React from "react";
import { getCharities } from "@/api/charity/charity";
import { getCountries } from "@/api/common/charities";
import { getCategories } from "@/api/auth/categories";
import Heading from "@/components/common/NavbarLinkPages/OurCharities/Heading";
import charityImage from "@images/campaign_sample-img.png";
import FilterCampaign from "@/components/common/NavbarLinkPages/OurCharities/Campaign/FilterCampaign";
import CampaignCardContainer from "@/components/common/NavbarLinkPages/OurCharities/Campaign/CampaignCardContainer";
import { getCampaigns } from "@/api/common/campaigns";
import WhyCharitag from "@/components/common/NavbarLinkPages/OurCharities/WhyCharitag";
import { auth } from "auth";
import Link from "next/link";
import ButtonPrimary from "@/components/common/ButtonPrimary";
import charityLogoWhite from "@images/charitag_logo_white.svg";
import { getCampaignCardBox } from "@/api/common/cardbox";
import PrevCampHeading from "@/components/common/NavbarLinkPages/OurCharities/PrevCampHeading";
import campaignImage from "@images/charities-with-cloud-2.png";

const page = async (context: {
  params: { slug: string };
  searchParams: {
    per_page: string;
    charity_id: string;
    prev_campaign: string;
    sort_field?: string;
    country_id?: string;
    page: number;
  };
}) => {
  const charities = await getCharities({ is_only_name: true });
  // const campaignsTypes = await getCategories("campaign");
  const countries = await getCountries();

  const campaigns = await getCampaigns({
    per_page: 12,
    is_previous: context.searchParams?.prev_campaign === "true" ? true : false,
    charity_id: context.searchParams?.charity_id || "",
    country_id: context.searchParams?.country_id || "",
    sort_field: context.searchParams?.sort_field || "",
    page: Number(context.searchParams.page) || 1,
  });
  const User = await auth();
  const cardData = await getCampaignCardBox();

  return (
    <>
      <div className="bg-header_bg">
        <div className="container pt-[102px]">
          {context.searchParams.prev_campaign === "true" ? (
            <PrevCampHeading
              label="View all ongoing campaigns"
              img={campaignImage}
              cardData={cardData.data}
              redirectRegisterUrl="/campaigns"
            />
          ) : (
            <Heading
              label="Start a Charitag campaign"
              labelButton="See all our charities"
              img={campaignImage}
              cardData={cardData.data}
              redirectRegisterUrl="/register"
              redirectUrl="/our-charities"
            />
          )}
          <div className="border-b-[1px] border-[#d9e2f9]" />
        </div>
      </div>
      <div className="container ">
        <FilterCampaign
          locationQueryParam="country_id"
          locations={countries.data}
          typeQuerParam="charity_id"
          types={
            charities.data.data &&
            charities.data.data?.map((item) => ({
              title: item.charity_name,
              id: item.id,
            }))
          }
          placeholder="Charities"
          // campaignTypes={campaignsTypes.data}
          // campaignplaceholder="Campaign type"
          // campaigntypeQuerParam="campaign_id"
          typesValue={context.searchParams.charity_id}
        />
        <div className="mt-5 border-b-[1px] border-[#d9e2f9]" />
        <div className="mt-[30px]">
          <CampaignCardContainer
            campaignDataProp={campaigns}
            context={context}
          />
        </div>
        <div>
          <WhyCharitag title="Why donate throug Charitag" />
          {!User?.user.token && (
            <Link href={"/register"} className="mt-8 flex justify-center">
              <ButtonPrimary
                label={`Join Charitag today`}
                logo={charityLogoWhite}
                classNameLogo="w-[25px] h-[25px]"
                className="rounded-full w-full flex justify-center md:w-auto py-3"
              />
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default page;
