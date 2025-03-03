import { SideNavItem } from "../common/Menu/types";
import { IconCampaigns, IconHome, IconProfile } from "../svgIcons";

export const SIDENAV_CORPORATE_ITEMS: SideNavItem[] = [
    {
        title: "Dashboard",
        path: "/corporation/dashboard",
        icon: <IconHome />,
    },
    {
        title: "My Campaigns",
        path: "/corporation/my-campaigns",
        icon: <IconCampaigns />,
    },
    {
        title: "Manage Staff",
        path: "/corporation/manage-staff",
        icon: <IconProfile />,
    },
    {
        title: "Notifications",
        path: "/corporation/notifications",
        icon: <IconProfile />,
    },
    {
        title: "Admin Support",
        path: "/corporation/admin-support",
        icon: <IconProfile />,
    },
]