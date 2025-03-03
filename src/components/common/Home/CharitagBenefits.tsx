import React from "react";
import logo from "@images/charitag_logo_white.svg";
import Benefits from "./Benefits";
import ButtonPrimary from "../ButtonPrimary";
const CharitagBenefits = () => {
  return (
    <div>
      <div className="lg:mt-56 text-center">
        <span className="font-bold text-[45px] max-xs:text-[33px] max-w-xs max-xs:leading-[43px]">
          Charitag&apos;s benefits
        </span>
        <div className="pt-5 ">
          <span className="text-base leading-[20px] m-auto block max-w-[601px] text-[#6e6f75] md:text-lg">
            You&apos;ll find inspiration in trying something new for yourself
            knowing it will help fuel positive change across Canada and across
            the world.{" "}
          </span>
        </div>
        <div className=" sm:flex justify-center pt-8">

          <ButtonPrimary
            label={`About Charitag`}
            logo={logo}
            className="gap-[12px] h-[50px] !pl-[23px] max-md:w-full flex justify-center !pr-[25px] rounded-full py-3"
            classNameLogo="w-[25px] h-[25px]"
          />
        </div>
      </div>
      <div>
        <Benefits />
      </div>
    </div>
  );
};

export default CharitagBenefits;
