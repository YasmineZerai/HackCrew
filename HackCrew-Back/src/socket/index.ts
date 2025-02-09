import { Server } from "socket.io";
import { onlineUsers } from "..";

export function setUpSocketServer(io: Server) {
  io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);
    socket.on("join", (userId) => {
      onlineUsers.set(userId, socket.id);
      console.log(onlineUsers);
    });
    socket.on("disconnect", () => {
      for (const [userId, socketId] of onlineUsers.entries()) {
        if (socketId === socket.id) {
          onlineUsers.delete(userId);
          break;
        }
      }
    });
  });
}
