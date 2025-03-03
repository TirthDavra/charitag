import React from "react";
import ButtonPrimary from "@/components/common/ButtonPrimary";
import { IAboutData, ISingleCharityData } from "@/api/common/types";

interface Data {
  title: string;
}
const data: Data[] = [
  {
    title:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores repellendus recusandae laudantium Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  },
  {
    title:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores repellendus recusandae laudantium.",
  },
  {
    title:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores repellendus recusandae laudantium Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  },
  {
    title:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores repellendus recusandae laudantium.",
  },
  {
    title:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores repellendus recusandae laudantium.",
  },
];

const AboutCharity = ({
  aboutCharity,
  label,
}: {
  aboutCharity: IAboutData;
  label:string;
}) => {
  return (
    <div className="">
      <span className="text-2xl font-bold text-[#2F2F35] md:text-[34px]">
        {`About the ${label}`}
      </span>
      <div className="mt-5 xl:w-[781px]">
        <span className="text-sm tracking-normal text-[#2F2F35] md:text-[16px]">
          {aboutCharity?.about ||
            "Lorem ipsum dolor sit ametLorem ipsum dolor sit ametLorem ipsum dolor sit ametLorem ipsum dolor sit ametLorem ipsum dolor sit amet"}
        </span>
      </div>

      <div className="mt-12">
        <span className="text-lg font-bold md:text-[22px]">
          Lorem ipsum dolor sit amet
        </span>
        <div className="ml-[5px] xl:w-[782px]">
          <ul className="ml-4 list-disc text-sm md:text-base">
            {data.map((item, index) => (
              <li
                key={index}
                className=" text-[16px] tracking-normal text-[#2F2F35] marker:text-2xl marker:text-blue-600 marker:mt-[6px]"
              >
                {item.title}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-[45px]">
        <ButtonPrimary
          label={"Lorem ipsum"}
          className={
            "flex h-[50px] w-full justify-center rounded-full px-[20px] py-[25px] md:w-[138px] "
          }
        />
      </div>
    </div>
  );
};

export default AboutCharity;
