import SIDEBAR_FLAVOURS from "@/components/constants/sidebarFlavours";
import { Session } from "next-auth";
import SidebarLink from "./SidebarLink";
import LogoutBtn from "./LogoutBtn";
import WishlistSidebarItem from "./WishlistSidebarItem";
import NotificationSidebarItem from "./NotificationSidebarItem";

const SidebarLinks = ({
  session,
  className,
  setShowSidebar,
}: {
  session?: Session | null;
  className?: string;
  setShowSidebar?: (show: boolean) => void;
}) => {
  const sidebarLinks = session?.user?.role
    ? SIDEBAR_FLAVOURS[session.user.role]
    : [];
  return (
    <div
      className={`h-fit rounded-xl bg-sidebar_color px-5 pt-10  ${className}`}
    >
      <h1 className="text-lg font-bold text-[#2F2F35]">
        {session?.user.userDetails?.first_name}{" "}
        {session?.user.userDetails?.last_name}
      </h1>
      <div className="w-full divide-y-2 divide-[rgba(57,105,224,0.25)]">
        {sidebarLinks &&
          sidebarLinks.map((linksGroup: any[], groupIndex: number) => (
            <div key={`group-${groupIndex}`} className="py-3">
              {linksGroup.map((linkObj: any, linkIndex: number) => {
                if (groupIndex === 2 && linkIndex === 1) {
                  return (
                    <WishlistSidebarItem
                      setShowSidebar={setShowSidebar}
                      key={`link-${groupIndex}-${linkIndex}`}
                      item={linkObj}
                    />
                  );
                }
                if (linkObj.label === "Notification") {
                  return (
                    <NotificationSidebarItem
                      setShowSidebar={setShowSidebar}
                      key={`link-${groupIndex}-${linkIndex}`}
                      item={linkObj}
                      className="w-full"
                    />
                  );
                }
                return (
                  <SidebarLink
                    setShowSidebar={setShowSidebar}
                    key={`link-${groupIndex}-${linkIndex}`}
                    item={linkObj}
                    className="w-full"
                  />
                );
              })}
            </div>
          ))}
        <LogoutBtn />
      </div>
    </div>
  );
};

export default SidebarLinks;
