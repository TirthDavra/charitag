import React from "react";
import Navigate from "./Navigate";
import Campaign from "./Campaign";
import AboutCampaign from "./AboutCampaign";
import CampaignSideCard from "./CampaignSideCard";
import DealSlider from "@/components/common/Home/DealSlider";
import TopDeal from "@/components/common/Home/TopDeal";
import OrganisationImage from "./OrganisationImage";
import { ISingleCompaignResponse } from "@/api/charity/types";
import Breadcrumb from "@/components/common/BreadCrumbs";
import { getMerchantProductCategories } from "@/api/common/products";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Dot } from "lucide-react";

const SingleCampaign = async ({
  compaignDetails,
  context,
}: {
  compaignDetails: ISingleCompaignResponse;
  context: {
    params: { slug: string; c_slug: string };
    searchParams: {};
  };
}) => {
  const categories = await getMerchantProductCategories();

  return (
    <div>
      <div className="absolute left-0 right-0 top-0 z-[-10] h-[1100px] w-full bg-[#f9fafe] md:h-[670px] lg:h-[545px]"></div>

      <div className="container">
        <div className="hidden pb-[15px] pt-[25px] md:block ">
          <Breadcrumb
            items={[
              { href: "/our-charities", label: "Our Charities" },
              {
                href: `/our-charities/${context.params.slug}`,
                label: compaignDetails.data?.charity?.charity_name || "",
              },
              {
                href: `/our-charities/${context.params.slug}/campaigns`,
                label: "All campaigns",
              },
              {
                href: `/our-charities/${context.params.slug}/campaigns/${context.params.c_slug}`,
                label: compaignDetails.data?.title || "",
              },
            ]}
          />
        </div>
        <div className="flex justify-between">
          <div
            className="grid grid-cols-1 gap-10 [grid-template-areas:'sideCard''charity''about''contact'] 
                            md:grid-cols-2 md:[grid-template-areas:'charity_sideCard''about_about''contact_contact'] 
                            lg:grid-cols-3 lg:[grid-template-areas:'charity_charity_sideCard''about_about_contact']"
          >
            <div className="[grid-area:charity]">
              <Campaign compaignDetails={compaignDetails} />
            </div>
            <div className="max-w-[782px] [grid-area:about]">
              <AboutCampaign compaignDetails={compaignDetails} />
            </div>
            <div className="[grid-area:contact] md:mx-auto lg:mt-[10px]">
              <OrganisationImage compaignDetails={compaignDetails} />
            </div>
            <div className="mt-5 [grid-area:sideCard] md:mt-0">
              <div className="relative">
                <CampaignSideCard compaignDetails={compaignDetails} />
                <div className="absolute bottom-0 left-3 right-5 top-3 block md:hidden">
                  <div className="flex h-[37px] w-[37px] items-center justify-center rounded-full bg-white pl-1">
                    <FontAwesomeIcon icon={faArrowLeft} />
                    <Dot className="ml-[-5px] w-[20px]" />
                    <Dot className="ml-[-15px] w-[20px]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-10 border-b border-sidebar_devider_color" />
        <div className="m-auto mt-5 md:mt-10 max-w-[100%]">
          <span className="text-4xl font-bold">Our top deal</span>
          <div className="mb-14 mt-8 w-full">
            <DealSlider productCategories={categories.data.data} label="deals"/>
          </div>
          <TopDeal />
        </div>
      </div>
    </div>
  );
};

export default SingleCampaign;
