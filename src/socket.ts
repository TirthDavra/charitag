"use client";

import { io, Socket } from "socket.io-client";
import { IGetSupportMessages } from "./api/charity/types";
import { getStore } from "./lib/Store/store";

import {
  addNotification,
  incrementCount,
  setNotification,
} from "./lib/Store/slices/commonFeatures/notificationsSlice";
import { IChatHistoryData } from "./components/consumer/Orders/types";
import { addMessageToConsumerChatHistory } from "./lib/Store/slices/consumerFeatures/consumerSupport/consumerSupportSlice";
import { IConsumerChatistoryData } from "./api/merchant/types";
import { addMessageToStoreSupportChatHistory } from "./lib/Store/slices/merchantFeatures/merchantStoreSupport/merchantStoreSupportSlice";
import { addMessageToCMSupportChatHistory } from "./lib/Store/slices/commonFeatures/merchantConsumerSupportChatSlice";
import { IAdminChatistoryData } from "./api/common/types";
import {
  addMessageToAdminSupportChatHistory,
  setUserTyping,
} from "./lib/Store/slices/commonFeatures/adminSupportSlice";
import { NotificationType } from "./constants/notificationTypes";

export let socket: null | Socket = null;
let typingTimeout: NodeJS.Timeout | null = null;
export const connectionWithSocketServer = (userId: number | string) => {
  // const pathname = usePathname();
  socket = io(process.env.NEXT_PUBLIC_SOCKET_URL!, {
    query: {
      userId: userId,
    },
  });
  socket.on("error", (error) => {
    // ...
    console.log("error in socket");
    console.log(error);
  });
  socket.on("connect", () => {
    console.log("Succesfully connected with socket.io server");
    console.log(socket?.id);
  });
  socket.on("connect_error", (e) => {
    console.log("failed connected with socket.io server", e);
    console.log(socket?.id);
  });
  // socket.on("admin-to-charity-msg", (data) => {
  //   console.log("msg-admin-charity", data);
  //   getStore().dispatch(addMessageToCharityChatHistory(data));
  //   getStore().dispatch(incrementCount());
  //   console.log(
  //     "hell owe ",
  //     window.location.pathname.includes("charity/support"),
  //   );
  // });
  socket.on("admin-to-merchant-notify", (data) => {
    console.log("admin-to-merchant-notify", data);
  });
  socket.on("merchant-to-consumer-msg", (data) => {
    console.log("merchant-to-consumer-msg", data);
    getStore().dispatch(addMessageToConsumerChatHistory(data));
  });
  socket.on("message-cm", (data) => {
    getStore().dispatch(addMessageToCMSupportChatHistory(data));
    // if (
    //   data?.sender_id !== getStore().getState().common.userInfo.userDetails?.id
    // ) {
    //   getStore().dispatch(incrementCount());
    // }
  });
  socket.on("msg-notify", (data) => {
    getStore().dispatch(incrementCount());
    console.log("msg-notify", data);

    getStore().dispatch(
      addNotification({
        data: {
          id: data.id,
          updated_at: data.created_at,
          sender: {
            id: data.sender_id,
            profile_image: {
              id: -1,
              path: "",
              thumbnail_path: data.sender_image.replace("original", "small"),
              medium_path: "",
            },
            first_name: data.sender_name,
            last_name: "",
            type: data.user_type,
          },
          notification_type: data.type,
          data: {
            reference_id: Object.hasOwn(data, "cmSupportId")
              ? data.cmSupportId.split("_")[1]
              : data.supportId,
          },
          mark_as_read: false,
        },
      }),
    );
  });

  socket.on("message", (data) => {
    typingTimeout && clearTimeout(typingTimeout);
    typingTimeout = null;
    getStore().dispatch(setUserTyping(null));
    getStore().dispatch(addMessageToAdminSupportChatHistory(data));
  });

  socket.on("user-is-typing", (data) => {
    getStore().dispatch(setUserTyping(data.userName));
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }
    typingTimeout = setTimeout(() => {
      getStore().dispatch(setUserTyping(null));
    }, 5000);
  });
};

const emitData = <T>(event: string, data: T): boolean => {
  if (socket !== null) {
    socket.emit(event, data);
    return true;
  } else {
    return false;
  }
};

export const sendMessage = (data: IAdminChatistoryData) => {
  return emitData("send-message", data);
};

export const userIsTyping = (data: {
  admin_support_id: string;
  userName: string;
}) => {
  return emitData("user-is-typing", data);
};

export const sendMessageToConsumer = (data: IConsumerChatistoryData) => {
  return emitData("merchant-to-consumer-msg", {
    ...data,
    cmSupportId: data.cmSupportId ? "CM_" + data.cmSupportId : undefined,
  });
};

export const supportRoomJoin = (ticketId: string) => {
  return emitData("support-room-join", { ticketId });
};

export const supportRoomJoinCM = (ticketId: string) => {
  return emitData("support-room-join-cm", { ticketId: "CM_" + ticketId });
};

export const sendMessageToCM = (data: IConsumerChatistoryData) => {
  return emitData("message-cm", {
    ...data,
    cmSupportId: data.cmSupportId ? "CM_" + data.cmSupportId : undefined,
  });
};
