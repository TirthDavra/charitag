import Link from "next/link";
import React from "react";
import CategoryHoverCard from "./CategoryHoverCard";

import { getAllCategories } from "@/api/common/products";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import NavItemsContent from "./NavItemsContent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSheetPlastic } from "@fortawesome/free-solid-svg-icons";
import HoverModal from "../../Modals/HoverModal";
import charitagImg from "@images/ourCharities.png";
import { getCategories } from "@/api/auth/categories";
import NavItemsContentContainer from "./NavItemsContentContainer";

const NavItems = async () => {
  const categories = await getAllCategories();
  const response = await getCategories("charity");

  const product = categories.data.data.find(
    (category) => category.name === "Products",
  );
  let list1: string[] = [];
  let list2: string[] = [];
  if (product && product.children) {
    list1 =
      product?.children?.length > 5
        ? product?.children.slice(0, 5).map((item) => item.name)
        : [];
    list2 =
      product?.children?.length > 10
        ? [
            "",
            "",
            "",
            "",
            ...product?.children.slice(6, 10).map((item) => item.name),
          ]
        : [];
  }
  return (
    <div className="hidden  items-center gap-[20px] xl:flex">
      <div className="group relative">
        <HoverCard openDelay={5} closeDelay={300}>
          <HoverCardTrigger asChild>
            <Link
              href={`/shop`}
              className={`font-medium group-hover:font-bold group-hover:text-links_color group-hover:underline`}
            >
              Shop
            </Link>
          </HoverCardTrigger>
          {/* <HoverCardContent className="w-full bg-white">
            {
              categories.data?.data?.length > 0 ? (
                <CategoryHoverCard className="" categories={categories.data} />
              ) : (
                <>
                <strong>Categories Data Not available</strong>
                <div className="flex justify-center text-center p-4">
                <FontAwesomeIcon icon={faSheetPlastic} className="text-4xl text-gray-500"/>

                </div>
                </>
              )
            }
          </HoverCardContent> */}
          <HoverCardContent className="w-full">
            {categories.data?.data?.length > 0 ? (
              <HoverModal
                content={{
                  id: 2,
                  image: charitagImg,
                  heading: "Products",
                  buttonLabel: "All Our Products",
                  listItems: list1.map((item) => ({ title: item, link: "" })),
                  heading2: "",
                  listItems2: list2.map((item) => ({ title: item, link: "" })),
                  link: "/shop",
                }}
              />
            ) : (
              <>
                <strong>Categories Data Not available</strong>
                <div className="flex justify-center p-4 text-center">
                  <FontAwesomeIcon
                    icon={faSheetPlastic}
                    className="text-4xl text-gray-500"
                  />
                </div>
              </>
            )}
          </HoverCardContent>
        </HoverCard>
      </div>
      {/* <NavItemsContent
        campaign={[
          ...(response.data?.length > 0
            ? response.data.slice(0, 5).map((item) => ({
                title: item.title,
                link: `our-charities?charity_type=${item.id}`,
              }))
            : []),
          { title: "View All", link: "/our-charities" },
        ]}
      /> */}
      <NavItemsContentContainer response={response} />
    </div>
  );
};

export default NavItems;
