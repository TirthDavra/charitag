import { getWishlist } from "@/api/common/deals";
import Await from "@/components/common/Await";
import SavedDeal from "@/components/consumer/SavedDeals/SavedDeal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Suspense } from "react";
import { faCartArrowDown } from "@fortawesome/free-solid-svg-icons";

const page = async ({
  searchParams,
}: {
  searchParams: { "wish-category": string; category: string };
}) => {
  const savedDeals = getWishlist(searchParams["wish-category"] || "");
  return (
    <main className="my-5 w-full pt-7">
      <Suspense
        key={Math.random()}
        fallback={
          <div className="h-[500px] animate-pulse">
            <div className="my-[13px] h-[20px] bg-gray-100"></div>
            <div className="my-[13px] h-[20px] bg-gray-100"></div>
            <div className="my-[16px] h-[113px] bg-gray-100"></div>
            <div className="my-[16px] h-[113px] bg-gray-100"></div>
            <div className="my-[16px] h-[113px] bg-gray-100"></div>
            <div className="my-[16px] h-[113px] bg-gray-100"></div>
            <div className="my-[16px] h-[113px] bg-gray-100"></div>
            <div className="my-[16px] h-[113px] bg-gray-100"></div>
            <div className="my-[16px] h-[113px] bg-gray-100"></div>
            <div className="my-[16px] h-[113px] bg-gray-100"></div>
            <div className="my-[16px] h-[113px] bg-gray-100"></div>
          </div>
        }
      >
        <Await promise={savedDeals}>
          {(savedDeals) => {
            return (
              <SavedDeal savedDeals={savedDeals} searchParams={searchParams} />
            );
          }}
        </Await>
      </Suspense>
    </main>
  );
};

export default page;
