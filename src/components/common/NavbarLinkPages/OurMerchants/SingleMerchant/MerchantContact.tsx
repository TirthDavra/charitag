import React from "react";
import Heading from "@/components/common/Heading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faGlobe,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { IStore } from "@/api/common/types";
import Link from "next/link";

interface ContactInfo {
  id: number;
  icon: JSX.Element;
  link: string;
}

const MerchantContact = ({
  contactDetails,
  slug,
}: {
  contactDetails: IStore;
  slug: string;
}) => {
  const Data: ContactInfo[] = [
    {
      id: 1,
      icon: <FontAwesomeIcon icon={faEnvelope} />,
      link: contactDetails?.email || "test@gmail.com",
    },
    {
      id: 2,
      icon: <FontAwesomeIcon icon={faPhone} />,
      link: contactDetails?.phone || "123-456-7890",
    },
    {
      id: 3,
      icon: <FontAwesomeIcon icon={faGlobe} />,
      link: contactDetails?.website || "https://store1.example.com",
    },
  ];
  return (
    <div className=" max-w-[438px]">
      <div className="rounded-xl bg-gradient-to-r from-gradient_color_2  to-gradient_color_1 py-[25px] pl-[25px]">
        <Heading
          content={"Contact information"}
          className="!text-[22px] text-white"
        />
        <div className="pt-[19px]">
          {Data.map((item) => (
            <div className="flex gap-[10px] pt-2" key={item.id}>
              <span className="text-2xl text-white">{item.icon}</span>
              <ul>
                <Link href={`${slug}`} className="text-white underline">
                  {item?.link || ""}
                </Link>
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MerchantContact;
