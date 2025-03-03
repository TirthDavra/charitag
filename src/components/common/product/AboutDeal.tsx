import React from "react";
import Heading from "../Heading";
import Image from "next/image";
import dealImg from "@images/top_deal_img1.jpg";
import { ISingleProduct } from "@/api/common/productTypes";
import HTMLReactParser from "html-react-parser/lib/index";

interface DealItem {
  title: string;
}

const deal: DealItem[] = [
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

const AboutDeal = ({
  description,
  typeOf,
}: {
  description: string;
  typeOf?: string;
}) => {
  return (
    <div className="mt-10 md:mt-20 lg:mt-32">
      <span className="text-2xl font-bold text-[#2F2F35] md:text-[34px]">
        {`About this ${typeOf}`}
      </span>
      <div className="mt-[15px]">
        <span className="text-sm text-[#2F2F35] md:text-[16px]">
          {HTMLReactParser(description)}
        </span>
      </div>
      <div className="mt-12">
        <span className="text-lg font-bold md:text-[22px]">
          {`About this ${typeOf}`}{" "}
        </span>
        <div className="ml-[5px] xl:w-[782px]">
          <ul className="ml-4 list-disc text-sm md:text-base">
            {deal.map((item, index) => (
              <li
                key={index}
                className=" text-[16px] tracking-normal text-[#2F2F35] marker:mt-[6px] marker:text-2xl marker:text-blue-600"
              >
                {item.title}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mt-12">
        <span className="text-lg font-bold md:text-[22px]">
          {`About this ${typeOf}`}{" "}
        </span>
        <div className="mt-[15px]">
          <span className="text-sm text-[#2F2F35] md:text-[16px]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. In arcu
            cursus euismod quis viverra. Vulputate odio ut enim blandit volutpat
            maecenas volutpat. Cursus risus at ultrices mi tempus imperdiet
            nulla.
          </span>
        </div>
      </div>
      <div className="mt-[30px] border-b-[2px] border-[#eff3fc] md:mt-16 lg:mt-20" />
    </div>
  );
};

export default AboutDeal;
