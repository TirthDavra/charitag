import React, { Suspense } from "react";
import Heading from "@/components/common/NavbarLinkPages/OurCharities/Heading";
import corporateImg from "@images/charities-with-cloud-2.png";
import SearchInput from "@/components/common/SearchInput";
import { getCorporateFundraisers } from "@/api/common/corporateFundraisers";
import ButtonPrimary from "@/components/common/ButtonPrimary";
import WhyCharitag from "@/components/common/NavbarLinkPages/OurCharities/WhyCharitag";
import charityLogoWhite from "@images/charitag_logo_white.svg";
import CorporateCardContainer from "@/components/common/NavbarLinkPages/CorporateFundraisers/CorporateCardContainer";

import Link from "next/link";
import { auth } from "auth";
import Await from "@/components/common/Await";
import { getCorporateCardBox } from "@/api/common/cardbox";
import Image from "next/image";
import CountCardBox from "@/components/common/CountCardBox";

/**
 * 
    This page represent a corporate fundraisers page
 */
const page = async ({
  searchParams,
}: {
  searchParams: {
    search: string;
    page: number;
    per_page: number;
  };
}) => {
  const corporateData = getCorporateFundraisers({
    search: searchParams?.search || "",
    page: Number(searchParams?.page || 1),
    per_page: 6,
  });

  const User = await auth();
  const cardData = await getCorporateCardBox();

  return (
    <div>
      <div className="bg-header_bg">
      <div className="relative md:hidden pt-[90px] md:pt-0">
          <Image
            src={corporateImg}
            alt=""
            className={` w-full md:max-h-[444px]`}
          />
          <div className="absolute bottom-[0%] left-[10%] right-[10%] md:left-[15%] md:right-[15%] lg:right-[15%] xl:left-[13%]">
            <CountCardBox
              total_raised={cardData?.data?.total_raised || "0"}
              title={cardData?.data?.title || "Counting..."}
            />
          </div>
        </div>
        <div className="container">
          <div className="md:pt-[110px]">
            <Heading
              label="Start a corporate fundraiser"
              labelButton="See all our charities"
              img={corporateImg}
              classNameImage="max-w-[514px]"
              redirectUrl="/our-charities"
              redirectRegisterUrl="/register?user=2"
              cardData={cardData.data}
            />
          </div>
        </div>
      </div>
      <div className="container">
        <div className="border-b-[1px] border-consumer_border" />
        <div className="flex justify-center py-5">
          <Suspense>
            <SearchInput
              searchParamKey="search"
              styles="lg:flex !border-[rgba(57,105,224,0.25)] w-[668px] shadow-none"
              classNameInput="placeholder:!text-black"
              placeholder="Search for a corporate by name or location"
              redirectPath="/corporate-fundraisers"
            />
          </Suspense>
        </div>
        <div className="border-b-[1px] border-consumer_border" />

        <Suspense
          key={Math.random()}
          fallback={
            <div className="h-[500px] animate-pulse">
              <div className="my-[13px] h-[20px] bg-gray-100"></div>
              <div className="my-[13px] h-[20px] bg-gray-100"></div>
              <div className="my-[16px] h-[113px] bg-gray-100"></div>
              <div className="my-[16px] h-[113px] bg-gray-100"></div>
            </div>
          }
        >
          <Await promise={corporateData}>
            {(corporateData) => {
              return (
                <>
                  <CorporateCardContainer corporateDataProp={corporateData} />
                </>
              );
            }}
          </Await>
        </Suspense>
        <div>
          <WhyCharitag title="How to start a corporate fundraiser" />

          {!User?.user.token && (
            <Link href={"/register"} className="mt-[45px] flex justify-center">
              <ButtonPrimary
                label={`Join Charitag today`}
                logo={charityLogoWhite}
                classNameLogo="w-[16px] h-[24px]"
                className="flex h-[50px] w-full justify-center rounded-full !py-0 sm:w-[213px] "
              />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default page;
