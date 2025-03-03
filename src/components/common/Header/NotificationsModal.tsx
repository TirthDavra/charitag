import React from "react";
import { INotificationsData } from "@/api/common/types";
import Link from "next/link";
import { markReadNotification } from "@/api/common/notifications";
import { useAppDispatch } from "@/lib/Store/hooks";
import {
  markAsAllReadNotifications,
  setCount,
  setModalNotification,
} from "@/lib/Store/slices/commonFeatures/notificationsSlice";
import { SingleNotificationModal } from "../SingleNotification";
import { Spinner } from "@/components/ui/spinner";
import { Skeleton } from "@/components/ui/skeleton";

const NotificationsModal = ({
  data,
  isLoading,
  redirectUrl,
  setIsModalOpen,
}: {
  data: INotificationsData[];
  isLoading: boolean;
  redirectUrl: string;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  // console.log("data", data.map((item) => item.id).join(","));

  const dispatch = useAppDispatch();

  const handleMarkRead = async () => {
    // const response = await markReadNotification(
    //   data.map((item) => item.id).join(","),
    // );
    const response = await markReadNotification();
    if (!response.error) {
      dispatch(markAsAllReadNotifications());
      dispatch(setModalNotification([]));
      dispatch(setCount(0));
    }
  };

  return (
    <div className="">
      <div className="thin_scrollbar relative w-[450px] overflow-y-auto rounded-[10px] bg-white px-2">
        <div className="">
          <div className="sticky top-0 z-10 flex items-center justify-between border-b border-merchant_border bg-white pb-5">
            <span className="text-lg font-medium"> Notifications</span>
            {data?.length > 0 && (
              <button
                className="text-sm text-merchant_text_color_blue"
                onClick={handleMarkRead}
              >
                Mark As All Read{" "}
              </button>
            )}
          </div>
          <div className="flex max-h-[450px] flex-col justify-between">
            {isLoading ? (
              // <Spinner />

              <div className="mt-3 space-y-4">
                <div className="flex items-center space-x-4">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                  </div>
                </div>
              </div>
            ) : data && data?.length > 0 ? (
              data.map((item) => (
                // <div
                //   className={`border-b border-merchant_border py-2 `}
                //   key={item.id}
                // >
                //   <div className={` rounded-lg p-3`}>
                //     <div className="flex items-center gap-[10px] ">
                //       <div>
                //         <Image
                //           src={
                //             item?.sender?.profile_image
                //               ? process.env.NEXT_PUBLIC_APP_IMAGE_API_ENDPOINT +
                //                 item?.sender?.profile_image
                //               : defaultImg
                //           }
                //           alt=""
                //           className="h-[50px] w-[80px] rounded-full"
                //           width={500}
                //           height={500}
                //         />
                //       </div>
                //       <div>
                //         <span className="text-[15px] text-merchant_sidebar_text">

                //           {/* {item.notification}{" "} */}
                //           <span className="text-[15px] text-merchant_text_color_blue">
                //             {item.sender.first_name +
                //               " " +
                //               item.sender.last_name}
                //           </span>{" "}
                //         </span>
                //         {/* <div className="text-sm text-merchant_text_color_blue underline">
                //       {item.label}
                //       </div> */}
                //       </div>
                //     </div>
                //     <div className="pl-12">
                //       <span className="text-[10px] text-merchant_sidebar_text">
                //         {getTimeAgo(item.updated_at)}
                //       </span>
                //     </div>
                //   </div>
                // </div>
                <SingleNotificationModal
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
                      type: item.sender?.type || -1,
                    },
                  }}
                  key={item.id}
                />
              ))
            ) : (
              <div className="py-3 text-center">No Notifications Found</div>
            )}

            {data.length > 0 && (
              <div className="sticky bottom-0 z-10 w-[418px] bg-white pt-[15px] text-end">
                <Link
                  href={redirectUrl}
                  className="text-sm text-merchant_text_color_blue underline"
                  onClick={() => setIsModalOpen(false)}
                >
                  View All
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationsModal;
