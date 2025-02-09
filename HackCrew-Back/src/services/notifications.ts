import { io, onlineUsers } from "..";
import { getMembershipsByTeamId } from "../database/memebrs";

export async function notifyTeamMembersService(
  userId: string,
  teamId: string,
  message: string,
  event: string
) {
  const teamMembers = await getMembershipsByTeamId(teamId);
  teamMembers.forEach((membership) => {
    const memberId = membership.userId;
    if (
      onlineUsers.has(memberId.toString()) &&
      memberId.toString() !== userId
    ) {
      io.to(onlineUsers.get(memberId.toString())).emit(event, {
        message: message,
        memberId: userId,
        teamId: teamId,
      });
    }
  });
}
