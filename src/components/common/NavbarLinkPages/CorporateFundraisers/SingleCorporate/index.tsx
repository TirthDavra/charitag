import React from "react";
import Corporate from "./Corporate";
import { IICorporateFundraiserBySlugResponse } from "@/api/common/types";
import AboutCorporate from "./AboutCorporate";
import CampaignSideCard from "../../OurCharities/Campaign/SingleCampaign/CampaignSideCard";
import CorporateSidecard from "./CorporateSidecard";
import OrganisationImage from "../../OurCharities/Campaign/SingleCampaign/OrganisationImage";
import TopDeal from "@/components/common/Home/TopDeal";
import DealSlider from "@/components/common/Home/DealSlider";
import { getMerchantProductCategories } from "@/api/common/products";
import Breadcrumb from "@/components/common/BreadCrumbs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Dot } from "lucide-react";

const SingleCorporate = async ({
  corporateDetails,
  context,
}: {
  corporateDetails: IICorporateFundraiserBySlugResponse;
  context: {
    params: { slug: string };
    searchParams: {};
  };
}) => {
  const categories = await getMerchantProductCategories();

  return (
    <div>
      <div className="absolute left-0 right-0 top-0 z-[-10] h-[890px] w-full bg-[#f9fafe] md:h-[670px] lg:h-[545px]"></div>

      <div className="container">
        <div className="max-sm:hidden">
          <Breadcrumb
            items={[
              {
                href: "/corporate-fundraisers",
                label: "Corporate Fundraisers",
              },
              {
                href: `/corporate-fundraisers/${context.params.slug}`,
                label: corporateDetails.data?.slug,
              },
            ]}
          />
        </div>
        <div className="flex justify-between">
          <div
            className="grid grid-cols-1 gap-10 [grid-template-areas:'sideCard''charity''about''ortImage'] 
                            md:grid-cols-2 md:[grid-template-areas:'charity_sideCard''about_about''ortImage_ortImage'] 
                            lg:grid-cols-3 lg:[grid-template-areas:'charity_charity_sideCard''about_about_ortImage'] "
          >
            <div className="[grid-area:charity] lg:w-[90%]">
              <Corporate corporateDetails={corporateDetails.data} />
            </div>
            <div className="[grid-area:about] lg:w-[90%]">
              <AboutCorporate corporateDetails={corporateDetails.data} />
              <div className="lg:mt-5 max-sm:border-b-[1px] border-sidebar_devider_color" />
            </div>
            <div className="[grid-area:sideCard] max-sm:mt-10">
              <div className="relative">
                <CorporateSidecard corporateDetails={corporateDetails.data} />
                <div className="absolute bottom-0 left-3 right-5 top-3 block md:hidden">
                  <div className="flex h-[37px] w-[37px] items-center justify-center rounded-full bg-white pl-1">
                    <FontAwesomeIcon icon={faArrowLeft} />
                    <Dot className="ml-[-5px] w-[20px]" />
                    <Dot className="ml-[-15px] w-[20px]" />
                  </div>
                </div>
              </div>
            </div>
            <div className="[grid-area:ortImage] max-lg:mx-auto ">
              <OrganisationImage />
            </div>
          </div>
        </div>
        <div className=" border-b-[1px] mt-10 border-sidebar_devider_color" />
        <div className="m-auto mt-5 lg:mt-16 max-w-[100%]">
          <span className="text-4xl font-bold">Our top deal</span>
          <div className="mb-14 mt-8 w-full">
            <DealSlider productCategories={categories.data.data} label="deals"/>
          </div>
        </div>
        <TopDeal />
      </div>
    </div>
  );
};

export default SingleCorporate;
