"use client";
import React from "react";
import WishlistBycategories from "./WishlistBycategories";
import { SideBarLink } from "./types";
import { useAppSelectorConsumer } from "@/lib/Store/hooks";

const WishlistSidebarItem = ({
  item,
  setShowSidebar,
}: {
  item: SideBarLink;
  setShowSidebar?: (show: boolean) => void;
}) => {
  const subItem = useAppSelectorConsumer((state) => state.wishlist.subItem);

  return (
    <div>
      <WishlistBycategories
        setShowSidebar={setShowSidebar}
        item={item}
        subItem={subItem.length > 0 ? subItem : []}
      />
    </div>
  );
};

export default WishlistSidebarItem;
