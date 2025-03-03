import React from "react";
import CharityCard from "@/components/common/CharityCard";
import ButtonPrimary from "@/components/common/ButtonPrimary";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faRibbon } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { ICampaignAndCharityCard } from "@/api/common/types";

const CharityCampaigns = ({
  campaigns,
  charityNameSlug,
  previousCampaignsUrl,
}: {
  campaigns: ICampaignAndCharityCard[];
  charityNameSlug: string;
  previousCampaignsUrl: string;
}) => {
  return (
    <div className="mt-[30px] md:mt-[86px]">
      <span className="text-[34px] font-bold leading-[43px] text-[#2F2F35] lg:text-[45px] lg:leading-[56px]">
        Charity ongoing campaigns{" "}
      </span>
      {campaigns.length > 0 ? (
        <>
          <div className="mt-6">
            <div className="grid grid-cols-1 gap-[20px] py-8 sm:grid-cols-2 lg:grid-cols-3">
              {campaigns.map((charity, index) => (
                <CharityCard
                  key={charity.id}
                  charity={charity}
                  fundPercentage={true}
                  classNameShadow="!shadow-[#e4eafa]"
                  index={index}
                  expiry={true}
                />
              ))}
            </div>
          </div>
          <div className="mt-[13px] flex flex-wrap items-center justify-center gap-4">
            <Link href={`${charityNameSlug}`}>
              <ButtonPrimary
                label={`View all campaigns`}
                className="flex h-[50px] w-full justify-center rounded-full px-[25px] py-[20px] md:w-[179px] md:justify-start"
              />
            </Link>
            <Link href={previousCampaignsUrl} className="flex items-center">
              <ButtonPrimary
                label="View our previous campaigns"
                classNameLabel="text-[#3969E0]"
                className={
                  "bg-gradient-to-r from-transparent to-transparent pr-2 !shadow-none"
                }
              />
              <div className="flex items-center text-[#3969E0]">
                <span className="-mr-[3px] text-[30px]">·</span>
                <span className="text-[30px]">·</span>
                <span>
                  <FontAwesomeIcon icon={faArrowRight} />
                </span>
              </div>
            </Link>
          </div>
        </>
      ) : (
        <>
          <div className="m-4 flex justify-center">
            <span>
              <FontAwesomeIcon
                icon={faRibbon}
                className="px-2 text-3xl text-slate-400"
              />
            </span>
            <span className="text-3xl text-slate-400">
              No Campaign available
            </span>
          </div>
          <Link href={previousCampaignsUrl} className="flex justify-center">
            <ButtonPrimary
              label="View our previous campaigns"
              classNameLabel="text-[#3969E0]"
              className={
                "bg-gradient-to-r from-transparent to-transparent pr-2 !shadow-none"
              }
            />
            <div className="flex items-center text-[#3969E0]">
              <span className="-mr-[3px] text-[30px]">·</span>
              <span className="text-[30px]">·</span>
              <span>
                <FontAwesomeIcon icon={faArrowRight} />
              </span>
            </div>
          </Link>
        </>
      )}
    </div>
  );
};

export default CharityCampaigns;
