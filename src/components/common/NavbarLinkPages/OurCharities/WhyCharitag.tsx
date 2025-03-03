import React from "react";
import charitySampleLogo from "@images/charity-sample-logo2.png";
import Heading from "@/components/common/Heading";
import Image, { StaticImageData } from "next/image";

interface WhyCharitagItem {
  id: number;
  img: StaticImageData;
  title: string;
  description: string;
}

const dummyData: WhyCharitagItem[] = [
  {
    id: 1,
    img: charitySampleLogo,
    title: "Lorem ipsum dolor sit amet",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum, suscipit nihil quos obcaecati reiciendis voluptatem laudantium quaerat voluptate recusandae accusamus.",
  },
  {
    id: 2,
    img: charitySampleLogo,
    title: "Lorem ipsum dolor sit amet",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum, suscipit nihil quos obcaecati reiciendis voluptatem laudantium quaerat voluptate recusandae accusamus.",
  },
  {
    id: 3,
    img: charitySampleLogo,
    title: "Lorem ipsum dolor sit amet",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum, suscipit nihil quos obcaecati reiciendis voluptatem laudantium quaerat voluptate recusandae accusamus.",
  },
  {
    id: 4,
    img: charitySampleLogo,
    title: "Lorem ipsum dolor sit amet",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum, suscipit nihil quos obcaecati reiciendis voluptatem laudantium quaerat voluptate recusandae accusamus.",
  },
  {
    id: 5,
    img: charitySampleLogo,
    title: "Lorem ipsum dolor sit amet",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum, suscipit nihil quos obcaecati reiciendis voluptatem laudantium quaerat voluptate recusandae accusamus.",
  },
  {
    id: 6,
    img: charitySampleLogo,
    title: "Lorem ipsum dolor sit amet",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum, suscipit nihil quos obcaecati reiciendis voluptatem laudantium quaerat voluptate recusandae accusamus.",
  },
];

const WhyCharitag = ({ title }: { title: string }) => {
  return (
    <div className="mt-[100px]">
      <div className="text-center">
        <span className="text-[34px] font-bold leading-[43px] text-[#2F2F35] md:text-[45px] md:leading-[56px]">
           {title}
        </span>
      </div>
      <div className="mt-8 grid grid-cols-[repeat(auto-fill,minmax(274px,1fr))] gap-6 md:gap-5 xl:grid-cols-[repeat(auto-fill,minmax(438px,1fr))]">
        {dummyData.map((item) => (
          <div key={item.id} className="flex gap-6">
            <Image
              src={item.img}
              alt=""
              className="h-[45px] w-[45px] rounded-lg"
            />
            <div className="py-[10px]">
              <div>
                <span className="text-lg font-bold md:text-[22px]">
                  {item.title}
                </span>
              </div>
              <div className="mb-1 mt-2">
                <span className="text-sm md:text-base">{item.description}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhyCharitag;
