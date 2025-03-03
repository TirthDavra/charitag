import React from "react";
import Reviews from "./Reviews";
import productImg from "@images/wish_resturant.jpg";
import ButtonPrimary from "@/components/common/ButtonPrimary";
import { IReviews } from "./types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
// import { Rating } from "@smastrom/react-rating";

const dummyReviews: IReviews[] = [
  {
    id: 1,
    product_image: productImg,
    product_name: "Product Name",
    product_description: "Lorem ipsum dolor sit, amet consectetur adipisicing.",
    rating: 1,
    product_quantity: 12,
  },
  {
    id: 2,
    product_name: "Product Name",
    product_image: productImg,
    product_description: "Lorem ipsum dolor sit, amet consectetur adipisicing.",
    rating: 3.5,
    product_quantity: 12,
  },
  {
    id: 3,
    product_name: "Product",
    product_image: productImg,
    product_description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing Lorem ipsum dolor sit, amet consectetur adipisicing.. ",
    rating: 4.5,
    product_quantity: 12,
  },
];
const ConsumerReviews: React.FC = () => {
  return (
    <div className="mt-[30px]">
      <h1 className="mb-[10px] text-[34px] font-bold text-merchant_sidebar_text">
        My Reviews
      </h1>
      {/* <Rating style={{ maxWidth: 180 }} value={3} readOnly orientation="horizontal"/> */}
      <p className="text-merchant_sidebar_text">
        Voices of Satisfaction: Customer Reviews that Speak Volumes.
      </p>
      {dummyReviews?.length > 0 ? (
        <div>
          <div className="mb-[45px] mt-[25px] flex flex-col gap-5">
            <Reviews reviews={dummyReviews} />
          </div>
          <ButtonPrimary label={"load more"} className={"w-fit rounded-full !h-[50px]"} />
        </div>
      ) : (
        <div className="flex h-96 items-center justify-center">
          <div className="text-center">
            <div className="mb-2 text-gray-400">
              <FontAwesomeIcon icon={faStar} className="text-8xl" />
            </div>
            <div className="text-2xl font-bold text-gray-400">
              No reviews available
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConsumerReviews;
