"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React, { useEffect } from "react";
import { SideBarLink } from "./types";
import { usePathname } from "next/navigation";
import { useAppDispatch, useAppSelectorCommon } from "@/lib/Store/hooks";
import { getNotificationsListHeader } from "@/api/common/notifications";
import { setCount } from "@/lib/Store/slices/commonFeatures/notificationsSlice";

const NotificationSidebarItem = ({
  item,
  className,
  setShowSidebar,
}: {
  item: SideBarLink;
  className?: string;
  setShowSidebar?: (show: boolean) => void;
}) => {
  const pathname = usePathname();

  const allNotificationsData = useAppSelectorCommon(
    (state) => state.notifications,
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchTopNotifications = async () => {
      try {
        const response = await getNotificationsListHeader({
          page: 1,
          per_page: 10,
          mark_as_read: 0,
        });
        if (!response.error) {
          dispatch(setCount(response.data.unread_notification));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchTopNotifications();
  }, [dispatch]);

  return (
    <Link href={`/consumer/${item.link}`} className={`block py-2 ${className}`}>
      <div
        className={`relative max-w-fit py-1 pl-4 ${pathname.includes(item.link) ? "rounded-full bg-white pr-4" : ""}`}
        onClick={() => setShowSidebar && setShowSidebar(false)}
      >
        <div className="relative inline-block">
          <FontAwesomeIcon
            icon={item.icon}
            className="max-w-[17px] text-blue-500"
          />
          {allNotificationsData.count && allNotificationsData.count > 0 && (
            <span className="absolute -right-2 -top-1 inline-block rounded-full bg-red-500 px-1 text-xs text-white">
              {allNotificationsData.count}
            </span>
          )}
        </div>
        <span className="whitespace-nowrap pl-[9px] font-bold">
          {item.label}
        </span>
      </div>
    </Link>
  );
};

export default NotificationSidebarItem;
