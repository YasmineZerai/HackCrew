import { io, onlineUsers } from "..";
import {
  deleteMembership,
  getMembershipsByTeamId,
  joinTeam,
} from "../database/memebrs";
import { deleteTeam, getTeamByCode, getTeamById } from "../database/team";
import { memberIsInTeamService } from "./teams";

export async function joinTeamService(userId: string, teamCode: string) {
  const existingTeamCode = await getTeamByCode(teamCode);
  if (!existingTeamCode)
    return {
      success: false,
      message: "invalid/incorrect team code",
      status: 404,
    };

  if (await memberIsInTeamService(existingTeamCode.team as string, userId)) {
    return {
      success: false,
      message: "You are already a member of this team",
      status: 400,
    };
  } else {
    const newMembership = await joinTeam(
      userId,
      existingTeamCode.team.toString()
    );
    //notify other team members
    const teamMembers = await getMembershipsByTeamId(
      existingTeamCode.team.toString()
    );
    teamMembers.forEach((membership) => {
      const memberId = membership.userId;
      if (
        onlineUsers.has(memberId.toString()) &&
        memberId.toString() !== userId
      ) {
        io.to(onlineUsers.get(memberId.toString())).emit("team_member_joined", {
          message: `A new member has joined your team!`,
          newMemberId: userId,
          teamId: existingTeamCode.team.toString(),
        });
      }
    });
    return {
      success: true,
      message: "Congrats ! You got added to the team.",
      status: 200,
      payload: { newMembership },
    };
  }
}
export async function leaveTeamService(userId: string, teamId: string) {
  const existingTeam = await getTeamById(teamId);
  if (!existingTeam)
    return {
      success: false,
      message: "invalid/incorrect team id",
      status: 403,
    };

  if (!(await memberIsInTeamService(teamId, userId))) {
    return {
      success: false,
      message: "invalid/incorrect team id",
      status: 403,
    };
  } else {
    const deletedMembership = await deleteMembership(userId, teamId);
    let memberships = await getMembershipsByTeamId(teamId);
    if (memberships.length == 0) {
      await deleteTeam(teamId);
    }
    const teamMembers = await getMembershipsByTeamId(teamId);
    teamMembers.forEach((membership) => {
      const memberId = membership.userId;
      if (
        onlineUsers.has(memberId.toString()) &&
        memberId.toString() !== userId
      ) {
        io.to(onlineUsers.get(memberId.toString())).emit("team_member_left", {
          message: `a member has left the team`,
          memberId: userId,
          teamId: teamId,
        });
      }
    });
    return {
      success: true,
      message: "You left the team",
      status: 200,
      payload: { deletedMembership },
    };
  }
}
