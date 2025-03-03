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
import Link from "next/link";

export interface Product {
  product_description: string;
  amount: string;
  discount_percentage: number;
  donation_percentage: number;
  id: number;
}

export interface IItemCardProduct {
  id: number | string | null;
  image: string;
  name: string;
  s_price: string | number;
  r_price: string | number;
  donation_percentage: string | number;
  donation_amount?: number;
  isDeal: boolean;
  slug: string;
}

export interface ItemCardProps {
  product: IItemCardProduct;
  showQuantityAdjuster?: boolean;
  quantity: number;
  setQuantity?: React.Dispatch<React.SetStateAction<number>>;
  classNameQunatity?: string;
  handleRemoveItem?: () => void;
  onQuantityChange: (qty: number, increment: number) => void;
}

const ItemCard: React.FC<ItemCardProps> = ({
  product,
  showQuantityAdjuster,
  quantity,
  handleRemoveItem,
  onQuantityChange,
}) => {
  const [pQuantity, setPQuantity] = useState(quantity);
  // const calculateFinalAmount = (
  //   amount: string | number,
  //   discountPercentage: string | number,
  // ) => {
  //   const discountedAmount = (
  //     Number(amount) -
  //     (Number(amount) * Number(discountPercentage)) / 100
  //   ).toFixed(2);
  //   return discountedAmount;
  // };

  const handleIncrement = () => {
    const qty = pQuantity + 1;
    onQuantityChange(qty, 1);
    setPQuantity(qty);
  };

  const handleDecrement = () => {
    if (pQuantity > 1) {
      const qty = pQuantity - 1;
      onQuantityChange(qty, 0);

      setPQuantity(qty);
    } else {
      handleRemoveItem && handleRemoveItem();
    }
  };

  return (
    <div className="relative mt-8 flex flex-col gap-3 pr-[10px] sm:flex-row">
      <Link
        href={`${product.isDeal ? "/deal/" : "/shop/"}${product.slug}`}
        className="relative aspect-square h-[110px] w-[120px] min-w-[120px] rounded-md shadow-sm shadow-gray-400"
      >
        <Image
          src={process.env.NEXT_PUBLIC_APP_IMAGE_API_ENDPOINT + product.image}
          fill={true}
          sizes="fit"
          alt={`${product.id}`}
          className=""
        />
      </Link>
      <div className="flex-grow p-1">
        <Link href={`${product.isDeal ? "/deal/" : "/shop/"}${product.slug}`}>
          <Heading content={product.name} />
        </Link>
        <div>
          <div className="flex items-center gap-2 whitespace-nowrap">
            <div>
              <span className="text-gray-400">
                <span className="line-through">
                  $
                  {Number(product.r_price).toFixed(2).replace(/\.00$/, "") ??
                    "0.00"}
                </span>{" "}
              </span>
              <span className="bg-[linear-gradient(239.52deg,rgba(248,92,54,0.65)0%,#F85C36_100%)] bg-clip-text font-bold text-transparent">
                $
                {Number(product.s_price).toFixed(2).replace(/\.00$/, "") ??
                  "0.00"}
              </span>
            </div>
            <div className="rounded-full bg-[linear-gradient(239.52deg,rgba(248,92,54,0.65)0%,#F85C36_100%)] px-3 py-1 text-white lg:mx-0">
              {`${discountCalculator(Number(product.s_price), Number(product.r_price))}% OFF`}
            </div>
          </div>
        </div>
        <div>
          {product?.donation_amount && (
            <p className="my-1 mb-5 flex items-center gap-1 font-bold text-gradient_color_2">
              <span className="h-[18px] w-[12px]">
                <Image src={logo} alt="" className="h-full object-cover" />
              </span>
              <span>
                {isNaN(product?.donation_amount || 0)
                  ? 0
                  : `Donations: $${
                      Number(product?.donation_amount)
                        .toFixed(2)
                        .replace(/\.00$/, "") ?? "0.00"
                    }`}
              </span>
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
          <button className="absolute right-1 top-[-10px] pr-2">
            <FontAwesomeIcon icon={faTimes} onClick={handleRemoveItem} />
          </button>
        )}
      </div>
    </div>
  );
};

export default ItemCard;
