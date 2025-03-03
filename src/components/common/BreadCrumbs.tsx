import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React from "react";

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex items-center gap-2 pt-[20px]">
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-2 underline">
            <Link href={item.href} className="hover:text-merchant_text_color_blue">{item.label}</Link>
            {index < items.length - 1 && (
              <FontAwesomeIcon
                icon={faChevronRight}
                className="text-[#cdd9f7]"
              />
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
