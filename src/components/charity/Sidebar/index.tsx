"use client";
import { Menu, Moon, Power } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import logo from "@images/charitag_new_logo-DkdSFQVj 3.png";
import calendarIcon from "@images/svg/Calendar.svg";
import CharityMenu from "./CharityMenu";
import Tooltip from "@/components/common/Tooltip";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { logout } from "@/lib/utils";

const CharitySidebar = ({
  className,
  onClose,
}: {
  className?: string;
  onClose?: () => void;
}) => {
  return (
    <div
      className={`mt-5 min-w-[247px] rounded-xl px-[23px] py-[19px] shadow-[3px_0px_3px_1px_rgba(0,0,0,0.05)]  ${className}`}
    >
      <div>
        <div className="flex items-center justify-between">
          <Link href="/" onClick={onClose}>
            <Image
              src={logo}
              alt="logo"
              color="red"
              className="drop-shadow-[0_35px_35px_rgba(55,50,40,0.25)]"
            />
          </Link>
          {/* <Menu className="text-merchant_primary" /> */}
        </div>
        <div className="mt-[30px] flex h-[35px] cursor-pointer divide-x text-merchant_primary">
          <div className="flex h-[40px] w-[56px] items-center justify-start">
            <Image src={calendarIcon} alt="" className="h-[22px]" />
          </div>
          <div className="flex w-[90px] items-center justify-center">
            <Moon className="h-[22px] w-[22px]" />
          </div>
          <div className="flex w-[90px] items-center justify-center">
            <Tooltip message="Logout">
              <Power
                className="h-[22px] w-[22px] "
                onClick={() => {
                  logout();
                }}
              />
            </Tooltip>
          </div>
        </div>
      </div>
      <div className="mt-[37px] h-[calc(100vh-230px)] overflow-y-auto">
        <CharityMenu onClose={onClose} />
      </div>
    </div>
  );
};

export default CharitySidebar;
