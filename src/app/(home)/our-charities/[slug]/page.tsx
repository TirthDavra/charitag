import {
  getCharityCampaignBySlug,
  getsingleCharity,
} from "@/api/common/charities";
import { getReview } from "@/api/common/review";
import ReviewsContainer from "@/components/common/Home/ReviewsContainer";
import AboutCharity from "@/components/common/NavbarLinkPages/OurCharities/singleCharity/AboutCharity";
import Charity from "@/components/common/NavbarLinkPages/OurCharities/singleCharity/Charity";
import CharityCampaigns from "@/components/common/NavbarLinkPages/OurCharities/singleCharity/CharityCampaigns";
import CharityContact from "@/components/common/NavbarLinkPages/OurCharities/singleCharity/CharityContact";
import CharitySideCard from "@/components/common/NavbarLinkPages/OurCharities/singleCharity/CharitySideCard";
import OurProducts from "@/components/common/NavbarLinkPages/OurCharities/singleCharity/OurProducts";
import ImageSlider2 from "@/components/common/product/ImageSlider2";
import Reviews from "@/components/common/product/Reviews";
import { faArrowLeft, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dot } from "lucide-react";
import Link from "next/link";
import React from "react";

const Page = async (context: {
  params: { slug: string };
  searchParams: { page: string };
}) => {
  const response = await getsingleCharity(context.params.slug);
  const charityData = response.data;
  const campignData = await getCharityCampaignBySlug({
    slug: context.params.slug,
    per_page: 3,
  });

  const reviewData = await getReview({
    page: Number(context.searchParams.page || 1),
    per_page: 4,
  });

  return (
    <div>
      <div className="absolute left-0 right-0 top-0 z-[-10] h-[890px] w-full bg-[#f9fafe] md:h-[670px] lg:h-[545px]"></div>
      <div className="container mt-[140px] md:mt-[120px]">
        <div
          className="grid grid-cols-1 gap-10 [grid-template-areas:'sideCard''charity''about''slider''reviews''contact'] 
                            md:grid-cols-2 md:[grid-template-areas:'charity_sideCard''about_about''slider_slider''reviews_contact'] 
                            lg:grid-cols-3 lg:[grid-template-areas:'charity_charity_sideCard''about_about_contact''slider_slider_contact''reviews_reviews_contact'] "
        >
          <div className="[grid-area:charity]">
            <Charity charityData={charityData} />
          </div>
          <div className="[grid-area:sideCard] md:pt-[95px]">
            <div className="relative">
              <CharitySideCard charityDetails={charityData} />
              <div className="absolute bottom-0 left-3 right-5 top-1 block md:hidden">
                <Link
                  href={"/our-charities"}
                  className="flex h-[40px] w-[40px] items-center justify-center rounded-full bg-white pl-1"
                >
                  <FontAwesomeIcon icon={faArrowLeft} />
                  <Dot className="ml-[-5px] w-[20px]" />
                  <Dot className="ml-[-15px] w-[20px]" />
                </Link>
              </div>
            </div>
          </div>
          <div className="[grid-area:about] max-sm:mt-[10px] lg:mt-[-20%]">
            <AboutCharity aboutCharity={charityData} label="charity" />
          </div>
          <div className="[grid-area:slider]">
            {charityData?.gallery.length < 0 && (
              <div className="lg:w-full xl:!mt-[18%] ">
                <ImageSlider2 gallery={charityData.gallery} />
              </div>
            )}
            {/* <div className="mt-[70px] grid grid-cols-[repeat(auto-fill,minmax(290px,1fr))] gap-[25px] md:gap-[20px]">
              <Image
                src={charityImg}
                alt=""
                height={233}
                className=" w-full rounded-xl"
              />
              <Image
                src={charityImg2}
                alt=""
                height={233}
                className="  w-full rounded-xl"
              />
            </div> */}
          </div>

          <div className="[grid-area:contact]">
            <CharityContact contactDetails={charityData} />
            <OurProducts
              product={charityData?.recommended_products ?? []}
              title="Our recommended products"
            />
          </div>

          {charityData?.reviews?.length > 0 && (
            <div className="[grid-area:reviews]">
              <div className="mb-4 mt-8 h-px w-full  bg-sidebar_devider_color md:hidden lg:my-6 lg:block"></div>
              <div className="mt-10 flex flex-wrap items-center gap-[10px]">
                <FontAwesomeIcon
                  icon={faStar}
                  className="mr-1 text-[20px] text-[#3969E0]"
                />
                <span className="text-[22px] font-bold text-[#3969E0]">
                  {" "}
                  {charityData?.rating || 4.95}
                </span>
                <span className="relative text-[22px] font-bold underline">
                  {charityData?.reviews_count || "838"} Reviews
                </span>
              </div>
              {/* <Reviews review={charityData?.reviews ?? []} /> */}
              <ReviewsContainer review={reviewData || []} />

              <div className="border-sidebar_devider_color max-sm:border-b-[1px] max-sm:pb-9" />
            </div>
          )}
        </div>

        <div className="mt-[16px] border-b-[1px] border-sidebar_devider_color md:mt-[75px]" />
        <div>
          <CharityCampaigns
            campaigns={campignData.data.map((campaign) => ({
              charity_name: campaign.charity.charity_name,
              charity_short_description:
                campaign.charity.charity_short_description,
              feature_image: campaign.feature_image,
              id: campaign.id,
              last_donation: campaign.last_donation,
              logo: campaign.charity.logo,
              total_fund_target: campaign.total_fund_target,
              total_raised: campaign.total_raised,
              redirect_url: `/campaigns/${campaign.slug}`,
              start_date: campaign.start_date,
              end_date: campaign.end_date,
              progress_percentage: campaign.progress_percentage,
            }))}
            charityNameSlug={`/campaigns?charity_id=${charityData?.id}` ?? ""}
            previousCampaignsUrl={
              `/campaigns?prev_campaign=true&charity_id=${charityData?.id || "0"}` ??
              ""
            }
          />
        </div>
      </div>
      {/* <div className="container">
        <CharityVolunteer />
      </div> */}
    </div>
  );
};

export default Page;
