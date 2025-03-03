"use client";
import React from "react";
import ReactStars from "@stack-pulse/react-star-rating";

const RatingStarFilter: React.FC<{ rating: number }> = ({ rating }) => {
  return (
    <div className="">
      <ReactStars
        count={5}
        value={rating}
        size={24}
        activeColor="#fcb200"
        color="#cdd9f7"
        isHalf
        edit={false}
      />
    </div>
  );
};

export default RatingStarFilter;
