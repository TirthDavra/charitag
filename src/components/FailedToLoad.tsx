import React from "react";
import ButtonPrimary from "./common/ButtonPrimary";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import charitagLogo from "@images/bluish_logo.svg";
import Link from "next/link";
import Image from "next/image";

const FailedToLoadPage = () => {
  return (
    <div className="flex h-[78vh] flex-grow flex-col items-center justify-center">
      <div className="relative">
        <div className="absolute left-[-250px] z-[-5] top-[-200px]">
          <div className="relative h-[800px] w-[500px]">
            <Image
              src={charitagLogo}
              alt=""
              className="object-cover"
              fill={true}
            />
          </div>
        </div>
      </div>
      <div className="w-[70%] px-[10px] text-center xl:w-[50%] 2xl:w-[30%]">
        <h1 className="mb-4 flex justify-center text-center text-2xl font-bold lg:text-5xl lg:leading-[56px]">
          We can&apos;t seem to find the page you&apos;re looking for.
        </h1>
        <p className="text-lg text-gray-600">
          Here are some helpful links instead:
        </p>
      </div>
      <div className="mt-6 flex flex-col  gap-[15px] lg:flex-row">
        <div className="flex justify-center">
          <Link href={"/"}>
            <ButtonPrimary
              label={`Go Back Home`}
              classNameLogo="w-[25px] h-[25px]"
              className="flex w-full justify-center gap-4 rounded-full px-0 py-3 md:h-[50px] md:!w-[169px] md:gap-2 lg:py-[13px]"
            />
          </Link>
        </div>
        <div className="flex w-full items-center justify-center lg:justify-start">
          <Link href={"/register"}>
            <ButtonPrimary
              label="Join Charitag Today"
              classNameLabel="text-blue-500"
              className={
                "bg-gradient-to-r from-transparent to-transparent pr-2 !shadow-none"
              }
            />
          </Link>
          <div className="flex items-center text-blue-600 ">
            <span className="-mr-[3px] text-[30px]">·</span>
            <span className="text-[30px]">·</span>
            <span>
              <FontAwesomeIcon icon={faArrowRight} />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FailedToLoadPage;
