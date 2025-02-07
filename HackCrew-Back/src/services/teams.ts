import { nanoid } from "nanoid";
import {
  createTeam,
  getTeamCode,
  getTeamById,
  joinTeam,
  createTeamCode,
  getTeamByCode,
  getTeamsByUserId,
} from "../database/team";
import mongoose from "mongoose";
import { User } from "../models/user";
import { getUserByEmail } from "../database/users";
import { Team } from "../models/team";
import { sendEmailService } from "./email";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
export async function createTeamService(teamCreator: String, teamName: String) {
  const members = [teamCreator];
  const newTeam = await createTeam({
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
//TODO: add the notification aspect
export async function joinTeamService(userId: string, teamCode: string) {
  const existingTeamCode = await getTeamByCode(teamCode);
  if (!existingTeamCode)
    return {
      success: false,
      message: "invalid/incorrect team code",
      status: 404,
    };
  const team = (await getTeamById(existingTeamCode.team as string)) as Team;
  const members = team.members.map((member) => {
    return member.toString();
  });

  if (members.includes(userId)) {
    return {
      success: false,
      message: "You are already a member of this team",
      status: 400,
    };
  } else {
    const updatedTeam = await joinTeam(userId, team._id.toString());
    return {
      success: true,
      message: "Congrats ! You got added to the team.",
      status: 200,
      payload: { updatedTeam },
    };
  }
}

export async function inviteUserToTeamService(
  InviterId: string,
  invitedEmail: string,
  teamId: string
) {
  const team = await getTeamById(teamId);
  if (!team) return { success: false, status: 400, message: "invalid Team Id" };
  const members = team.members.map((member) => {
    return member.toString();
  });
  if (!members.includes(InviterId)) {
    return {
      success: false,
      message: "Not authorized to invite to this team",
      status: 403,
    };
  }
  const client = process.env.VITE_CLIENT;
  const existingUser = await getUserByEmail(invitedEmail);

  const token = jwt.sign(
    { email: invitedEmail, teamId },
    process.env.JWT_SECRET!,
    { expiresIn: "24h" }
  );

  const invitationLink = existingUser
    ? `${client}/join-team?token=${token}`
    : `${client}/sign-up`;
  const message = await sendEmailService({
    subject: `Invitation To Join ${team.teamName}`,
    to: invitedEmail,
    text: "",
    html: `
      <div style="font-family: Arial, sans-serif; text-align: center;">
        <h2>You're invited to join ${team.teamName}!</h2>
        <p>Hello ${existingUser ? existingUser.firstName : ""} ${
      existingUser ? existingUser.lastName + "!" : "!"
    } You have been invitd to join the ${team.teamName} team on HackCrew </p>
   <p> Click the button below to accept the invitation:</p>
        <a href="${invitationLink}" 
          style="display: inline-block; padding: 10px 20px; color: white; background-color: blue; text-decoration: none; border-radius: 5px;">
          Join Team
        </a>
        <p>If the button doesn't work, copy and paste this link into your browser:</p>
        <p>${invitationLink}</p>
      </div>
    `,
  });
  if (message)
    return {
      success: true,
      message: "Invitation sent successfully",
      status: 200,
    };
  return { success: false, message: "Could not send email", status: 500 };
}

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
export async function getTeamsByUserIdService(userId: string) {
  const teams = await getTeamsByUserId(userId);
  if (teams)
    return {
      success: true,
      status: 200,
      message: "teams fetched successfully",
      payload: { teams },
    };
  return {
    success: false,
    status: 404,
    message: "user isnt member of any team",
  };
}
