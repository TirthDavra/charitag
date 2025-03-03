"use client";
import { IconReview } from "@/components/svgIcons";
import ReactStars from "@stack-pulse/react-star-rating";
import { Star } from "lucide-react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import React, { useCallback } from "react";

interface AvgReviewProps {
  review: string;
}
const AvgReview = ({}: AvgReviewProps) => {
  const stars = [4, 3, 2, 1, 0];
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const createQueryString = useCallback(
    (value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("rating", value);
      params.set("page", "1");

      return params.toString();
    },
    [searchParams],
  );
  return (
    <div>
      <div className="flex cursor-pointer justify-between font-semibold text-merchant_text_color_blue">
        Avg. Customer Review
      </div>
      <div className="space-y-3 pt-2">
        {stars.map((star) => {
          const selectedStar = Number(searchParams.get("rating") || -1);
          return (
            <Link
              key={star}
              href={`?${createQueryString(star.toString())}`}
              className="cursor-pointer"
            >
              <div className="flex cursor-pointer gap-4 py-1" key={star}>
                <ReactStars
                  count={5}
                  value={star}
                  size={30}
                  edit={false}
                  emptyIcon={
                    <Star
                      color="#ffd700"
                      className={`${selectedStar === star ? "text-[#ff9e3e] drop-shadow-lg" : ""}`}
                    />
                  }
                  filledIcon={
                    <Star
                      fill="#fcb200"
                      color="#fcb200"
                      className={`${selectedStar === star ? "text-[#ff9e3e] drop-shadow-lg" : ""}`}
                    />
                  }
                  classNames="flex gap-2 cursor-pointer"
                />
                & Up
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default AvgReview;
