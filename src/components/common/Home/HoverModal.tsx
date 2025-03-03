import { Button } from "../ButtonPrimary";
import React from "react";
import charitagLogo from "@images/bluish_logo.svg";
import Image from "next/image";
import { redirect } from "next/navigation";
import { ILinkContent } from "../types";

interface IHoverModalProps {
  linkName: string;
  content: ILinkContent;
  className: string;
}
const HoverModal = ({ linkName, content, className }: IHoverModalProps) => {
  const modalClass = `absolute z-[9] top-[40px] ${className} ${
    linkName ? "hovered" : ""
  }`;
  return (
    <div className={modalClass}>
      <div className="h-[30px] bg-transparent"></div>
      <div className="relative z-[1] w-full min-w-[670px] overflow-hidden rounded-xl bg-white p-6 shadow-2xl">
        <div className="relative  flex gap-5">
          <div className="relative mr-4">
            <Image
              src={content?.image}
              alt="Image"
              className={`${
                content?.id === 1 || content?.id === 4
                  ? "h-[230px] w-[430px]"
                  : "h-[230px] w-[180px]"
              } float-start rounded-lg bg-[#f9fafe]`}
              width={100}
              height={100}
            />
            <div
              onClick={() => {
                if (content?.link) {
                  redirect(content.link);
                }
              }}
              className={` ${content?.id === 1 || content?.id === 4 ? "right-[10px]" : "left-0 right-0 mx-[5px] my-0 !px-[15px] shadow shadow-[#ecf0fc]"} absolute bottom-2 flex items-center gap-[5px] rounded-full  bg-white px-[30px] py-[4px]`}
            >
              <Button
                label={content?.buttonLabel}
                classNameLabel="text-blue-500"
                className={"!block !p-0"}
              />
              <div className="flex items-center text-blue-600 ">
                <span className="-mr-[1px] text-[20px]">·</span>
                <span className="text-[20px]">·</span>
                <span>
                  <i className="fa-solid fa-arrow-right"></i>
                </span>
              </div>
            </div>
          </div>

          <div className="">
            <span className="text-xl font-bold text-blue-500">
              {content?.heading}
            </span>
            <ul>
              {content &&
                content.listItems &&
                content?.listItems.map((item, index) => (
                  <li key={index} className="pt-2 font-thin">
                    {item.title}
                  </li>
                ))}
            </ul>
          </div>
          <div>
            {content?.listItems2 && (
              <>
                <span className="text-xl font-bold text-blue-500">
                  {content.heading2}
                </span>
                <ul>
                  {content?.listItems2.map((item, index) => (
                    <li key={index} className="pt-2 font-thin">
                      {item.title}
                    </li>
                  ))}
                </ul>
              </>
            )}
            <div>
              {content?.listItems3 && (
                <div className="mt-3">
                  <span className="text-xl font-bold text-blue-500 ">
                    {content.heading3}
                  </span>
                  <ul>
                    {content?.listItems3.map((item, index) => (
                      <li key={index} className="pt-2 font-thin">
                        {item.title}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
          <div className="left-unset absolute bottom-0 left-[80%] right-[-115px] top-[-29px] z-[-1] h-full">
            <Image
              src={charitagLogo}
              alt=""
              width={100}
              height={100}
              // className="h-[320px] right-[-40px] relative"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HoverModal;
