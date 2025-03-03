import React from "react";
import ButtonPrimary from "@/components/common/ButtonPrimary";
import Heading from "@/components/common/Heading";

interface CharityDescriptionProps {
  className?: string;
  classNameHeading?: string;
  classNamePara?: string;
}

const CharityDescription: React.FC<CharityDescriptionProps> = ({
  className,
  classNameHeading,
  classNamePara,
}) => {
  return (
    <div className={className}>
      <div className="mb-5 mt-5  md:mb-0 md:mt-0">
        <span className="text-[34px] font-bold leading-[43px] text-[#2F2F35]   md:text-[45px] md:leading-[56px]">
          You can help by volunteering
        </span>
      </div>
      <div className=" mb-10 md:mb-0 md:mt-5">
        <span className=" text-base font-medium text-[#2F2F35] md:text-lg">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.{" "}
        </span>
      </div>
      <div className="mt-5">
        <ButtonPrimary
          label={"View all our mission"}
          className={
            "flex h-[50px] w-full justify-center rounded-full px-[25px] py-[15px] sm:w-[184px] sm:justify-start"
          }
        />
      </div>
    </div>
  );
};

export default CharityDescription;
