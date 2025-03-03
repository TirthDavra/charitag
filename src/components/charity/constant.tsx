import { SideNavItem } from "../common/Menu/types";
import {
  IconCampaigns,
  IconHome,
  IconNotification,
  IconProfile,
  IconStoreSupport,
} from "../svgIcons";

export const SIDENAV_CHARITY_ITEMS: SideNavItem[] = [
  {
    title: "Dashboard",
    path: "/charity/dashboard",
    icon: <IconHome />,
  },
  {
    title: "My Campaigns",
    path: "/charity/my-campaigns",
    icon: <IconCampaigns />,
  },
  {
    title: "Manage Staff",
    path: "/charity/manage-staff",
    icon: <IconProfile />,
  },
  {
    title: "Email Application",
    path: "/charity/email-application",
    icon: <IconProfile />,
  },
  {
    title: "Support",
    path: "/charity/admin-support",
    icon: <IconStoreSupport />,
  },
  {
    title: "My Merchant",
    path: "/charity/my-merchant",
    icon: <IconStoreSupport />,
  },
  {
    title: "Notification",
    path: "/charity/notifications",
     icon: <IconNotification />,
  },
];

export const colorsForStoreStatus = [
  { color: "#ff3939", value: "" },
  { color: "#6DE263", value: "Open" },
  { color: "#FD3939", value: "Closed" },
];
