"use client";
import { useState } from "react";
import { useModal } from "@/components/context/ModalContext";
import { Menu } from "lucide-react";
import CorporateSidebar from ".";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

const CorporateMenuResposive = () => {
  const [showSidebar, setShowSidebar] = useState(false);
   return (
    <div>
      {/* <button className="mt-[9px] mx-2 pl-[2px]">
        <Menu
          className="text-merchant_primary lg:!hidden"
          onClick={() =>
            openModal({
              content: <CorporateSidebar onClose={closeModal}/>,
              generalModal: true,
              classNameBg:'lg:hidden',
              classNameGeneral: "bg-slate-900/50 lg:hidden",
              className: `max-w-[260px] bg-white transition-all rounded-lg lg:hidden`,
            })
          }
        />
      </button> */}
      <div>
      <Sheet open={showSidebar} onOpenChange={setShowSidebar}>
          <SheetTrigger asChild>
            <Menu  className="lg:hidden"/>
          </SheetTrigger>
          <SheetContent
            className="h-full w-[max-content] !border-none !bg-[unset] focus:border-none lg:!hidden lg:bg-[none]"
            side={"left"}
            overlayClassName="lg:hidden"
            closeClassname="absolute !right-[47px] !top-12 focus:ring-0 focus:ring-offset-0"
          >
            <CorporateSidebar className="bg-white h-full !mt-0" onClose={() => setShowSidebar(false)}/>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default CorporateMenuResposive;
