import { Bell } from "lucide-react";
import React from "react";
import NotificationsModal from "../Notifications/NotificationsModal";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const CharityNotifications = () => {
  return (
    <div>
      <div className="flex  cursor-pointer items-center justify-center rounded-full">
        <Popover>
          <PopoverTrigger>
            <Bell className="mx-2 h-[22px] w-[22px] text-merchant_primary" />
          </PopoverTrigger>
          <PopoverContent className="w-fit mt-6">
            <NotificationsModal />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default CharityNotifications;
