"use client";
import { INotificationsData, INotificationsResponse } from "@/api/common/types";
import React, { useEffect, useState } from "react";
import ShowMore from "@/components/common/NavbarLinkPages/CorporateFundraisers/ShowMore";
import { useAppDispatch, useAppSelectorCommon } from "@/lib/Store/hooks";
import {
  appendNotification,
  setNotification,
} from "@/lib/Store/slices/commonFeatures/notificationsSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faBellSlash } from "@fortawesome/free-solid-svg-icons";
import ManageNotifications from "@/components/common/Notifications/ManageNotifications";

const CharityNotificationsContainer = ({
  notificationDataProp,
}: {
  notificationDataProp: INotificationsResponse;
}) => {
  const allNotificationsData = useAppSelectorCommon(
    (state) => state.notifications,
  );
  const notificationData = allNotificationsData.notifications;

  const [curPage, setCurPage] = useState(1);

  const dispatch = useAppDispatch();

  const handlePageChange = (newPage: number) => {
    setCurPage(newPage);
  };

  useEffect(() => {
    dispatch(
      setNotification({
        data: notificationDataProp.data,
        init: false,
        total: notificationDataProp?.total,
      }),
    );
    setCurPage(1);
  }, [dispatch]);

  return (
    <div>
      {notificationData?.length === 0 && (
        <div className="flex h-80 flex-col items-center justify-center">
          <h1 className="mb-2 text-4xl font-bold text-gray-400">
            <FontAwesomeIcon icon={faBellSlash} className="text-8xl" />
          </h1>
          <p className="text-2xl text-gray-400">No notifications available</p>
        </div>
      )}
      <ManageNotifications data={notificationData} />
      <div className="pt-14">
        <ShowMore
          page={curPage}
          handlePageChange={handlePageChange}
          setDataFunction={(
            data: INotificationsData[],
            total: number,
            isSelectedRemove,
          ) => {
            dispatch(
              appendNotification({
                data: data,
                total,
                isSelectedRemove,
              }),
            );
          }}
          url="/notifications/dashboard/list"
          accessorKey="data"
          total={notificationDataProp?.total}
          currentLength={notificationData?.length}
          per_page={5}
          showmoreclass="text-[13px] font-normal rounded-sm !shadow-none"
        />
      </div>
    </div>
  );
};

export default CharityNotificationsContainer;
