import { io, onlineUsers } from "..";
import {
  deleteMembership,
  getMembershipsByTeamId,
  joinTeam,
} from "../database/memebrs";
import { deleteTeam, getTeamByCode, getTeamById } from "../database/team";
import { notifyTeamMembersService } from "./notifications";
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
    await notifyTeamMembersService(
      userId,
      existingTeamCode.team.toString(),
      "a new team member joined",
      "team-member-joined"
    );
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
    await notifyTeamMembersService(
      userId,
      teamId,
      "a member has left the team",
      "team-member-left"
    );
    return {
      success: true,
      message: "You left the team",
      status: 200,
      payload: { deletedMembership },
    };
  }
}
