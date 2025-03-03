import React from "react";
import about1 from "@images/about-charitag-icon1.png";
import about2 from "@images/about-charitag-icon2.png";
import about3 from "@images/about-charitag-icon3.png";
import Image from "next/image";

const benefits = [
  {
    id: 1,
    img: about1,
    title: "We make it simple and safe",
    description:
      "Charitag makes it fast and easy for you to fundraise and to gain awareness with the next generation of potential donors",
  },
  {
    id: 2,
    img: about2,
    title: "Make a meaningful difference",
    description:
      "Get new customers with a marketing tool fit for the world today and help your community while doing good business - it's win-win",
  },
  {
    id: 3,
    img: about3,
    title: "Give back while you save",
    description:
      "Not only do we provide savings opportunities but also a simple way for you to give back and it's FREE to join.",
  },
];

const Benefits = () => {
  return (
    <div className="mt-20 grid grid-cols-1 justify-between gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-0">
      {benefits.map((item) => (
        <div className="flex items-center justify-center" key={item.id}>
          <div
            key={item.id}
            className="max-w-[323px] text-center md:flex md:items-start md:justify-center md:text-center lg:block lg:text-center"
          >
            <div className="flex justify-center md:flex-shrink-0">
              <Image
                src={item.img}
                alt=""
                className="flex items-center  justify-center"
                height={75}
                width={72}
              />
            </div>
            <div className="mt-6 md:ml-4 md:mt-0 lg:ml-0 lg:mt-6 max-w-[289px]">
              <div className="mt-3 text-center">
                <span className="text-3xl md:text-4xl font-bold">{item.title}</span>
              </div>
              <div className="mt-3 text-sm text-[#6e6f75]">
                <span>{item.description}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Benefits;
