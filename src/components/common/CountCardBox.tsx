import { ICardDataResponse } from "@/api/common/types";
import React from "react";

const CountCardBox = ({ total_raised, title }: ICardDataResponse) => {
  return (
    <div className="max-w-[353px]  px-[40px] py-[18px] text-center rounded-t-lg  bg-white">
        <h1 className="text-4xl lg:text-6xl font-bold text-[#3969E0]">{total_raised}+</h1>
        <p className="mt-2 text-base font-bold lg:text-[22px] text-[#3969E0]">{title}</p>
    </div>
  );
};

export default CountCardBox;
