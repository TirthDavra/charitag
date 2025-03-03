import React from "react";
import SIDEBAR_FLAVOURS from "../../constants/sidebarFlavours";
import ButtonPrimary from "../../common/ButtonPrimary";
import charitagLogo from "@images/charitag_logo.png";
import Image from "next/image";
import SidebarLinks from "./SidebarLinks";
import { auth } from "auth";
import SidebarButton from "./SidebarButton";

interface SidebarProps {
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = async ({ className }) => {
  const session = await auth();

  return (
    <main
      className={`z-10 flex max-w-[280px] flex-col justify-center ${className}`}
    >
      <SidebarButton />
      <div className={`hidden max-w-[250px] lg:block`}>
        <SidebarLinks session={session} />

        {/* Add to chrome */}
        <div
          className={`mt-[25px] hidden max-w-[250px] flex-col gap-3 rounded-xl p-5 shadow-equally_distributed_bluish lg:block`}
        >
          <div className="flex items-center gap-[20px]">
            <Image
              src={charitagLogo}
              alt=""
              width={100}
              height={100}
              className="h-[46px] w-[32px] "
            />
            <span className="text-[18px] font-bold text-[#2F2F35]">
              Lorem ipsum dolor sit amet consider
            </span>
          </div>
          <div className="pt-[19px]">
            <span className="text-[#2F2F35]">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              eiusmod tempor.
            </span>
          </div>
          <div className="pb-[25px] pt-[17px]">
            <ButtonPrimary
              label={"Add to Chrome - It's Free"}
              className={"h-[50px] w-[211px] rounded-full px-[18px] py-[15px]"}
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Sidebar;
