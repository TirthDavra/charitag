import Heading from "@/components/common/NavbarLinkPages/OurCharities/Heading";
import React from "react";
import charityImg from "@images/charities-with-cloud-2.png";
import ButtonPrimary from "@/components/common/ButtonPrimary";
import WhyCharitag from "@/components/common/NavbarLinkPages/OurCharities/WhyCharitag";
import charityLogoWhite from "@images/charitag_logo_white.svg";
import FilterCharities from "@/components/common/NavbarLinkPages/OurCharities/FilterCharities";
import {
  getAllCharities,
  getCharityTypes,
  getCountries,
} from "@/api/common/charities";
import Link from "next/link";
import { auth } from "auth";
import { getCategories } from "@/api/auth/categories";
import CharityCardContainer from "@/components/common/NavbarLinkPages/OurCharities/CharityCardContainer";
import { getCharityCardBox } from "@/api/common/cardbox";
import Image from "next/image";
import CountCardBox from "@/components/common/CountCardBox";

const page = async ({
  searchParams,
}: {
  searchParams: {
    sort_by?: string;
    page?: number;
    per_page?: number;
    charity_type?: string;
    charity_location?: string;
  };
}) => {
  const response = await getCategories("charity");
  const locations = await getCountries();
  const charities = await getAllCharities({
    charity_location: searchParams?.charity_location || "",
    sort_by: searchParams?.sort_by || "",
    charity_type: searchParams?.charity_type || "",
    page: Number(searchParams.page || 1),
    per_page: 12,
  });
  const User = await auth();
  const cardData = await getCharityCardBox();

  return (
    <div>
      <div className="bg-header_bg">
        <div className="relative pt-[90px] md:hidden md:pt-0">
          <Image
            src={charityImg}
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
              label="Join Charitag today"
              labelButton="See all our campaigns"
              img={charityImg}
              redirectUrl="campaigns"
              redirectRegisterUrl="/register?user=1"
              cardData={cardData.data}
            />
          </div>
          <div className="border-b-[1px] border-consumer_border" />
        </div>
      </div>

      <div className="container">
        <FilterCharities
          types={response.data}
          locations={locations.data}
          typeQuerParam="charity_type"
          locationQueryParam="charity_location"
          placeholder="Charities Type"
        />
        <div className="mt-5 border-b-[1px] border-consumer_border" />

        <CharityCardContainer
          charityDataProp={charities}
          searchParams={searchParams}
        />
        <div>
          <WhyCharitag title="Why join Charitag Today" />

          {!User?.user.token && (
            <Link href={"/register"} className="mt-[45px] flex justify-center">
              <ButtonPrimary
                label={`Join Charitag today`}
                logo={charityLogoWhite}
                classNameLogo="w-[16px] h-[24px]"
                className="flex h-[50px] w-full justify-center rounded-full !py-0 sm:w-[213px]"
              />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default page;
