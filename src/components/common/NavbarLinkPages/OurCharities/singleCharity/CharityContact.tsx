import React from "react";
import ButtonPrimary from "@/components/common/ButtonPrimary";
import Heading from "@/components/common/Heading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAddressBook,
  faEnvelope,
  faGlobe,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { ISingleCharityData } from "@/api/common/types";

interface ContactInfo {
  id: number;
  icon: JSX.Element;
  link: string;
}

const CharityContact = ({
  contactDetails,
}: {
  contactDetails: ISingleCharityData;
}) => {
  const Data: ContactInfo[] = [
    {
      id: 1,
      icon: <FontAwesomeIcon icon={faEnvelope} />,
      link: contactDetails?.contact_email,
    },
    {
      id: 2,
      icon: <FontAwesomeIcon icon={faPhone} />,
      link: contactDetails?.contact_phone,
    },
    {
      id: 3,
      icon: <FontAwesomeIcon icon={faGlobe} />,
      link: contactDetails?.contact_website,
    },
    {
      id: 4,
      icon: <FontAwesomeIcon icon={faGlobe} />,
      link: contactDetails?.blog_url,
    },
  ];
  return (
    <div className=" min-h-[309px] max-w-[438px]">
      <div className="rounded-xl bg-gradient-to-r from-gradient_color_2  to-gradient_color_1 py-[25px] pl-[25px]">
        <Heading
          content={"Contact information"}
          className="!text-[22px] text-white"
        />
        <div className="pt-[19px]">
          {Data.length < 0 ? (
            Data.map((item) => (
              <div className="flex gap-[10px] pt-2" key={item.id}>
                <span className="text-xl text-white xs:text-2xl">
                  {item.icon}
                </span>
                <ul>
                  <li className="text-sm text-white underline xs:text-base">
                    {item?.link || ""}
                  </li>
                </ul>
              </div>
            ))
          ) : (
            <div className="text-sm h-[109px] text-white flex items-center xs:text-xl font-bold">
              <FontAwesomeIcon icon={faAddressBook} className="mr-[10px]"/>
              No contact information available
            </div>
          )}
        </div>
        <div className="mr-[25px] mt-[17px] lg:mr-0">
          <ButtonPrimary
            label={"Subscribe to our newsletter"}
            className={
              "flex !h-[50px] w-full justify-center rounded-full bg-white bg-gradient-to-r from-transparent to-transparent py-4 !shadow-none lg:w-auto"
            }
            classNameLabel={"text-blue-600"}
          />
        </div>
      </div>
    </div>
  );
};

export default CharityContact;
