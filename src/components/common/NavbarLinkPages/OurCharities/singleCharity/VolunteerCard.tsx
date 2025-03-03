import React from "react";
import Heading from "@/components/common/Heading";
import Image, { StaticImageData } from "next/image";

interface Volunteer {
  id: number;
  charityImg: StaticImageData;
  charityLogoImg: StaticImageData;
  description: string;
  category: string;
  city: string;
  volunteers: string;
}

const VolunteerCard: React.FC<{
  charity: Volunteer;
  classNameImg?: string;
}> = ({ charity, classNameImg }) => {
  return (
    <div className="mb-5 flex  min-h-[473px] min-w-[324px] flex-col justify-between rounded-xl shadow-[0_8px_15px_2px_rgba(216,225,255,0.6)]">
      <div>
        <div className="relative w-full">
          <Image
            src={charity.charityImg}
            alt=""
            className={`h-full max-h-[211px] w-full rounded-t-xl object-cover ${classNameImg}`}
          />
          <Image
            src={charity.charityLogoImg}
            className={`absolute left-3 top-3 h-[75px] w-[75px] rounded-xl `}
            alt="img"
          />
        </div>
        <div className="bg-transparent px-[14px] pt-[15px]">
          <Heading content={charity.description} varient={"xl"} />

          <div className="flex items-center gap-[25px] pt-[10px]">
            <span className="relative text-[16px] font-bold underline">
              {charity.category}
              <span className="absolute right-[-15px] top-[40%] h-[5px] w-[5px] rounded-full bg-gradient_color_2"></span>
            </span>
            <span className="text-[16px] font-bold underline">
              {charity.city}
            </span>
          </div>
        </div>
      </div>

      <div className="mx-auto mb-[35px] w-[calc(100%-25px)] rounded-lg border-[1px] border-[#cdd9f7] px-[14px]">
        <p className="py-[11px] text-center text-[18px] font-bold text-blue-600">
          {`${charity.volunteers} volunteers wanted`}
        </p>
      </div>
    </div>
  );
};

export default VolunteerCard;
