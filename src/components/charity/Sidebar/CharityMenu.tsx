import { MenuItem } from "@/components/common/Menu/MenuItem";
import React from "react";
import { SIDENAV_CHARITY_ITEMS } from "../constant";

const CharityMenu = ({onClose}:{onClose?: () => void}) => {
  return (
    <div className="h-full overflow-y-auto">
      <div className="grid grid-cols-1 space-y-[10px] ">
        <div className="mb-3 font-semibold text-merchant_primary">Menu</div>

        {SIDENAV_CHARITY_ITEMS.map((item, idx) => {
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

export default CharityMenu;
