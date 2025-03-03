import { USER_ROLES } from "../../lib/userRoles";
import {
  faArrowLeft,
  faBell,
  faCog,
  faComment,
  faDollar,
  faHandHoldingDollar,
  faHandshakeAngle,
  faHardDrive,
  faHeart,
  faHouse,
  faPallet,
  faPlus,
  faStar,
  faStore,
  faTag,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { faCcVisa } from "@fortawesome/free-brands-svg-icons";
import { SideBarLink } from "../consumer/Sidebar/types";

type SidebarSection = SideBarLink[];

interface SidebarFlavours {
  [key: string]: SidebarSection[];
}

const SIDEBAR_FLAVOURS: SidebarFlavours = {
  [USER_ROLES.CHARITY]: [
    [
      {
        label: "Dashboard",
        icon: faHouse,
        link: "dashboard",
      },
    ],
    [
      {
        label: "Add Campaign",
        icon: faPlus,
        link: "add-campaign",
      },
      {
        label: "My Campaigns",
        icon: faHardDrive,
        link: "campaigns",
      },
      {
        label: "Donation analytics",
        icon: faHandHoldingDollar,
        link: "donation-analytics",
      },
    ],
    [
      {
        label: "My Profile",
        icon: faUser,
        link: "profile",
      },
      {
        label: "My Payouts",
        icon: faCcVisa,
        link: "my-payouts",
      },
      {
        label: "Notifications",
        icon: faBell,
        link: "notifications",
      },
    ],
    [
      {
        label: "Logout",
        icon: faArrowLeft,
        link: "/logout",
      },
    ],
  ],
  [USER_ROLES.CORPORATION]: [
    // Single section for Corporation user role
    [
      {
        label: "Dashboard",
        icon: faHouse,
        link: "dashboard",
      },
    ],
  ],
  [USER_ROLES.CONSUMER]: [
    [
      {
        label: "Dashboard",
        icon: faHouse,
        link: "dashboard",
      },
    ],
    [
      {
        label: "My profile",
        icon: faUser,
        link: "profile",
      },
      {
        label: "Newsletter settings",
        icon: faCog,
        link: "newsletter-settings",
      },
      {
        label: "My donations",
        icon: faCog,
        link: "my-donations",
      },
    ],
    [
      {
        label: "My orders",
        icon: faHardDrive,
        link: "orders",
      },
      {
        label: "My wishlist",
        icon: faTag,
        link: "saved-deals",
      },
      {
        label: "My reviews",
        icon: faComment,
        link: "reviews",
      },
      {
        label: "Notification",
        icon: faBell,
        link: "notifications",
      },
    ],
    [
      {
        label: "My volunteer missions",
        icon: faHandshakeAngle,
        link: "volunteer-missions",
      },
      {
        label: "Notification Setting",
        icon: faBell,
        link: "notification-setting",
      },
      {
        label: "Payments methods",
        icon: faBell,
        link: "payments-methods",
      },
    ],
  ],
};

export default SIDEBAR_FLAVOURS;
