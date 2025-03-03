import React from "react";
import Image from "next/image";
import { IReviews } from "./types";
import RatingStar from "./RatingStar";
interface ReviewCardProps {
  review: IReviews;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  return (
    <div className="">
      <div
        className="flex min-h-0 min-w-0 items-center justify-between overflow-auto lg:overflow-hidden"
        key={review.id}
      >
        <div>
          <Image
            src={review.product_image || ""}
            className="h-[50px] w-[50px] min-w-[50px] rounded-md"
            alt=""
            width={600}
            height={600}
          />
        </div>

        <div className="ml-5 grid min-w-[438px] flex-grow grid-cols-2 justify-between gap-x-4">
          <div className="col-span-2 grid min-w-[340px] grid-cols-2  ">
            <div className="flex ">
              <span className="text-[#2F2F35]">Name:</span>
              <span className="font-bold text-[#2F2F35]">
                {review.product_name}
              </span>
            </div>
            <div className="flex">
              <span className="text-[#2F2F35]">Qty:</span>
              <span className="font-bold text-[#2F2F35]">
                {review.product_quantity}
              </span>
            </div>
          </div>
          <div className="col-span-2">
            <span className="text-[#2F2F35]">Desc:</span>
            <span className="font-bold text-[#2F2F35]">
              {review.product_description}
            </span>
          </div>
        </div>
        <div className="min-w-[100px]">
          <RatingStar review={review} activeColor="#ffd700" />
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
