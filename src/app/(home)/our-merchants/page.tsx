import React from "react";
import Heading from "@/components/common/NavbarLinkPages/OurCharities/Heading";
import merchantImg from "@images/charities-with-cloud.png";
import FilterCharities from "@/components/common/NavbarLinkPages/OurCharities/FilterCharities";
import { getMerchantTypes, getMerchantsList } from "@/api/common/merchant";
import { getCountries } from "@/api/common/charities";
import ButtonPrimary from "@/components/common/ButtonPrimary";
import ChartityCard from "@/components/common/NavbarLinkPages/OurCharities/ChartityCard";
import WhyCharitag from "@/components/common/NavbarLinkPages/OurCharities/WhyCharitag";
import charityLogoWhite from "@images/charitag_logo_white.svg";
import Link from "next/link";
import { auth } from "auth";
import { getCategories } from "@/api/auth/categories";
import MerchantCardConatiner from "@/components/common/NavbarLinkPages/OurMerchants/MerchantCardConatiner";
import { getMerchantCardBox } from "@/api/common/cardbox";
import Image from "next/image";
import CountCardBox from "@/components/common/CountCardBox";

const page = async ({
  searchParams,
}: {
  searchParams: {
    sort_by?: string;
    page?: number;
    per_page?: number;
    merchant_type_id?: string;
    country_id?: string;
  };
}) => {
  const merchantTypes = await getCategories("merchant");
  const countries = await getCountries();
  const merchantData = await getMerchantsList({
    merchant_type_id: searchParams.merchant_type_id || "",
    country_id: searchParams.country_id || "",
    page: Number(searchParams.page || 1),
    per_page: 12,
    sort_by: searchParams.sort_by || "",
  });

  const User = await auth();
  const cardData = await getMerchantCardBox();

  return (
    <div>
      <div className="bg-header_bg">
        <div className="relative md:hidden pt-[90px] md:pt-0">
          <Image
            src={merchantImg}
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
          <div className=" md:pt-[110px]">
            <Heading
              label="Join Charitag today"
              labelButton="Shop all our deals"
              img={merchantImg}
              redirectUrl="/shop?deal=true"
              redirectRegisterUrl="/register?user=0"
              cardData={cardData.data}
            />
          </div>
          <div className="border-b-[1px] border-[#d9e2f9]" />
        </div>
      </div>
      <div className="container">
        <FilterCharities
          types={merchantTypes.data}
          locations={countries.data}
          locationQueryParam="country_id"
          typeQuerParam="merchant_type_id"
          placeholder="Merchants Type "
        />
        <div className="mt-5 border-b-[1px] border-consumer_border" />
        <div>
          <MerchantCardConatiner
            merchantDataProp={merchantData}
            searchParams={searchParams}
          />
        </div>
        <div>
          <WhyCharitag title="Why Trust Charitag" />
          {!User?.user.token && (
            <Link href={"/register"} className="mt-[45px] flex justify-center">
              <ButtonPrimary
                label={`Join Charitag today`}
                logo={charityLogoWhite}
                classNameLogo="w-[16px] h-[24px]"
                className="flex h-[50px] w-full !justify-center rounded-full !py-0 sm:w-[213px]"
              />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default page;
