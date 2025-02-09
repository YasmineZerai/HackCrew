import { Server } from "socket.io";
import { onlineUsers } from "..";
import { getMembershipsByTeamId } from "../database/memebrs";
import { notifyTeamMembersService } from "../services/notifications";

export function setUpSocketServer(io: Server) {
  io.on("connection", (socket) => {
    socket.on("join", ({ userId }) => {
      onlineUsers.set(userId, socket.id);
    });
    socket.on("disconnect", () => {
      for (const [userId, socketId] of onlineUsers.entries()) {
        if (socketId === socket.id) {
          onlineUsers.delete(userId);
          break;
        }
      }
    });
    socket.on("alert-team", async ({ message, teamId, userId }) => {
      await notifyTeamMembersService(
        userId,
        teamId,
        message,
        "team-member-alert"
      );
    });
  });
}
