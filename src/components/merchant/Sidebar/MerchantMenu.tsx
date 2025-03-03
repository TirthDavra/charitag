"use client";
import React from "react";
import { SIDENAV_ITEMS } from "../constants";
import { MenuItem } from "@/components/common/Menu/MenuItem";

const MerchantMenu = ({onClose}:{onClose?: () => void}) => {
  return (
    // <div className="hidden overflow-visible relative z-10 lg:block lg:col-span-5">
    //   <div className="lg:fixed mt-2 z-0 lg:h-[calc(100vh-121px)]">
    //     <div className="relative overflow-hidden h-full lg:max-h-[calc(100vh_-_64px)]">
    //       <div
    //         data-radix-scroll-area-viewport=""
    //         className="h-full w-full rounded-[inherit] pb-28"
    //       >

    //       </div>
    //     </div>
    //   </div>
    //   </div>
      <div
        className="h-full overflow-y-auto scrollbar"
        style={{
          WebkitOverflowScrolling: "touch",
        }}
      >
        <div className="grid grid-cols-1 space-y-[10px]">
          <div className="mb-3 font-semibold text-merchant_primary">Menu</div>

          {SIDENAV_ITEMS.map((item, idx) => {
            return (
              <MenuItem
                onClose={onClose}
                key={idx}
                item={item}
                className="text-merchant_main_font"
              />
            );
          })}
        </div>
      </div>
  );
};

export default MerchantMenu;
