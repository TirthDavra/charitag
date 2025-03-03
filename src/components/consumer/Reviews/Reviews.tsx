import React from "react";
import ReviewCard from "./ReviewCard";
import { IReviews } from "./types";

interface ReviewsProps {
  reviews: IReviews[];
}

const Reviews: React.FC<ReviewsProps> = ({ reviews }) => {
  return (
    <main className="flex flex-col gap-3" >
      {reviews.map((review) => {
        return (
          <div
            className="rounded-xl border-[1.2px] border-borders_color px-5 py-3 "
            key={review.id}
          >
            <ReviewCard review={review} key={review.id} />
          </div>
        );
      })}
    </main>
  );
};

export default Reviews;
