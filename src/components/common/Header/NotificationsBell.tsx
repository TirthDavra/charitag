"use client";
import { Bell } from "lucide-react";
import React, { useEffect, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import NotificationsModal from "@/components/common/Header/NotificationsModal";
import {
  getNotificationsList,
  getNotificationsListHeader,
  getTopNotifications,
} from "@/api/common/notifications";
import { useAppDispatch, useAppSelectorCommon } from "@/lib/Store/hooks";
import {
  setCount,
  setModalNotification,
} from "@/lib/Store/slices/commonFeatures/notificationsSlice";
import { INotificationsData } from "@/api/common/types";

const NotificationsBell = ({ redirectUrl }: { redirectUrl: string }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const allNotificationsData = useAppSelectorCommon(
    (state) => state.notifications,
  );

  const dispatch = useAppDispatch();

  const handleNotofication = async () => {
    setIsLoading(true);
    try {
      const response = await getNotificationsListHeader({
        page: 1,
        per_page: 10,
        mark_as_read: 0,
      });
      if (!response.error) {
        // setData(response.data.data);
        dispatch(setModalNotification(response.data.data));
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

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
    <div>
      <div className="flex  cursor-pointer items-center justify-center rounded-full">
        <Popover open={isModalOpen} onOpenChange={setIsModalOpen}>
          <PopoverTrigger>
            <div className="relative">
              <Bell
                className="mx-2 h-[22px] w-[22px] text-merchant_primary"
                onClick={handleNotofication}
                // onClick={() => dispatch(setCount(0))}
              />
              {allNotificationsData.count > 0 && (
                <span className="absolute right-0 top-0 inline-flex h-4 w-4  items-center justify-center rounded-full bg-red-500 text-xs font-medium text-white">
                  {allNotificationsData.count}
                </span>
              )}
            </div>
          </PopoverTrigger>
          <PopoverContent className="mt-6 w-fit">
            <NotificationsModal
              data={allNotificationsData.modalNotifications}
              isLoading={isLoading}
              redirectUrl={redirectUrl}
              setIsModalOpen={setIsModalOpen}
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default NotificationsBell;
