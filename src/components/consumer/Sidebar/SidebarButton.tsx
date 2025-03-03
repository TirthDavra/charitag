"use client";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightLong,
  faClose,
  faL,
} from "@fortawesome/free-solid-svg-icons";
import { Session } from "next-auth";
import SidebarLinks from "./SidebarLinks";
import { useSession } from "next-auth/react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";

const SidebarButton = ({
  className,
}: {
  className?: string;
}) => {
  const [showSidebar, setShowSidebar] = useState(false);

  const { data: session } = useSession();

  return (
    <div>
      <Sheet open={showSidebar} onOpenChange={setShowSidebar}>
        <SheetTrigger asChild>
          <div
            className={`fixed left-[-20px] top-[110px] z-10 flex  h-[35px] w-[50px] rounded-full bg-gradient_color_1 bg-gradient-to-bl from-gradient_color_2 p-2 pl-4 text-white lg:hidden ${className}`}
          >
            <FontAwesomeIcon icon={faArrowRightLong} className=" pl-2" />
          </div>
        </SheetTrigger>
        <SheetContent
          className="mt-5 h-full w-[max-content] !border-none !bg-[unset] focus:border-none lg:!hidden lg:bg-[none]"
          side={"left"}
          overlayClassName="lg:hidden"
          closeClassname="absolute !right-[47px] !top-12 focus:ring-0 focus:ring-offset-0"
        >
          <SidebarLinks
            session={session}
            setShowSidebar={setShowSidebar}
          />
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default SidebarButton;
