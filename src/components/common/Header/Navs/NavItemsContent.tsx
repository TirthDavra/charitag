"use client";
import React, { useEffect, useState } from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import HoverModal from "../../Modals/HoverModal";
import Link from "next/link";
import dealImg from "@images/top_deal_img1.jpg";
import charitagImg from "@images/ourCharities.png";
import merchantImg from "@images/merchants.png";
import { StaticImageData } from "next/image";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { IDatum } from "@/api/common/types";
import { getCateogoriesForConsumer } from "@/api/common/deals";
import { useSession } from "next-auth/react";

import { setWishlist } from "@/lib/Store/slices/consumerFeatures/wishlist/wishlistSlice";
import {
  useAppDispatch,
  useAppSelectorCommon,
  useAppSelectorConsumer,
} from "@/lib/Store/hooks";

interface IHoverModal {
  content: ContentItem;
  className?: string;
}

interface ContentItem {
  id: number;
  image: StaticImageData;
  heading: string;
  buttonLabel: string;
  listItems: {
    title: string;
    link: string;
  }[];
  heading2?: string;
  listItems2?: {
    title: string;
    link: string;
  }[];
  heading3?: string;
  listItems3?: {
    title: string;
    link: string;
  }[];
  link: string;
}

interface LinkContent {
  title: string;
  link: string;
  content: ContentItem;
  key: string;
}

// Define your categories and content here
const dealsCategory: { title: string; link: string }[] = [
  { title: "Department", link: "/" },
  { title: "Brand (A-Z listing)", link: "/" },
  { title: "New Arrivals (products)", link: "/" },
  { title: "New Merchants", link: "/" },
  { title: "Deals and Discounts", link: "/" },
];

const charityCampaign: string[] = [
  "Medical",
  "Emergency",
  "Education",
  "NonProfit",
  "Community",
  "View All",
];

const charitiesCategory: { title: string; link: string }[] = [
  { title: "How Charitag Works", link: "/" },
  { title: "Charities FAQs", link: "/" },
  { title: "Join Charitag", link: "/" },
];

const chartityVolunteer: string[] = ["How you can help"];

const merchantCategory: { title: string; link: string }[] = [
  { title: "How Charitag Works", link: "/" },
  { title: "Merchant FAQs", link: "/" },
  { title: "Join Charitag", link: "/" },
];

const corporateCategory: { title: string; link: string }[] = [
  { title: "How Charitag Works", link: "/" },
  { title: "Corporate Fundraiser FAQs", link: "/" },
  { title: "Join Charitag and start fundraising", link: "/" },
];

const linkContents: Record<string, LinkContent> = {
  ourMerchants: {
    title: "Our Merchants",
    link: "/our-merchants",
    key: "ourMerchants",
    content: {
      id: 3,
      image: merchantImg,
      heading: "All our merchants",
      buttonLabel: "All Our Merchants",
      listItems: dealsCategory,
      heading2: "For merchants",
      listItems2: merchantCategory,
      link: "/our-merchants",
    },
  },
  ourCharities: {
    title: "Our Charities",
    link: "/our-charities",
    key: "ourCharities",
    content: {
      id: 2,
      image: charitagImg,
      heading: "All our campaigns",
      buttonLabel: "All Our Charities",
      listItems: [],
      heading2: "For charities",
      listItems2: charitiesCategory,
      // heading3: "Volunteers",
      // listItems3: chartityVolunteer,
      link: "/our-charities",
    },
  },
  corporate: {
    title: "Corporate Fundraisers",
    link: "/corporate-fundraisers",
    key: "corporate",
    content: {
      id: 4,
      image: dealImg,
      heading: "For corporations",
      buttonLabel: "Employee? Join your corporate fundraiser",
      listItems: corporateCategory,
      link: "/corporate-fundraisers",
    },
  },
};

const NavItemsContent = ({
  campaign,
}: {
  campaign?: {
    title: string;
    link: string;
  }[];
}) => {
  const [content, setContent] = useState(linkContents["ourCharities"].content);
  const pathName = usePathname();

  linkContents.ourCharities.content.listItems = campaign || [];

  return (
    <HoverCard openDelay={5} closeDelay={300}>
      <HoverCardTrigger asChild>
        <div className="hidden items-center gap-[20px] xl:flex">
          {Object.values(linkContents).map((linkItem) => (
            <Link
              key={linkItem.content.id}
              href={linkItem.link}
              className={`group font-medium hover:font-bold hover:text-links_color hover:underline ${pathName === linkItem.link ? "text-links_color" : ""}`}
              onMouseEnter={() =>
                setContent(linkContents[linkItem.key].content)
              }
            >
              {linkItem.title}
            </Link>
          ))}
        </div>
      </HoverCardTrigger>
      <HoverCardContent className="w-full bg-white">
        <HoverModal content={content} />
      </HoverCardContent>
    </HoverCard>
  );
};

export default NavItemsContent;

export const ShowWishListNavHeart = () => {
  const { data: session } = useSession();

  const dispatch = useAppDispatch();

  const allSubItem = useAppSelectorConsumer((state) => state.wishlist);

  const subItem = allSubItem.subItem;

  useEffect(() => {
    if (session?.user.token) {
      if (!allSubItem.init) {
        const fetchCategories = async () => {
          const categories = await getCateogoriesForConsumer();
          if (!categories.error) {
            const filteredCategories = categories.data.data
              ? categories.data.data
              : [];
            dispatch(setWishlist({ data: filteredCategories, init: true }));
          }
        };
        fetchCategories();
      }
    }
  }, [dispatch, session?.user.token]);

  return (
    <Link
      href={`${subItem?.length > 0 ? `/consumer/saved-deals?wish-category=${subItem[0]?.id || ""}&category=${subItem[0]?.name || ""}` : "/consumer/saved-deals"} `}
    >
      <FontAwesomeIcon
        icon={faHeart}
        className="mt-[7px] text-2xl font-thin text-[#3969E0]"
      />
    </Link>
  );
};
