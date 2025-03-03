import Image from "next/image";
import chaitagNewLogo from "@images/charitag_new_logo.webp";
import charitagLogo from "@images/bluish_logo.svg";

const BeginCharitagJourneyText = ({ className }: { className?: string }) => {
  return (
    <div className={`${className} pt-[54px] lg:pl-[30px] lg:pt-[300px]`}>
      <h1 className="text-[34px] font-bold leading-[34px] lg:text-[45px] lg:leading-[56px]">
        {/* <span className="text-[34px] text-gray-700 md:text-5xl ">
          Let&apos;s begin your
        </span>
        <br />
        <span className="text-[34px]  md:text-5xl">
          Charitag journey
        </span> */}
        Let&apos;s begin your Charitag journey
      </h1>
      <p className="mt-4 text-lg text-gray-800 lg:max-w-[90%]">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </p>
    </div>
  );
};

export default BeginCharitagJourneyText;
