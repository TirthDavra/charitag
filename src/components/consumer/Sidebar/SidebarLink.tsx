"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SideBarLink } from "./types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SidebarLink = ({
  item,
  className,
  setShowSidebar,
}: {
  item: SideBarLink;
  className?: string;
  setShowSidebar?: (show: boolean) => void;
}) => {
  const pathname = usePathname();
  return (
    <Link href={`/consumer/${item.link}`} className={`block py-2 ${className}`}>
      <div
        className={`max-w-fit py-1 pl-4 ${pathname.includes(item.link) ? "rounded-full bg-white pr-4" : ""}`}
        onClick={() => setShowSidebar && setShowSidebar(false)}
      >
        <FontAwesomeIcon
          icon={item.icon}
          className="max-w-[17px] text-blue-500"
        />
        <span className="whitespace-nowrap pl-[9px] font-bold">
          {item.label}
        </span>
      </div>
    </Link>
  );
};

export default SidebarLink;
