"use client";
import { INotificationsData, INotificationsResponse } from "@/api/common/types";
import React, { useEffect, useRef, useState } from "react";
import ShowMore, {
  ShowMoreHandle,
} from "@/components/common/NavbarLinkPages/CorporateFundraisers/ShowMore";
import { useAppDispatch, useAppSelectorCommon } from "@/lib/Store/hooks";
import { setNotification } from "@/lib/Store/slices/commonFeatures/notificationsSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBellSlash } from "@fortawesome/free-solid-svg-icons";
import { appendNotification } from "../../../lib/Store/slices/commonFeatures/notificationsSlice";
import ManageNotifications from "@/components/common/Notifications/ManageNotifications";

const CorporateNotificationsContainer = ({
  notificationDataProp,
}: {
  notificationDataProp: INotificationsResponse;
}) => {
  const allNotificationsData = useAppSelectorCommon(
    (state) => state.notifications,
  );
  const notificationData = allNotificationsData.notifications;
  const showMoreRef = useRef<ShowMoreHandle<INotificationsData>>(null);
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
      <ManageNotifications
        data={notificationData}
        triggerShowMore={showMoreRef}
      />
      <div className="pt-14">
        <ShowMore
          ref={showMoreRef}
          page={curPage}
          handlePageChange={handlePageChange}
          setDataFunction={(
            data: INotificationsData[],
            total,
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
          total={allNotificationsData.total}
          currentLength={notificationData?.length}
          per_page={10}
          showmoreclass="text-[13px] font-normal rounded-sm !shadow-none"
        />
      </div>
    </div>
  );
};

export default CorporateNotificationsContainer;
