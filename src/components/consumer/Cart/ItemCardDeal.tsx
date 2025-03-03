"use client";
import React, { useState } from "react";
import Heading from "@/components/common/Heading";
import Image from "next/image";
import image from "@images/wish_resturant.jpg";
import logo from "@images/blue_charitag_logo.svg";
import { ISingleProduct } from "@/api/common/productTypes";
import { discountCalculator } from "@/utils/basicfunctions";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ICartDealItem, ICartItemDeal } from "@/api/user/types";

export interface ItemCardProps {
  deal: ICartItemDeal;
  showQuantityAdjuster?: boolean;
  quantity: number;
  setQuantity?: React.Dispatch<React.SetStateAction<number>>;
  classNameQunatity?: string;
  handleRemoveItem?: () => void;
  onQuantityChange: (qty: number, increment: number) => void;
}

const ItemCardDeal: React.FC<ItemCardProps> = ({
  deal,
  showQuantityAdjuster,
  quantity,
  handleRemoveItem,
  onQuantityChange,
}) => {
  const [pQuantity, setPQuantity] = useState(quantity);
  const calculateFinalAmount = (
    amount: string | number,
    discountPercentage: string | number,
  ) => {
    const discountedAmount = (
      Number(amount) -
      (Number(amount) * Number(discountPercentage)) / 100
    ).toFixed(2);
    return discountedAmount;
  };

  const handleIncrement = () => {
    const qty = pQuantity + 1;
    onQuantityChange(1, 1);
    setPQuantity(qty);
  };

  const handleDecrement = () => {
    if (pQuantity > 1) {
      const qty = pQuantity - 1;
      onQuantityChange(1, 0);

      setPQuantity(qty);
    } else {
      handleRemoveItem && handleRemoveItem();
    }
  };

  const disPercent = discountCalculator(
    Number(deal?.price?.sale_price || 0),
    Number(deal?.price?.regular_price || 0),
  );

  return (
    <div className="relative mt-8 flex flex-col gap-3 pr-[10px] sm:flex-row">
      <div className="relative aspect-square h-[110px] w-[120px] min-w-[120px]  rounded-md shadow-sm shadow-gray-400">
        <Image
          src={
            deal?.feature_image?.medium_path
              ? process.env.NEXT_PUBLIC_APP_IMAGE_API_ENDPOINT +
                  deal.feature_image.medium_path || ""
              : ""
          }
          fill={true}
          sizes="fit"
          alt={`${deal.id}`}
          className=" "
        />
      </div>
      <div className="flex-grow p-1">
        <Heading content={deal.product_name} />
        <div>
          <div className="flex items-center gap-2 whitespace-nowrap lg:justify-between">
            <div>
              {deal.price?.regular_price !== "0" && (
                <span className="text-gray-400">
                  <span className="line-through">
                    $
                    {Number(deal?.price?.regular_price)
                      .toFixed(2)
                      .replace(/\.00$/, "") ?? 0}
                  </span>{" "}
                </span>
              )}
              <span className="bg-[linear-gradient(239.52deg,rgba(248,92,54,0.65)0%,#F85C36_100%)] bg-clip-text font-bold text-transparent">
                $
                {Number(deal?.price?.sale_price)
                  .toFixed(2)
                  .replace(/\.00$/, "") ?? 0}
              </span>
            </div>
            {disPercent !== 0 && (
              <div className="rounded-full bg-[linear-gradient(239.52deg,rgba(248,92,54,0.65)0%,#F85C36_100%)] px-3 py-1 text-white lg:mx-0">
                {`${disPercent}% OFF`}
              </div>
            )}
          </div>
        </div>
        <div>
          {deal?.price?.donation_amount && (
            <p className="my-1 mb-5 flex items-center gap-1 font-bold text-gradient_color_2">
              <span className="h-[18px] w-[12px]">
                <Image src={logo} alt="" className="h-full object-cover" />
              </span>
              <span>{`Donations: $${
                Number(deal?.price?.donation_amount)
                  .toFixed(2)
                  .replace(/\.00$/, "") ?? 0
              }`}</span>
            </p>
          )}
        </div>
        {showQuantityAdjuster && (
          <div className="flex max-w-fit items-center space-x-2 rounded-full border-2">
            <button
              className="  rounded-l  border-r-2 px-2"
              onClick={handleDecrement}
            >
              -
            </button>
            <div className="px-1 text-lg  font-semibold ">{pQuantity}</div>
            <button
              className="  rounded-r  border-l-2 px-2"
              onClick={handleIncrement}
            >
              +
            </button>
          </div>
        )}
        {handleRemoveItem && (
          <button className="absolute right-1 top-[-10px]">
            <FontAwesomeIcon icon={faTimes} onClick={handleRemoveItem} />
          </button>
        )}
      </div>
    </div>
  );
};

export default ItemCardDeal;
