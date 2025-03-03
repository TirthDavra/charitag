import { IDataData, IProductNew } from "@/api/common/types";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import productImage from "@images/wish_resturant.jpg";
import charitagLogoInBadge from "@images/charitag_logo_in_badge.png";
import blueCharitagLogo from "@images/blue_charitag_logo.svg";
import Parse from "html-react-parser";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import ButtonPrimary from "./ButtonPrimary";
import AddToWishlist from "./AddToWishlist";
import { discountCalculator } from "@/utils/basicfunctions";
// import { auth } from "auth";

interface IProductProps {
  showHeart?: boolean;
  product: IDataData | IProductNew;
  deal?: boolean;
  showAddToCart?: boolean;
  classNameImage?: string;
  className?: string;
  classNameDetails?: string;
  classnameDeal?: string;
  classNameImageWrapper?: string;
  handleDelete?: (val: number) => void;
  onImageClick?: (
    event: React.MouseEvent<HTMLImageElement, MouseEvent>,
  ) => void;
}
const ProductCard = ({
  showHeart = true,
  product,
  deal = true,
  showAddToCart = true,
  classNameImage,
  className,
  classNameDetails,
  classnameDeal,
  classNameImageWrapper,
  onImageClick,
  handleDelete,
}: IProductProps) => {
  const disPercent = discountCalculator(
    Number(product?.price?.sale_price || 0),
    Number(product?.price?.regular_price || 0),
  );

  return (
    <div
      className={`relative mb-2 h-full min-w-[221px] rounded-br-xl ${className}`}
    >
      <Link
        href={
          product.slug
            ? `/${deal ? `deal/${product.slug}` : `shop/${product.slug}`}`
            : "/"
        }
      >
        <div className={`relative aspect-square ${classNameImageWrapper}`}>
          <Image
            className={`w-full rounded-xl lg:h-[300px] ${classNameImage} aspect-square`}
            src={
              product.feature_image?.medium_path
                ? process.env.NEXT_PUBLIC_APP_IMAGE_API_ENDPOINT +
                  encodeURIComponent(product.feature_image?.medium_path)
                : productImage
            }
            alt="product image"
            fill={true}
            onClick={onImageClick}
          />

          {deal && (
            <div
              className={`absolute bottom-2 left-[5%] w-[90%] rounded-lg bg-gradient-to-r from-gradient_color_2 to-gradient_color_1 p-1 lg:left-[32%] lg:w-[65%] ${classnameDeal}`}
            >
              <p className="text-center font-bold text-white">
                Limited time deal
              </p>
            </div>
          )}
        </div>
      </Link>
      {showHeart && (
        <AddToWishlist
          product={{
            id: product.id,
            is_wishlist: product?.is_wishlist || null,
          }}
          className="absolute right-4 top-2"
          isDeal={deal}
        />
      )}
      <div className={`px-2 ${classNameDetails}`}>
        <div className={`text-[#3969E0]`}>
          <div
            className={`flex flex-col flex-wrap gap-2 pt-[14px] md:flex-row md:items-center`}
          >
            <div className="flex w-fit items-center">
              <span className="flex items-center gap-1">
                <FontAwesomeIcon icon={faStar} className="h-[14px] w-[14px]" />
                {/* {isProduct(product) && product.rating
                  ? product.rating
                  : "4.95 (838)"} */}
                4.95 (838)
                {/* {/ blue dot /} */}
                <span className="h-[5px] w-[5px] rounded-full bg-gradient_color_2"></span>
              </span>
            </div>
            <div className="flex gap-[5px] text-gradient_color_2">
              <Image
                src={charitagLogoInBadge}
                alt=""
                className="h-full w-full max-w-[12px] object-cover pt-1"
                width={11}
                height={14}
              />
              <span className="line-clamp-1 capitalize">
                {product?.merchant?.first_name || ""}
              </span>
            </div>
          </div>
        </div>
        <div className="flex h-full flex-col justify-between">
          <div className="my-[10px] truncate text-start font-bold text-[#2F2F35]">
            {Parse(product.product_name || "")}
          </div>
          <div className="flex flex-wrap items-center gap-1 whitespace-nowrap md:gap-2">
            <div>
              <span className="inline-block bg-[linear-gradient(239.52deg,rgba(248,92,54,0.65)0%,#F85C36_100%)] bg-clip-text text-lg font-bold  text-transparent">
                ${Number(product?.price?.sale_price || 0)}
              </span>
              {product.price?.sale_price !== product.price?.regular_price && (
                <>
                  <span className="text-sm text-homepage_card_text">
                    {" "}
                    From{" "}
                  </span>
                  <span className="text-lg text-homepage_card_text line-through opacity-[50%]">
                    $
                    {Number(product.price?.regular_price)
                      .toFixed(2)
                      .replace(/\.00$/, "") ?? "0.00"}
                  </span>
                </>
              )}
            </div>
            {disPercent !== 0 && (
              <span className="rounded-full bg-[linear-gradient(239.52deg,rgba(248,92,54,0.65)0%,#F85C36_100%)] px-[10px] py-[2px] text-[14px] font-bold text-white shadow-[0_6px_10px_0_rgba(248,92,54,0.2)]">
                {discountCalculator(
                  Number(product?.price?.sale_price || 0),
                  Number(product?.price?.regular_price || 0),
                )}
                % OFF
              </span>
            )}
          </div>
          <div
            className={`my-1 flex  items-center gap-1 font-bold text-gradient_color_2`}
          >
            <span className="h-[16px] w-[10px]">
              <Image src={blueCharitagLogo} alt="" className="h-full" />
            </span>
            <span className="text-[14px] text-[#3969E0]">
              Donations: $
              {isNaN(Number(product.price?.donation_amount))
                ? 0
                : Number(product.price?.donation_amount)}
            </span>
          </div>
        </div>

        <div className="flex flex-col items-center gap-3">
          {showAddToCart && (
            <div className="mt-5">
              <ButtonPrimary
                label={"Add to cart"}
                className={"rounded-full py-1"}
              />
            </div>
          )}
          {handleDelete && (
            <button
              type="submit"
              className="text-gradient_color_2 underline"
              onClick={() => handleDelete(product.id)}
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
