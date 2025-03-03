// components/SocketConnection.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { connectionWithSocketServer, socket } from "@/socket.ts";
import { getSession, useSession } from "next-auth/react";
const SocketConnection: React.FC = () => {
  const isSecondRender = useRef(false);
  useEffect(() => {
    (async () => {
      const session = await getSession();
      if (session?.user?.userDetails?.id && !socket?.id) {
        connectionWithSocketServer(session.user.userDetails?.id);
        isSecondRender.current = true;
      } else {
        console.log("User not logged in.");
      }

      isSecondRender.current = true;
    })();

    // if ("serviceWorker" in navigator) {
    //   navigator.serviceWorker
    //     .register("../../../service-worker.js")
    //     .then((registration) => {
    //       console.log(
    //         "Service Worker registered with scope:",
    //         registration.scope,
    //       );
    //     })
    //     .catch((error) => {
    //       console.error("Service Worker registration failed:", error);
    //     });
    // }
  }, []);

  return <></>;
};

export default SocketConnection;
