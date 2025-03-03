"use client";
import React from "react";
import { MenuItem } from "@/components/common/Menu/MenuItem";
import { SIDENAV_CORPORATE_ITEMS } from "../constant";

const CorporateMenu = ({onClose}:{onClose?: () => void}) => {
  return (
    <div
      className="h-full overflow-y-auto thin_scrollbar"
      style={{
        WebkitOverflowScrolling: "touch",
      }}
    >
      <div className="grid grid-cols-1 space-y-[10px]">
        <div className="mb-3 font-semibold text-merchant_primary">Menu</div>

        {SIDENAV_CORPORATE_ITEMS.map((item, idx) => {
          return (
            <MenuItem
              key={idx}
              item={item}
              className="text-merchant_main_font"
              onClose={onClose}
            />
          );
        })}
      </div>
    </div>
  );
};

export default CorporateMenu;
