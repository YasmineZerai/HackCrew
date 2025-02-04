import { nanoid } from "nanoid";
import { createTeam, getTeamByCode, joinTeam } from "../database/team";
import mongoose from "mongoose";
import { User } from "../models/user";
export async function createTeamService(teamCreator: String, teamName: String) {
  const customCode = nanoid(6).toUpperCase();
  const members = [teamCreator];
  const newTeam = await createTeam({
    code: customCode,
    members: members,
    teamName: teamName,
  });

  return {
    status: 201,
    success: true,
    message: "Team created successfully",
    payload: { newTeam },
  };
}
export async function joinTeamService(userId: string, teamCode: string) {
  const existingTeam = await getTeamByCode(teamCode);
  if (!existingTeam)
    return {
      success: false,
      message: "invalid/incorrect team code",
      status: 404,
    };
  else {
    const members = existingTeam.members.map((member) => {
      return member.toString();
    });
    console.log(existingTeam);
    console.log(existingTeam.members);
    console.log(members);

    if (members.includes(userId)) {
      return {
        success: false,
        message: "You are already a member of this team",
        status: 400,
      };
    } else {
      const updatedTeam = await joinTeam(userId, existingTeam._id.toString());
      return {
        success: true,
        message: "Congrats ! You got added to the team.",
        status: 200,
        payload: { updatedTeam },
      };
    }
  }
}
