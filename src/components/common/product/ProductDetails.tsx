import React from "react";
import Heading from "../Heading";
import ButtonPrimary from "../ButtonPrimary";
import charitagLogoInBadge from "@images/charitag_logo_in_badge.png";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import share from "@images/share.svg";
import { ISingleProduct } from "@/api/common/productTypes";
import AddToWishlist from "../AddToWishlist";
import Breadcrumb from "../BreadCrumbs";

export interface IProductDetails {
  id: number;
  slug: string;
  product_name: string;
  merchant: {
    businessName: string;
    first_name: string;
    city: string;
    country: string;
  };
}
export interface ProductDetailsProps {
  product: IProductDetails;
  className?:string;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product,className }) => {
  return (
    <div>
      <div className="hidden md:block">
        <Breadcrumb
          items={[
            {
              href: "/shop",
              label: "Shop",
            },
            {
              href: `/shop/${product.slug}`,
              label: product.product_name,
            },
          ]}
        />
      </div>
      <div className={`pt-[75px] md:pt-8 ${className}`}>
        <span className="text-[34px] font-bold leading-[34px] text-[#2F2F36] md:text-[45px] md:leading-[56px]">
          {product?.product_name}
        </span>
      </div>
      <div className="mt-2 flex flex-wrap gap-[10px] sm:gap-[25px]">
        <span className="text-[18px] text-[#3969E0]">
          {product.merchant?.businessName || product.merchant?.first_name || ""}
        </span>
        <span className="text-[18px] text-[#2F2F35] underline">
          {product.merchant?.city || product.merchant?.country || ""}
        </span>
      </div>

      <div className="flex items-center justify-between ">
         <div className="mt-[10px] grid grid-cols-1 gap-[10px] lg:mt-[15px] lg:flex lg:gap-[20px]">
          <div className="flex items-center gap-[10px]">
            <FontAwesomeIcon
              icon={faStar}
              className="text-[16px] text-gradient_color_2"
            />
            <span className="text-[#3969E0]"> {4.5}</span>
            <span className="relative font-bold text-[#2F2F35] underline">
              {`${828} ${"Reviews"}`}
              <span className="absolute right-[-14px] top-[40%] h-[5px] w-[5px] rounded-full bg-gradient_color_2"></span>
            </span>
          </div>
          <div className="flex items-center gap-[10px]">
            <Image
              src={charitagLogoInBadge}
              alt=""
              className="h-[20px] w-[16px] object-cover"
            />
            <span className="relative text-[#3969E0]">
            {product.merchant.businessName || "Merchant"}
              <span className="absolute right-[-14px] top-[40%] h-[5px] w-[5px] rounded-full bg-gradient_color_2"></span>
            </span>
            <span className="ml-[13px] font-bold text-[#2F2F35] underline">
              {" "}
              {product.merchant?.city || "City"}
            </span>
          </div>
        </div>
        <div className="hidden gap-[35px] lg:flex">
          <div className="flex items-center justify-center rounded-full px-1 hover:bg-slate-400/10">
            {/* <FontAwesomeIcon icon={faShareNodes} /> */}
            <Image src={share} alt="" />
            <ButtonPrimary
              label={"Share"}
              classNameLabel="text-black underline"
              className="bg-gradient-to-r from-transparent to-transparent !px-2 !shadow-none"
            />
          </div>
          <div className="flex items-center">
            {/* <FontAwesomeIcon
              icon={faHeart}
              // style={heartStyle}
              className=""
            /> */}
            {/* <AddToWishlist
              product={product}
              inWishlistLabel="Save"
              notInWishlistLabel="Remove"
              classNameLabel="text-black underline font-semibold text-[16px]"
              className="flex gap-1"
              classNameIcon="text-normal"
            /> */}
            {/* <ButtonPrimary
              label={"Save"}
              classNameLabel="text-black underline"
              className="bg-gradient-to-r from-transparent to-transparent !px-2 !shadow-none"
            /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
