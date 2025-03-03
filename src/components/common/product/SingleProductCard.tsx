import React from "react";
import ButtonPrimary from "../ButtonPrimary";
import blueCharitagLogo from "@images/blue_charitag_logo.svg";
import Image from "next/image";

export interface ISingleProduct {
  id: number;
  amount: string;
  discount_percentage: number;
  product_name: string;
  donation_percentage: number;
}

interface ProductCardProps {
  product: ISingleProduct[];
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const calculateFinalAmount = (
    amount: string,
    discount_percentage: number,
  ) => {
    const discountedAmount =
      parseFloat(amount) - (parseFloat(amount) * discount_percentage) / 100;
    return discountedAmount.toFixed(2);
  };

  return (
    <div className="rounded-xl bg-white pt-[25px] sm:p-[25px] lg:shadow-equally_distributed_bluish">
      <span>
        <span className="text-[22px] font-bold text-[#2F2F35]">From $120</span>{" "}
        <span>/ person</span>
      </span>
      {product.map((item, index) => {
        const isLastProduct = index === product.length - 1;
        const finalAmount = calculateFinalAmount(
          item.amount,
          item.discount_percentage,
        );
        return (
          <div className="pt-5" key={item.id}>
            <div>
              <span className="font-bold text-[#2F2F35]">
                {item.product_name}
              </span>
            </div>
            <div className="mt-1 flex flex-wrap items-center gap-3 whitespace-nowrap md:flex-nowrap">
              <div>
                <span className="text-[18px] text-gray-400">
                  <span className="line-through">${item.amount}</span> From{" "}
                </span>
                <span className="text-[18px] font-bold text-[#f74319]">
                  ${finalAmount}
                </span>{" "}
              </div>
              <span className="h-25px rounded-full bg-gradient-to-r from-orange-600 to-orange-400 px-3 py-1 text-[14px] text-white lg:mx-0">
                {item.discount_percentage}% OFF
              </span>
              <p
                className={`my-1 flex items-center gap-1 font-bold text-gradient_color_2`}
              >
                <span className="h-[16px] w-[10px]">
                  <Image
                    src={blueCharitagLogo}
                    alt=""
                    className="object-cover"
                  />
                </span>
                <span className="text-[14px]">
                  Donations: ${item.donation_percentage}
                </span>
              </p>
            </div>
            <div className="mt-5 flex gap-[15px]">
              <div className="flex w-[102px] items-center space-x-2 rounded-full border-[1px] border-[#cdd9f7]">
                <button
                  className="rounded-l border-r-2 px-3"
                  // onClick={handleDecrement}
                >
                  -
                </button>
                <div className="px-1 text-lg  font-semibold ">1</div>
                <button
                  className="rounded-r border-l-2 px-3 font-bold"
                  // onClick={handleIncrement}
                >
                  +
                </button>
              </div>
              <ButtonPrimary
                label={"Buy"}
                className="flex h-[35px] w-full max-w-[173px] justify-center rounded-full px-[25px] py-[7px] sm:w-auto sm:justify-normal"
              />
            </div>
            {!isLastProduct && (
              <div className="mt-6 border-b-[2px] border-[#ecf0fc]" />
            )}
          </div>
        );
      })}
      <div className="pt-[50px]">
        <div className="rounded-lg border-[1px] border-[#cdd9f7] py-[8px]">
          <p className="text-center text-[18px] font-bold text-[#3969E0]">
            End of deal: 04d 13h 47m
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
