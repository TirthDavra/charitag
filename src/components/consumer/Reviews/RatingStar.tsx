"use client";
import React from "react";
import ReactStars from "@stack-pulse/react-star-rating";
import { IReviews } from "./types";

interface ReviewCardProps {
  review?: IReviews;
  activeColor: string;
  color?: string;
  edit?: boolean;
  handleStarchanege?: (value: number) => void;
  isHalf?: boolean;
}

const RatingStar = ({
  review,
  activeColor,
  color,
  edit = false,
  handleStarchanege,
  isHalf = true,
}: ReviewCardProps) => {
  const handleClick = (rate: number) => {
    if (edit && handleStarchanege) {
      handleStarchanege(rate);
    }
  };
  return (
    <div className="min-w-[140px]">
      <ReactStars
        count={5}
        value={review?.rating}
        size={30}
        activeColor={activeColor}
        isHalf={isHalf}
        edit={edit}
        color={color}
        onChange={(value) => handleClick(value)}
      />
    </div>
  );
};

export default RatingStar;
