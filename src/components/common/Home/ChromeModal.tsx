"use client";
import logo from "@images/logo.svg";
import ButtonPrimary from "../ButtonPrimary";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

interface ChromeModalProps {
  className?: string;
}

const ChromeModal: React.FC<ChromeModalProps> = ({ className }) => {
  const [showModal, setShowModal] = useState(true);
  return (
    showModal && (
      <div className={`${className}`}>
        <button
          type="submit"
          className="absolute right-4 top-2
        cursor-pointer text-[25px] text-blue-500"
          onClick={() => setShowModal(false)}
        >
          <FontAwesomeIcon icon={faXmark} />
        </button>
        <div className="shadow-lg-[red] pb-[25px] pt-4">
          <div className="flex gap-5 p-[10px] ">
            <div className="">
              <Image
                src={logo}
                alt=""
                // className="w-[100px]"
                width={100}
                height={100}
              />
            </div>
            <div>
              <span className="text-2xl font-semibold">
                Lorem ipsum dolor sit amet consectetur
              </span>
              <div>
                <span>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Alias, sint
                </span>
              </div>
            </div>
          </div>
          <div className="mt-5 flex justify-center">
            <ButtonPrimary
              label="Add to Chrome - It's Free"
              className="rounded-full py-3 md:h-[50px]"
            />
          </div>
        </div>
      </div>
    )
  );
};

export default ChromeModal;
