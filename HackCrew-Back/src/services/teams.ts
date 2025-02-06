import { nanoid } from "nanoid";
import {
  createTeam,
  getTeamCode,
  getTeamById,
  joinTeam,
  createTeamCode,
} from "../database/team";
import mongoose from "mongoose";
import { User } from "../models/user";
import { getUserByEmail } from "../database/users";
export async function createTeamService(teamCreator: String, teamName: String) {
  // const customCode = nanoid(6).toUpperCase();
  const members = [teamCreator];
  const newTeam = await createTeam({
    // code: customCode,
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
  // const existingTeam = await getTeamByCode(teamCode);
  // if (!existingTeam)
  //   return {
  //     success: false,
  //     message: "invalid/incorrect team code",
  //     status: 404,
  //   };
  // else {
  //   const members = existingTeam.members.map((member) => {
  //     return member.toString();
  //   });
  //   console.log(existingTeam);
  //   console.log(existingTeam.members);
  //   console.log(members);
  //   if (members.includes(userId)) {
  //     return {
  //       success: false,
  //       message: "You are already a member of this team",
  //       status: 400,
  //     };
  //   } else {
  //     const updatedTeam = await joinTeam(userId, existingTeam._id.toString());
  //     return {
  //       success: true,
  //       message: "Congrats ! You got added to the team.",
  //       status: 200,
  //       payload: { updatedTeam },
  //     };
  //   }
  // }
}
// export async function inviteUserToTeamService(
//   userEmail: string,
//   teamId: string
// ) {
//   const existingUser=getUserByEmail(userEmail);
//   if (existingUser)
// }

export async function createTeamCodeService(teamId: string, userId: string) {
  const team = await getTeamById(teamId);
  if (!team) return { success: false, status: 400, message: "invalid Team Id" };
  const members = team.members.map((member) => {
    return member.toString();
  });
  if (!members.includes(userId))
    return { success: false, status: 400, message: "invalid user Id" };
  const existingTeamCode = await getTeamCode(teamId);

  if (existingTeamCode)
    return {
      success: false,
      status: 400,
      message: "this team already has a code",
    };
  const teamCode = nanoid(6).toUpperCase();

  const payload = await createTeamCode(teamId, teamCode);

  return {
    success: true,
    status: 201,
    message: "code created successfully, this code lasts one hour",
    payload: { payload },
  };
}
