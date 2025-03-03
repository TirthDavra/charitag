"use client";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useAppDispatch, useAppSelectorCommon } from "@/lib/Store/hooks";
import {
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
import { getTimeAgo, parseMsg } from "@/utils/basicfunctions";
import CheckBox from "@/components/merchant/Custom/CheckBox";

const CorporateNotificationModal = ({
  data,
}: {
  data?: INotificationsData[];
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
    setSelectAll(data?.length === Object.keys(newCheckedItems).length);
  };

  const handleSelectAllChange = () => {
    const newCheckedItems: { [key: number]: boolean } = {};
    if (!selectAll) {
      data?.forEach((item) => {
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
    } else {
      toast.error(parseMsg(response.data.message));
    }
  };

  const handleMarkAsRead = async () => {
    try {
      if (checkedIds) {
        const isIds = checkedIds.split(",");
        const response = await markReadNotification(checkedIds);
        if (!response.error) {
          dispatch(markAsReadNotifications(isIds));
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
  };

  const handleSelectedNotificationRemoval = async () => {
    const response = await deleteNotification(checkedIds);
    if (!response.error) {
      dispatch(
        removeSelectedNotifications(
          new Set(Object.keys(checkedItems).map((item) => Number(item))),
        ),
      );
      toast.success(parseMsg(response.data.message));
    } else {
      toast.error(parseMsg(response.data.message));
    }
  };

  return (
    <div>
      {data && data.length > 0 && (
        <div className="flex items-center gap-[30px] pl-6">
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
              className="text-sm text-merchant_text_color_blue underline"
              onClick={handleSelectedNotificationRemoval}
            >
              Remove selected
            </button>
          </div>
        </div>
      )}
      {data &&
        data.length > 0 &&
        data?.map((item) => (
          <div className="flex items-center gap-[6px] pt-[25px]" key={item.id}>
            <div
              className={`max-w-[1188px] flex-grow rounded-[5px] border border-merchant_border ${item.mark_as_read ? "" : "bg-merchant_header"} `}
            >
              <div className="flex items-center gap-[36px] py-[18px] pl-[25px] pr-[35px]">
                <CheckBox
                  label=""
                  onChange={() => handleCheckboxChange(item.id)}
                  value={checkedItems[item.id] || false}
                  classNameCheckbox="w-[18px] h-[18px] border-[2px]"
                />
                <div className="flex flex-grow items-center gap-[15px]">
                  <Image
                    src={
                      item?.sender?.profile_image?.thumbnail_path
                        ? process.env.NEXT_PUBLIC_APP_IMAGE_API_ENDPOINT +
                          item?.sender?.profile_image?.thumbnail_path
                        : ""
                    }
                    alt=""
                    className="h-[50px] w-[50px] rounded-full"
                    width={50}
                    height={50}
                  />
                  <div className="flex-grow">
                    <span className="text-[15px] font-medium text-merchant_sidebar_text">
                      {item.sender.first_name + " " + item.sender.last_name}
                    </span>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-sm text-merchant_placeholder">
                          {/* {item.notification}{" "} */}
                        </span>
                        <span className="text-sm text-merchant_text_color_blue underline">
                          {item.sender.first_name + " " + item.sender.last_name}
                        </span>
                      </div>
                      <div className="space-x-[15px]">
                        <span className="text-xs text-merchant_sidebar_text">
                          {getTimeAgo(item.updated_at)}
                        </span>
                        {/* <span className="text-sm text-merchant_text_color_blue underline">
                        {item.label}
                      </span> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <button
                className="text-merchant_placeholder"
                onClick={() => handleRemove(item.id)}
              >
                <FontAwesomeIcon icon={faXmark} />
              </button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default CorporateNotificationModal;
