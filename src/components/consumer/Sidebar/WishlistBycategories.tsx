"use client";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { SideBarLink } from "./types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { IDatum } from "@/api/common/types";
import { AnimatedDiv } from "@/components/common/AnimatedDiv";
import { AnimatePresence } from "framer-motion";

const WishlistBycategories = ({
  item,
  className,
  subItem,
  setShowSidebar,
}: {
  item: SideBarLink;
  className?: string;
  subItem?: IDatum[];
  setShowSidebar?: (show: boolean) => void;
}) => {
  const pathname = usePathname();
  const [subMenuOpen, setSubMenuOpen] = useState(
    pathname.includes("saved-deals"),
  );

  useEffect(() => {
    setSubMenuOpen(pathname.includes("saved-deals"));
  }, [pathname]);

  // useEffect(() => {
  //   localStorage.setItem(
  //     "f_wishlist_item",
  //     subItem && subItem?.length > 0
  //       ? subItem[0]?.id + `|${subItem[0].name}`
  //       : "",
  //   );
  // }, [subItem]);

  const toggleSubMenu = () => {
    setSubMenuOpen(!subMenuOpen);
  };

  const searcParms = useSearchParams();
  const wishCategory =
    searcParms.get("wish-category") ||
    (subItem && subItem?.length > 0 && subItem[0].id)?.toString();
  return (
    <>
      <div
        className={` py-1 pl-5 ${pathname.includes(item.link) ? " rounded-2xl bg-white text-blue-500" : ""}`}
      >
        <Link
          href={`/consumer/saved-deals?wish-category=${subItem && subItem?.length > 0 ? subItem[0].id : ""}&category=${(subItem && subItem[0]?.name) || ""}`}
          className={`block ${className}`}
          onClick={toggleSubMenu}
        >
          <FontAwesomeIcon
            icon={item.icon}
            className="max-w-[17px] text-blue-500"
          />
          <span className="whitespace-nowrap pl-[9px] font-bold">
            {item.label}
          </span>
        </Link>
        <AnimatePresence>
          {subMenuOpen && (
            <AnimatedDiv
              className={`max-h-48 !overflow-y-auto pl-6 scrollbar ${subItem && subItem?.length > 0 ? "mt-2" : ""}`}
            >
              {subItem?.map((item) => (
                <Link
                  key={item.id}
                  href={
                    `/consumer/saved-deals?wish-category=${item.id}&category=${item.name}` ||
                    ""
                  }
                  className="text-slate-950 hover:underline"
                >
                  <div
                    className={`text-slate-950 ${wishCategory === item.id.toString() ? "font-semibold" : ""}`}
                    onClick={() => setShowSidebar && setShowSidebar(false)}
                  >
                    <span className="">
                      {item?.name.length > 15
                        ? `${item?.name.slice(0, 15)}...`
                        : item?.name}
                    </span>
                    {`(${item?.wishlist_count || 0})`}
                  </div>
                </Link>
              ))}
            </AnimatedDiv>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default WishlistBycategories;
