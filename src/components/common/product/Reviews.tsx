import React from "react";
import ButtonPrimary from "../ButtonPrimary";
import Image, { StaticImageData } from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faStar } from "@fortawesome/free-solid-svg-icons";
import { IReview } from "@/api/common/types";
import { getMonthAndYear } from "@/utils/basicfunctions";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

const Reviews = ({ review }: { review: IReview[] }) => {
  return (
    <div className="mt-[0px]">
      <div>
        <div className="mt-10 flex gap-5 overflow-x-auto scrollbar scrollbar-track-transparent md:grid md:grid-cols-[repeat(auto-fit,minmax(250px,1fr))] md:gap-x-[95px] md:gap-y-[45px]">
          {review.map((item, index) => {
            const monthAndYear = getMonthAndYear(item.created_at);

            return (
              <div
                key={index}
                className="min-w-[250px] rounded-xl border-[2px] border-[#eff3fc] p-[15px] md:border-none md:p-0"
              >
                <div className=" flex gap-[25px] ">
                  <Image
                    src={
                      item?.customer?.profile_image?.thumbnail_path
                        ? process.env.NEXT_PUBLIC_APP_IMAGE_API_ENDPOINT +
                          item?.customer?.profile_image?.thumbnail_path
                        : ""
                    }
                    alt=""
                    className="h-[50px] w-[50px] rounded-full"
                    width={100}
                    height={100}
                  />
                  <div>
                    <div>
                      <span className="text-md font-bold text-[#2F2F35]">
                        {item?.customer?.first_name} {item?.customer?.last_name}
                      </span>
                    </div>
                    <div>
                      <span className="text-[14px] text-gray-400">
                        {`${monthAndYear.month} ${monthAndYear.year}`}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="pt-[18px]">
                  <span className="text-sm text-[#2F2F35] md:text-base">
                    {item?.description || ""}
                  </span>
                </div>
                <HoverCard openDelay={5} closeDelay={300}>
                  <HoverCardTrigger asChild>
                    <div className="mt-[10px] flex items-center gap-3">
                      <ButtonPrimary
                        label={"Read More"}
                        classNameLabel="text-black underline"
                        className="bg-gradient-to-r from-transparent to-transparent pl-0 pr-0 !shadow-none"
                      />
                      <FontAwesomeIcon icon={faChevronRight} />
                    </div>
                  </HoverCardTrigger>
                  <HoverCardContent className="bg-white">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Esse culpa aperiam placeat, explicabo similique harum.
                  </HoverCardContent>
                </HoverCard>
              </div>
            );
          })}
        </div>
      </div>

      {/* <div className="flex justify-center md:justify-start">
        <ButtonPrimary
          label={"Show All 838 Reviews"}
          className={
            "mt-8 flex h-[50px] w-full justify-center rounded-full px-[25px] py-[20px] md:w-[198px] md:justify-start"
          }
        />
      </div> */}
    </div>
  );
};

export default Reviews;
