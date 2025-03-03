"use client";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useAppDispatch, useAppSelectorCommon } from "@/lib/Store/hooks";
import {
  appendNotification,
  markAsAllReadNotifications,
  markAsReadNotifications,
  removeNotification,
  removeSelectedNotifications,
  setNotification,
} from "@/lib/Store/slices/commonFeatures/notificationsSlice";
import { INotificationsData } from "@/api/common/types";
import {
  deleteNotification,
  markReadNotification,
} from "@/api/common/notifications";
import { toast } from "react-toastify";
import {
  formatMessageWithLink,
  getTimeAgo,
  parseMsg,
} from "@/utils/basicfunctions";
import { ShowMoreHandle } from "@/components/common/NavbarLinkPages/CorporateFundraisers/ShowMore";
import NotificationContainer from "@/components/common/SingleNotification";
import SingleNotification from "@/components/common/SingleNotification";
import CheckBox from "@/components/merchant/Custom/CheckBox";
import ConsumerSingleNotification from "@/components/common/ConsumerSingleNotification";

const ManageConsumerNotifications = ({
  data,
  triggerShowMore,
}: {
  data: INotificationsData[];
  triggerShowMore?: React.RefObject<ShowMoreHandle<INotificationsData>>;
}) => {
  const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({});
  // const allNotificationsData = useAppSelectorCommon(
  //   (state) => state.notifications,
  // );
  // const notificationData = allNotificationsData.notifications;
  const [selectAll, setSelectAll] = useState(false);

  const checkedIds = Object.keys(checkedItems)
    .filter((key) => checkedItems[parseInt(key)])
    .join(",");

  const handleCheckboxChange = (id: number) => {
    const isChecked = checkedItems[id];
    const newCheckedItems = { ...checkedItems };
    if (isChecked) {
      delete newCheckedItems[id];
    } else {
      newCheckedItems[id] = true;
    }
    setCheckedItems(newCheckedItems);
    setSelectAll(data.length === Object.keys(newCheckedItems).length);
  };

  const handleSelectAllChange = () => {
    const newCheckedItems: { [key: number]: boolean } = {};
    if (!selectAll) {
      data.forEach((item) => {
        newCheckedItems[item.id] = true;
      });
      setCheckedItems(newCheckedItems);
      setSelectAll(true);
    } else {
      setSelectAll(false);
      setCheckedItems({});
    }
  };

  const dispatch = useAppDispatch();

  // useEffect(() => {
  //   dispatch(setNotification({ data: data, init: true }));
  // }, [dispatch]);

  const handleRemove = async (id: number) => {
    const response = await deleteNotification(id.toString());
    if (!response.error) {
      dispatch(removeNotification(id));
      toast.success(parseMsg(response.data.message));
      if (triggerShowMore?.current) {
        triggerShowMore.current.handleShowMore(true);
      }
    } else {
      toast.error(parseMsg(response.data.message));
    }
  };

  const handleMarkAsRead = async () => {
    try {
      if (checkedIds) {
        const idsArray = checkedIds.split(",");
        const response = await markReadNotification(checkedIds);
        if (!response.error) {
          dispatch(markAsReadNotifications(idsArray));
        }
      } else {
        const response = await markReadNotification();
        if (!response.error) {
          dispatch(markAsAllReadNotifications());
        }
      }
    } catch (error) {
      console.log("error", error);
    }
    setCheckedItems({});
  };

  const handleSelectedNotificationRemoval = async () => {
    const response = await deleteNotification(checkedIds);
    if (!response.error) {
      if (triggerShowMore?.current) {
        triggerShowMore.current.handleShowMore(true);
      }
      dispatch(
        removeSelectedNotifications(
          new Set(Object.keys(checkedItems).map((item) => Number(item))),
        ),
      );
      toast.success(parseMsg(response.data.message));
    } else {
      toast.error(parseMsg(response.data.message));
    }
    if (selectAll) {
      setSelectAll(false);
    }
  };

  return (
    <div>
      {data && data.length > 0 && (
        <div className="flex items-center gap-[30px] pb-5 pl-6">
          <CheckBox
            label=""
            onChange={handleSelectAllChange}
            value={selectAll}
            classNameCheckbox="w-[18px] h-[18px] border-[2px]"
          />
          <div className="flex items-center gap-5">
            <button
              className="text-sm text-merchant_text_color_blue underline"
              onClick={handleMarkAsRead}
            >
              Mark as all read
            </button>
            <button
              className={`text-sm text-merchant_text_color_blue underline ${Object.keys(checkedItems).length === 0 ? "cursor-not-allowed opacity-50" : ""}`}
              onClick={handleSelectedNotificationRemoval}
              disabled={Object.keys(checkedItems).length === 0}
            >
              Remove selected
            </button>
          </div>
        </div>
      )}
      {data &&
        data.length > 0 &&
        data?.map((item) => {
          return (
            <ConsumerSingleNotification
              item={{
                id: item.id,
                notificationType: item.notification_type,
                createdAt: item.updated_at,
                data: item.data,
                markAsRead: item.mark_as_read,
                sender: {
                  id: item.sender.id,
                  first_name: item.sender.first_name,
                  last_name: item.sender.last_name,
                  profileImage: item.sender?.profile_image?.thumbnail_path,
                },
              }}
              handleCheckboxChange={handleCheckboxChange}
              handleRemove={handleRemove}
              isChecked={checkedItems[item.id] || false}
              key={item.id}
            />
          );
        })}
    </div>
  );
};

export default ManageConsumerNotifications;
