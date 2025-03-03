import React from "react";
import CheckBox from "../merchant/Custom/CheckBox";
import Image from "next/image";
import { getTimeAgo } from "@/utils/basicfunctions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import defaultImg from "@images/user_default_img.jpg";
import { NotificationType } from "@/constants/notificationTypes";

interface INotification {
  id: number;
  notificationType: NotificationType;
  createdAt: string;
  data: {
    reference_id: string;
    [key: string]: unknown;
  };
  markAsRead: boolean;
  sender: {
    id?: number;
    first_name: string;
    last_name?: string;
    profileImage: string;
    type?: number;
  };
}

// const getNotificationMessage = (
//   item: INotification,
//   containerProps?: React.HTMLAttributes<HTMLDivElement>,
// ): JSX.Element => {
//   switch (item.notificationType) {
//     case NotificationType.ACCOUNT_APPROVED:
//       return (
//         <div {...containerProps}>
//           <p>
//             ✅ <span className="font-semibold">Registration Approved</span>:
//             Welcome aboard! Your registration is now approved.
//           </p>
//         </div>
//       );
//     case NotificationType.ACCOUNT_UNBLOCKED:
//       return (
//         <div {...containerProps}>
//           <p>
//             ✅ <span className="font-semibold">Account Unblocked</span>: Your
//             account has been unblocked.
//           </p>
//         </div>
//       );
//     case NotificationType.ACCOUNT_BLOCKED:
//       return (
//         <div {...containerProps}>
//           <p>
//             ✅ <span className="font-semibold">Account Blocked</span>: Your
//             account has been blocked.
//           </p>
//         </div>
//       );
//     case NotificationType.SUPPORT_TICKET_NEW_REPLY:
//       return (
//         <div {...containerProps}>
//           <p>
//             ✅ New reply Received: You have a new reply on support ticket{" "}
//             <Link
//               href={`/merchant/support/${item.data.reference_id}`}
//               className="text-merchant_text_color_blue underline"
//             >
//               #{item.data.reference_id}
//             </Link>
//           </p>
//         </div>
//       );
//     case NotificationType.SUPPORT_TICKET_MERCHANT_RECEIVED:
//       return (
//         <div {...containerProps}>
//           <p>
//             <span>🎫 Support Ticket Received</span>: A new support ticket has
//             been received. Please check the details{" "}
//             <Link
//               href={`/merchant/support/${item.data.reference_id}`}
//               className="text-merchant_text_color_blue underline"
//             >
//               here
//             </Link>
//           </p>
//         </div>
//       );
//     case NotificationType.SUPPORT_TICKET_RESOLVED:
//       return (
//         <div {...containerProps}>
//           <p>
//             ✅ Support Ticket Resolved: Your support ticket has been resolved.
//             <Link href={`/merchant/support/${item.data.reference_id}`}>
//               Check the details
//             </Link>
//           </p>
//         </div>
//       );
//     case NotificationType.ACCOUNT_PENDING_APPROVAL:
//       return (
//         <div {...containerProps}>
//           <p>⏳ Account Pending Approval: Your account is pending approval.</p>
//         </div>
//       );
//     case NotificationType.SUPPORT_TICKET_ADMIN_RECEIVED:
//       return (
//         <div {...containerProps}>
//           <p>
//             <span>🎫 Support Ticket Received</span>: A new support ticket has
//             been received. Please check the details{" "}
//             <Link
//               href={`/admin/support/${item.data.reference_id}`}
//               className="text-merchant_text_color_blue underline"
//             >
//               here
//             </Link>
//           </p>
//         </div>
//       );
//     case NotificationType.SUPPORT_TICKET_ADMIN_RESOLVED:
//       return (
//         <div {...containerProps}>
//           <p>
//             ✅ Support Ticket Resolved: Your support ticket has been resolved.
//             <Link href={`/admin/support/${item.data.reference_id}`}>
//               Check the details
//             </Link>
//           </p>
//         </div>
//       );
//     default:
//       return (
//         <div {...containerProps}>
//           <p>Unknown notification type</p>
//         </div>
//       );
//   }
// };

const notificationMessages: Record<
  NotificationType,
  (
    item: INotification,
    containerProps?: React.HTMLAttributes<HTMLDivElement>,
  ) => JSX.Element
> = {
  [NotificationType.ACCOUNT_APPROVED]: (item, containerProps) => (
    <div {...containerProps}>
      <p>
        ✅ <span className="font-semibold">Registration Approved</span>: Welcome
        aboard! Your registration is now approved.
      </p>
    </div>
  ),
  [NotificationType.ACCOUNT_UNBLOCKED]: (item, containerProps) => (
    <div {...containerProps}>
      <p>
        ✅ <span className="font-semibold">Account Unblocked</span>: Your
        account has been unblocked.
      </p>
    </div>
  ),
  [NotificationType.ACCOUNT_BLOCKED]: (item, containerProps) => (
    <div {...containerProps}>
      <p>
        ✅ <span className="font-semibold">Account Blocked</span>: Your account
        has been blocked.
      </p>
    </div>
  ),
  [NotificationType.SUPPORT_TICKET_NEW_REPLY]: (item, containerProps) => {
    return (
      <div {...containerProps}>
        <p>
          ✅ New reply Received: You have a new reply on support ticket{" "}
          <Link
            href={
              item.sender.type === 5
                ? `support/${item.data.reference_id}`
                : `admin-support/${item.data.reference_id}`
            }
            className="text-merchant_text_color_blue underline"
          >
            #{item.data.reference_id}
          </Link>
          F
        </p>
      </div>
    );
  },
  [NotificationType.SUPPORT_TICKET_MERCHANT_RECEIVED]: (
    item,
    containerProps,
  ) => (
    <div {...containerProps}>
      <p>
        <span>🎫 Support Ticket Received</span>: A new support ticket has been
        received. Please check the details{" "}
        <Link
          href={`/merchant/support/${item.data.reference_id}`}
          className="text-merchant_text_color_blue underline"
        >
          here
        </Link>
      </p>
    </div>
  ),
  [NotificationType.SUPPORT_TICKET_RESOLVED]: (item, containerProps) => (
    <div {...containerProps}>
      <p>
        ✅ Support Ticket Resolved: Your support ticket has been resolved.{" "}
        <Link href={`/merchant/support/${item.data.reference_id}`}>
          Check the details
        </Link>
      </p>
    </div>
  ),
  [NotificationType.ACCOUNT_PENDING_APPROVAL]: (item, containerProps) => (
    <div {...containerProps}>
      <p>⏳ Account Pending Approval: Your account is pending approval.</p>
    </div>
  ),
  [NotificationType.SUPPORT_TICKET_ADMIN_RECEIVED]: (item, containerProps) => (
    <div {...containerProps}>
      <p>
        <span>🎫 Support Ticket Received</span>: A new support ticket has been
        received. Please check the details{" "}
        <Link
          href={`/admin/support/${item.data.reference_id}`}
          className="text-merchant_text_color_blue underline"
        >
          here
        </Link>
      </p>
    </div>
  ),
  [NotificationType.SUPPORT_TICKET_ADMIN_RESOLVED]: (item, containerProps) => (
    <div {...containerProps}>
      <p>
        ✅ Support Ticket Resolved: Your support ticket has been resolved.{" "}
        <Link href={`/admin/support/${item.data.reference_id}`}>
          Check the details
        </Link>
      </p>
    </div>
  ),
  [NotificationType.SUPPORT_TICKET_RESOLVED_BY_ADMIN]: (
    item,
    containerProps,
  ) => (
    <div {...containerProps}>
      <p>✅ Support Ticket Resolved: Your support ticket has been resolved. </p>
    </div>
  ),
};

const getNotificationMessage = (
  item: INotification,
  containerProps?: React.HTMLAttributes<HTMLDivElement>,
): JSX.Element => {
  const messageRenderer = notificationMessages[item.notificationType];
  return messageRenderer ? (
    messageRenderer(item, containerProps)
  ) : (
    <div {...containerProps}>
      <p>Unknown notification type</p>
    </div>
  );
};

const SingleNotification = ({
  handleCheckboxChange,
  isChecked,
  item,
  handleRemove,
}: {
  handleCheckboxChange: (id: number) => void;
  isChecked: boolean;
  item: INotification;
  handleRemove: (id: number) => void;
}) => {
  const senderName =
    `${item.sender.first_name} ${item.sender.last_name || ""}`.trim();
  const profileImageUrl = item?.sender?.profileImage
    ? process.env.NEXT_PUBLIC_APP_IMAGE_API_ENDPOINT + item.sender.profileImage
    : defaultImg; // Default image

  return (
    <div className="flex items-center gap-[6px] pt-[25px]">
      <div
        className={`max-w-[1188px] flex-grow rounded-[5px] border border-merchant_border ${
          item.markAsRead ? "" : "bg-merchant_header"
        }`}
      >
        <div className="flex items-center gap-[36px] py-[18px] pl-[25px] pr-[35px]">
          <CheckBox
            label=""
            onChange={() => handleCheckboxChange(item.id)}
            value={isChecked}
            classNameCheckbox="w-[18px] h-[18px] border-[2px]"
          />
          <div className="flex flex-grow items-center gap-[15px]">
            <Image
              src={profileImageUrl}
              alt={senderName}
              className="h-[50px] w-[50px] rounded-full"
              width={50}
              height={50}
            />
            <div className="flex-grow">
              <span className="text-[15px] font-medium text-merchant_sidebar_text">
                {senderName}
              </span>
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-sm text-merchant_placeholder">
                    {getNotificationMessage(item, {
                      className: "text-sm text-merchant_placeholder",
                    })}
                  </span>
                  {/* <span className="text-sm text-merchant_text_color_blue underline">
                    {senderName}
                  </span> */}
                </div>
                <div className="space-x-[15px]">
                  <span className="text-xs text-merchant_sidebar_text">
                    {getTimeAgo(item.createdAt)}
                  </span>
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
  );
};

export default SingleNotification;

export const SingleNotificationModal = ({ item }: { item: INotification }) => {
  return (
    <div className={`border-b border-merchant_border py-2 `} key={item.id}>
      <div className={` rounded-lg p-3`}>
        <div className="flex items-center gap-[10px] ">
          <div>
            <Image
              src={
                item?.sender?.profileImage
                  ? process.env.NEXT_PUBLIC_APP_IMAGE_API_ENDPOINT +
                    item?.sender?.profileImage
                  : defaultImg
              }
              alt=""
              className="h-[50px] w-[70px] rounded-full"
              width={500}
              height={500}
            />
          </div>
          <div>
            <span className="text-[15px] text-merchant_sidebar_text">
              {getNotificationMessage(item, {
                className: "text-sm text-merchant_placeholder",
              })}
              <span className="text-[15px] text-merchant_text_color_blue">
                {item.sender.first_name + " " + item.sender.last_name}
              </span>{" "}
            </span>
            {/* <div className="text-sm text-merchant_text_color_blue underline">
                      {item.label}
                      </div> */}
          </div>
        </div>
        <div className="pl-12">
          <span className="text-[10px] text-merchant_sidebar_text">
            {getTimeAgo(item.createdAt)}
          </span>
        </div>
      </div>
    </div>
  );
};
