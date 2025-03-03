import Image from "next/image";
import React from "react";

export interface AllDealsProps {
  deal: boolean;
  img: string;
  rating: string;
  logo: string;
  merchant_name: string;
  product_description: string;
  product_amount: string | number;
  product_amount1: string | number;
  product_discount: string | number;
  logo1: string;
  Product_Donations: string | number;
}

const AllDeals: React.FC<AllDealsProps> = ({
  deal,
  img,
  rating,
  logo,
  merchant_name,
  product_description,
  product_amount,
  product_amount1,
  product_discount,
  logo1,
  Product_Donations,
}) => {
  return (
    <div className="lg:max-w-[220px] ">
      <div className="relative">
        <Image
          className="rounded-xl object-cover shadow-md shadow-gray-400 lg:h-[200px] lg:w-[full]"
          src={img}
          alt=""
          width={100}
          height={100}
        />

        {/* deal */}
        {deal && (
          <div className="absolute bottom-2 left-[5%] w-[90%] rounded-lg bg-gradient-to-r from-gradient_color_2 to-gradient_color_1 p-1">
            <p className="text-center font-bold text-white">
              {/* End of deal: 04d 13h 47m */}
              {deal}
            </p>
          </div>
        )}
      </div>
      <div className="mt-2 p-2 lg:p-0">
        <div className="mb-1 flex gap-5 text-gradient_color_2 lg:block">
          <div className="relative w-fit">
            <i className="fas fa-star mr-1 text-[14px]"></i>
            <span>
              {/* 4.95 (838) */}
              {rating}
              {/* blue dot */}
              <span className="absolute right-[-13px] top-[40%] h-[20%] w-[5px] rounded-full bg-gradient_color_2"></span>
            </span>
          </div>
          <span className="flex items-center gap-1 text-gradient_color_2">
            <span className="h-[16px]">
              <Image src={logo} alt="" className="" />
            </span>
            <span>{merchant_name}</span>
          </span>
        </div>
        <p className="text-md my-2 font-bold text-gray-900">
          {product_description}
        </p>
        <p className="flex items-center whitespace-nowrap lg:justify-between">
          <div>
            <span className="text-gray-400">
              <span className="line-through">${product_amount}</span> From
            </span>
            <span className="font-bold text-orange-500">
              ${product_amount1}
            </span>
          </div>
          <span className="mx-2 rounded-full bg-gradient-to-r from-orange-600 to-orange-400 px-3 py-1 text-white lg:mx-0">
            {`${product_discount} OFF`}
          </span>
        </p>
        <p className="my-1 mb-5 flex items-center gap-1 font-bold text-gradient_color_2">
          <span className="h-[16px]">
            <Image src={logo1} alt="" className="h-full object-cover" />
          </span>
          <span>{`Donations: ${Product_Donations}`}</span>
        </p>
        {/* <div className="flex flex-col items-end gap-3">
                    <ButtonPrimary
                        label={"Delete"}
                        className={"rounded-full !py-0 !px-2"}
                    />

                </div> */}
      </div>
    </div>
  );
};

export default AllDeals;
