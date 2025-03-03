import React from "react";
import Heading from "@/components/common/Heading";
import ImageSlider2 from "@/components/common/product/ImageSlider2";
import Parse from "html-react-parser";
import { ICorporateFundraiserBySlug } from "@/api/common/types";

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

const AboutCorporate = ({
  corporateDetails,
}: {
  corporateDetails: ICorporateFundraiserBySlug;
}) => {
  return (
    <div className="lg:-mt-60 xl:-mt-48">
      <Heading
        content={"Presentation of the campaign"}
        varient={"4xl"}
        className="font-bold max-md:text-[24px]"
      />
      <div className="mt-3">
        <span className="text-md text-[#2F2F35]">
          {Parse(corporateDetails?.description || "")}
        </span>
      </div>
      <div className="mt-10">
        <Heading content={"Details"} varient={"2xl"} className="font-bold max-md:text-[18px]" />
        <div>
          <ul className="ml-5 list-disc">
            {data.map((item, index) => (
              <li
                key={index}
                className="text-sm lg:text-base pt-1 text-[#2F2F35] marker:text-2xl marker:text-blue-600"
              >
                {item.title}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mt-10">
        <Heading
          content={"Lorem ipsum dolor sit amet"}
          varient={"2xl"}
          className="font-bold max-lg:text-[18px]"
        />
        <div className="mt-2">
          <span className="text-base lg:text-lg font-bold text-[#3969E0] underline">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem,
            ipsam possimus voluptates nam animi totam! Lorem ipsum dolor sit
            amet consectetur?
          </span>
        </div>
        <div className="mt-2">
          <span className="text-base lg:text-lg text-[#2F2F35]">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quia,
            magnam blanditiis nulla a architecto exercitationem est odit at sed
            adipisci ullam in necessitatibus libero, ipsa unde. In maiores,
            quibusdam harum, explicabo rem facere ducimus autem, mollitia nihil
            animi numquam possimus sed provident quaerat eum dolorum eos
            officiis porro repellendus laudantium culpa libero? Sint distinctio
            at facilis blanditiis eaque. A cum asperiores quidem, harum quia
            tempora repudiandae debitis fugit vero corporis saepe commodi nam
            placeat assumenda illum nulla tempore earum fuga facilis repellendus
            ab error! Accusantium corrupti reiciendis error ad atque explicabo
            dignissimos cupiditate, aperiam iusto alias ducimus eveniet eius
            facere?
          </span>
        </div>
      </div>
      <div className="mt-5 border-b-[2px] border-[#eff3fc]" />
      <div className="py-5">
        <span className="text-base lg:text-lg font-bold underline">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem, ipsam
          possimus voluptates nam animi totam! Lorem ipsum dolor sit amet
          consectetur?
        </span>
      </div>
      <div className="border-b-[2px] border-[#eff3fc]" />
      <div className="py-5">
        <span className="text-base lg:text-lg font-bold underline">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem, ipsam
          possimus voluptates nam animi totam?
        </span>
      </div>
      {corporateDetails.gallery.length > 0 && (
        <>
          {" "}
          <div className="border-b-[2px] border-[#eff3fc]" />
          <div className="mt-10 mb-14 lg:mb-20">
            <ImageSlider2 gallery={corporateDetails.gallery} />
          </div>
        </>
      )}
    </div>
  );
};

export default AboutCorporate;
