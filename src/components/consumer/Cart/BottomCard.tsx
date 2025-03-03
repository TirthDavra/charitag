import React from "react";
import Heading from "@/components/common/Heading";
import Image, { StaticImageData } from "next/image";
import cartImg from "@images/cart-images1.png";
import cartImg2 from "@images/cart-images2.png";

interface CardProps {
  logo: StaticImageData;
  title: string;
  description: string;
  className?: string;
}

const Card: React.FC<CardProps> = ({ logo, title, description, className }) => {
  return (
    <div className={`flex flex-col items-center ${className} p-3 text-center`}>
      <Image src={logo} className="mb-2 h-[50px] w-[50px]" alt="" />
      <Heading content={title} varient="xl" />
      <p className="mt-2">{description}</p>
    </div>
  );
};
const BottomCard: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-2 mt-5 rounded-lg border border-blue-200 p-5 ${className}`}
    >
      <Card
        className="border-b-1 border-b md:border-b-0 md:border-r-1 md:border-r border-blue-200"
        logo={cartImg}
        title="30-day- Money-back guarantee"
        description={"Lorem ipsum dolor sit amet consectetur adipisicing elit."}
      />

      <Card
        logo={cartImg2}
        title="Secure Transaction"
        description={
          "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Esse sit suscipit ipsam."
        }
        className={""}
      />
    </div>
  );
};

export default BottomCard;
