import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";
import { NotificationType } from "./constants/notificationTypes";

const dev = process.env.NODE_ENV !== "production";
const hostname = process.env.SOCKET_HOSTNAME || "localhost";
const port = Number(process.env.SOCKET_PORT) || 3000;
// when using middleware hostname and port must be provided below
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer(handler);
  const connectedUsers = new Map();

  const io = new Server(httpServer, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId;
    console.log("New client connected", userId);

    if (connectedUsers.has(userId)) {
      connectedUsers.get(userId)?.push(socket.id);
    } else {
      connectedUsers.set(userId, [socket.id]);
    }

    socket.on("disconnect", () => {
      console.log("Client disconnected", socket.id);
      const sockets = connectedUsers.get(userId);
      if (sockets) {
        const updatedSockets = sockets.filter((id: string) => id !== socket.id);
        if (updatedSockets.length > 0) {
          connectedUsers.set(userId, updatedSockets);
        } else {
          connectedUsers.delete(userId);
        }
      }
    });

    socket.on("reconnect", () => {
      console.log("Client reconnected", socket.id);
    });

    socket.on("user-is-typing", (data) => {
      console.log("user-is-typing", data);
      const { admin_support_id } = data;
      socket.to(admin_support_id).emit("user-is-typing", data);
    });

    // Admin - Support
    socket.on("support-room-join", (data) => {
      console.log("support-room-join", data);
      if (data?.ticketId) {
        socket.join(data.ticketId);
      }
      console.log("rooms ", socket.rooms);
    });

    socket.on("send-message", (data) => {
      console.log("send-message", data);
      const { supportId } = data;
      // Send message to user
      socket.to(supportId).emit("message", data);
      // Notify user about new message
      if (data?.receiver_id) {
        const receiver_id = data?.receiver_id.toString();
        const receiverSockets = connectedUsers.get(receiver_id);
        if (receiverSockets) {
          for (let i = 0; i < receiverSockets?.length; i++) {
            socket.to(receiverSockets[i]).emit("msg-notify", {
              ...data,
              type: NotificationType.SUPPORT_TICKET_NEW_REPLY,
            });
          }
        }
      }
    });

    // Consumer - Merchant

    socket.on("support-room-join-cm", (data) => {
      console.log("support-room-join-cm", data);
      if (data?.ticketId) {
        socket.join(data.ticketId);
      }
      console.log("rooms ", socket.rooms);
    });

    socket.on("message-cm", (data) => {
      console.log("message-cm", data);
      const { cmSupportId } = data;
      socket.to(cmSupportId).emit("message-cm", data);
      const receiver_id = data?.receiver_id.toString();
      console.log("receiver_id", receiver_id);
      const receiverSockets = connectedUsers.get(receiver_id);
      console.log("receiverSockets", receiverSockets);
      if (receiver_id && receiverSockets) {
        for (let i = 0; i < receiverSockets?.length; i++) {
          socket.to(receiverSockets[i]).emit("msg-notify", {
            ...data,
            type: NotificationType.SUPPORT_TICKET_NEW_REPLY,
          });
        }
      }
    });
  });

  httpServer
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});
