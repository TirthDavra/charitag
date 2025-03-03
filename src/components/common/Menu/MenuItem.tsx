"use client";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { SideNavItem } from "./types";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useModal } from "@/components/context/ModalContext";

export const MenuItem = ({
  item,
  className,
  onClose,
}: {
  item: SideNavItem;
  className?: string;
  onClose?: () => void;
}) => {
  const pathname = usePathname();
  const [subMenuOpen, setSubMenuOpen] = useState(false);
  const toggleSubMenu = () => {
    setSubMenuOpen(!subMenuOpen);
  };
  const { closeModal } = useModal();

  const isActive = () => {
    if (pathname.includes(item.path)) {
      return true;
    }
    if (item.subMenuItems) {
      return item.subMenuItems.some((subItem) =>
        pathname.includes(subItem.path),
      );
    }
    return false;
  };

  // useEffect(() => {
  //   if (
  //     item.subMenuItems &&
  //     item.subMenuItems.some((subItem) => pathname.includes(subItem.path))
  //   ) {
  //     setSubMenuOpen(true);
  //   } else {
  //     setSubMenuOpen(false);
  //   }
  // }, [pathname, item.subMenuItems]);

  const handleLinkClick = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <div className={`${className} font-medium`}>
      {item.submenu ? (
        <>
          <div
            className={`hover-bg-zinc-100 flex max-h-[45px] w-full flex-row items-center justify-between rounded-sm p-3 text-merchant_sidebar_text ${
              pathname.includes(item.commonPath ?? "")
                ? "bg-merchant_header "
                : ""
            }`}
            onClick={toggleSubMenu}
          >
            <Link href={item.path} onClick={closeModal}>
              <div className="flex flex-row items-center space-x-4  ">
                {item.icon}
                <span className="flex">{item.title}</span>
              </div>
            </Link>
            <div
              className={`cursor-pointer ${subMenuOpen ? "rotate-90" : ""} flex`}
            >
              <ChevronRight width="24" height="24" />
            </div>
          </div>

          {subMenuOpen && (
            <div className="my-2 ml-12 flex flex-col space-y-4 text-[14px]">
              {item.subMenuItems?.map((subItem, idx) => {
                return (
                  <Link
                    key={idx}
                    href={subItem.path}
                    className={`${
                      subItem.path === pathname
                        ? "text-merchant_sidebar_text"
                        : ""
                    }`}
                    onClick={handleLinkClick}
                  >
                    <span>{subItem.title}</span>
                  </Link>
                );
              })}
            </div>
          )}
        </>
      ) : (
        <Link
          href={item.path}
          className={`flex max-h-[45px] flex-row items-center space-x-4 rounded-md p-3 text-merchant_sidebar_text ${
            isActive() ? " bg-merchant_header" : ""
          }`}
          type="button"
          onClick={handleLinkClick}
        >
          {item.icon}
          <span className="flex">{item.title}</span>
        </Link>
      )}
    </div>
  );
};
