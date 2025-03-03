"use client";
import React, { useEffect, useState } from "react";
import Reviews from "../product/Reviews";
import { ReviewData } from "@/api/common/types";
import ShowMore from "../NavbarLinkPages/CorporateFundraisers/ShowMore";
import DataNotAvailable from "../DataNotAvailable";

const ReviewsContainer = ({ review }: { review: ReviewData }) => {
  const [reviewsData, setReviewsData] = useState(review.data);

  const [curPage, setCurPage] = useState(1);

  const handlePageChange = (newPage: number) => {
    setCurPage(newPage);
  };

  useEffect(() => {
    setReviewsData(review.data);
    setCurPage(1);
  }, []);

  return (
    <div>
      {reviewsData?.length === 0 ? (
        <>
          <Reviews review={reviewsData} />
          <div className="pt-6">
            <ShowMore
              page={curPage}
              handlePageChange={handlePageChange}
              setData={setReviewsData}
              url="/reviews"
              accessorKey="data"
              total={review?.total}
              currentLength={reviewsData?.length}
              per_page={4}
            />
          </div>
        </>
      ) : (
        <DataNotAvailable title="No reviews available" />
      )}
    </div>
  );
};

export default ReviewsContainer;
