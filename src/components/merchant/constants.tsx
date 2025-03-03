import { Icon } from "@iconify/react";
import { SideNavItem } from "../common/Menu/types";
// import { HomeIcon as HomeIco } from "@images/svg/Home.svg";
import HomeIcon from "@images/svg/Home.svg";
import ProductIcon from "@images/svg/Product.svg";
import OrderIcon from "@images/svg/Orders.svg";
import InvetoryIcon from "@images/svg/Inventory.svg";
import BoxPackageIcon from "@images/svg/BoxPackageIcon.svg";
import SettingIcon from "@images/svg/Setting.svg";
import Image from "next/image";
import {
  AdminSupport,
  IconArrowClockwise,
  IconBoxPackageIcon,
  IconCampaigns,
  IconDeals,
  IconDollar,
  IconHome,
  IconInventory,
  IconNotification,
  IconOrders,
  IconPolicy,
  IconProduct,
  IconProfile,
  IconSetting,
  IconStoreSupport,
  IconThumbsUp,
} from "../svgIcons";

export const SIDENAV_ITEMS: SideNavItem[] = [
  {
    title: "Dashboard",
    path: "/merchant/dashboard",
    pathName: true,
    icon: <IconHome />,
  },
  {
    title: "Products",
    path: "/merchant/products/all?page=1&sort_field=created_at&sort_order=desc",
    icon: <IconProduct />,
    submenu: true,
    commonPath: "products",
    subMenuItems: [
      { title: "Add New", path: "/merchant/products/manage" },
      {
        title: "All Products",
        path: "/merchant/products/all",
      },
    ],
  },
  {
    title: "Orders",
    path: "/merchant/orders",
    pathName: true,
    icon: <IconOrders />,
  },
  {
    title: "Inventory",
    path: "/merchant/inventory",
    pathName: true,
    icon: <IconInventory />,
  },
  {
    title: "Shipping",
    path: "/merchant/shipping",
    pathName: true,
    icon: <IconBoxPackageIcon />,
  },
  {
    title: "Setting",
    path: "/merchant/setting",
    pathName: true,
    icon: <IconSetting />,
  },
  {
    title: "Policy",
    path: "/merchant/policy",
    pathName: true,
    icon: <IconProduct />,
  },
  {
    title: "Payments",
    path: "/merchant/payments",
    pathName: true,
    icon: <IconDollar />,
  },
  {
    title: "Store Support",
    path: "/merchant/support",
    pathName: true,
    icon: <IconStoreSupport />,
  },
  {
    title: "Admin Support",
    path: "/merchant/admin-support",
    pathName: true,
    icon: <AdminSupport />,
  },
  {
    title: "Return",
    path: "/merchant/return",
    pathName: true,
    icon: <IconArrowClockwise />,
  },
  {
    title: "Notification",
    path: "/merchant/notification",
    pathName: true,
    icon: <IconNotification />,
  },
  {
    title: "Reviews",
    path: "/merchant/reviews",
    pathName: true,
    icon: <IconThumbsUp />,
  },
  {
    title: "Manage Staff",
    path: "/merchant/manage-staff",
    pathName: true,
    icon: <IconProfile />,
  },
  {
    title: "My Campaigns",
    path: "/merchant/my-campaigns",
    pathName: true,
    icon: <IconCampaigns />,
  },
  {
    title: "Deals",
    path: "/merchant/deals",
    pathName: true,
    icon: <IconDeals />,
  },
];

export const colorsForTransactionStatus = [
  { color: "#ff3939", value: "" },
  { color: "#FD3939", value: "Withdraw" },
  { color: "#9747FF", value: "payment" },
  { color: "#FD3939", value: "Refund" },
  { color: "#FFD000", value: "Escrow" },
  { color: "#6DE263", value: "Succeeded" },
];

export const colorsForProductStatus = [
  { color: "#6DE263", value: "" }, //0
  { color: "#6DE263", value: "In Review" }, //1
  { color: "#6DE263", value: "Approved" }, //2
  { color: "#FD3939", value: "Declined" }, //3
  { color: "#317eff", value: "On Deal" }, //4
  { color: "#efb200", value: "Draft" }, //5
  { color: "#00d03c", value: "Published" }, //6
];

export const colorsForDealsStatus = [
  { color: "#009B3A", value: "" }, // Dark Green for empty value
  { value: "In review", color: "#CC8400" }, // Dark Orange
  { value: "Approved", color: "#006400" }, // Dark Green
  { value: "Declined", color: "#8B0000" }, // Dark Red
  { value: "On deal", color: "#00008B" }, // Dark Blue
  { value: "Is draft", color: "#696969" }, // DimGray
  { value: "Visible", color: "#CCCC00" }, // Dark Yellow
];

export const PolicyTypes = [
  { value: "1", label: "Shipping policy" },
  { value: "2", label: "Refund policy" },
  { value: "3", label: "Cancellation policy" },
  { value: "4", label: "Return or Exchange policy" },
];

export const colorsForInventoryStatus = [
  { color: "#00d03c", value: "" },
  { color: "#00d03c", value: "in stock" },
  { color: "#FD3939", value: "out of stock" },
  { color: "#3969e0", value: "Low stock" },
];

export const colorsForOrderStatus = [
  { color: "#6DE263", value: "" }, //0
  { color: "#3C7533", value: "Completed" }, //1
  { color: "#3969e0", value: "Processing" }, //2
  { color: "#00d03c", value: "Pending payment" }, //3
  { color: "#9747FF", value: "On hold " }, //4
  { color: "#efb200", value: "Refunded" }, //5
  { color: "#FD3939", value: "Failed	" }, //6
];
