import Image from "next/image";
import Link from "next/link";
import Button from "@/components/common/ButtonPrimary";
import charitagLogo from "@images/bluish_logo.svg";
import { ILinkContent } from "../types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

interface IHoverModal {
  content: ILinkContent;
  className?: string;
}

const HoverModal: React.FC<IHoverModal> = ({ content, className }) => {
  return (
    <div className={className}>
      <div className="relative z-[1] max-w-[680px] overflow-hidden rounded-xl">
        <div className="relative flex gap-5">
          <div className="relative mr-4">
            <Image
              src={content?.image}
              alt="Image"
              className={`${
                content?.id === 1 || content?.id === 4
                  ? "h-[230px] w-[430px]"
                  : "h-[230px] w-[180px]"
              } float-start rounded-lg bg-[#f9fafe]`}
              width={content?.id === 1 || content?.id === 4 ? 430 : 180}
              height={230}
            />
            <Link
              href={`${content.link}`}
              className={` ${content?.id === 1 || content?.id === 4 ? "right-[10px]" : "left-0 right-0 mx-[5px] my-0 !px-[15px] shadow shadow-[#ecf0fc]"} absolute bottom-2 flex items-center gap-[5px] rounded-full  bg-white px-[30px] py-[4px]`}
            >
              <button className="text-blue-600">{content.buttonLabel}</button>
              <div className="flex items-center text-blue-600 ">
                <span className="-mr-[1px] text-[20px]">·</span>
                <span className="text-[20px]">·</span>
                <span>
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    className="text-blue-500"
                  />
                </span>
              </div>
            </Link>
          </div>

          <div className="">
            <span className="text-xl font-bold text-blue-500">
              {content?.heading}
            </span>
            <ul>
              {content.listItems &&
                content?.listItems.map((item, index) => (
                  <Link
                    href={item.link}
                    key={index}
                    className="flex flex-col pt-2 text-[#2F2F35]"
                  >
                    {item.title}
                  </Link>
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
                    <Link
                      href={item.link}
                      key={index}
                      className="flex flex-col pt-2 text-[#2F2F35]"
                    >
                      {item.title}
                    </Link>
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
                      <Link
                        href={item.link}
                        key={index}
                        className="flex flex-col pt-2 text-[#2F2F35]"
                      >
                        {item.title}
                      </Link>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
          <div className=" absolute bottom-0 left-[80%] right-[-115px] top-[-29px] z-[-1] h-full">
            <Image
              src={charitagLogo}
              alt=""
              className="relative right-[-40px] h-[320px]"
              width={120}
              height={320}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HoverModal;
