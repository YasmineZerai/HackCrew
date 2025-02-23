import { nanoid } from "nanoid";
import {
  createTeam,
  getTeamCode,
  getTeamById,
  createTeamCode,
  getTeamByCode,
} from "../database/team";
import { getUserByEmail, getUserById } from "../database/users";
import { Team } from "../models/team";
import { sendEmailService } from "./email";
import jwt from "jsonwebtoken";
import {
  getMember,
  getMembershipsByTeamId,
  getMembershipsByUserId,
  joinTeam,
} from "../database/memebrs";
//jawha behi
export async function memberIsInTeamService(teamId: string, userId: string) {
  const member = await getMember(userId, teamId);
  if (member) return true;
  return false;
}
//jawha behi
export async function createTeamService(teamCreator: string, teamName: string) {
  const newTeam = await createTeam({
    teamName: teamName,
  });
  const teamId = newTeam._id.toString();
  const newMember = await joinTeam(teamCreator, teamId);
  return {
    status: 201,
    success: true,
    message: "Team created successfully",
    payload: { newTeam },
  };
}
//jawha behi
//TODO: add the notification aspect

//jawha behi
export async function inviteUserToTeamService(
  inviterId: string,
  invitedEmail: string,
  teamId: string
) {
  if (!(await memberIsInTeamService(teamId, inviterId))) {
    return {
      success: false,
      message: "Not authorized to invite to this team",
      status: 403,
    };
  }
  const team = (await getTeamById(teamId)) as Team;
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
//jawha behi
export async function createTeamCodeService(teamId: string, userId: string) {
  if (!(await memberIsInTeamService(teamId, userId)))
    return {
      success: false,
      status: 403,
      message: "cannot create code for this team",
    };
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
//jawha behi
export async function getTeamsByUserIdService(userId: string) {
  const memberships = await getMembershipsByUserId(userId);
  if (memberships.length == 0)
    return {
      success: true,
      status: 200,
      message: "teams fetched successfully",
      payload: { teams: [] },
    };

  const teams = await Promise.all(
    memberships.map(async (membership) => {
      return getTeamById(membership.teamId as string);
    })
  );
  return {
    success: true,
    status: 200,
    message: "teams fetched successfully",
    payload: { teams },
  };
}
//jawha behi
export async function getTeamMembersService(userId: string, teamId: string) {
  if (await memberIsInTeamService(teamId, userId)) {
    const memberships = await getMembershipsByTeamId(teamId);

    if (memberships) {
      const users = await Promise.all(
        memberships.map(async (membership) => {
          const user = await getUserById(membership.userId as string);
          return {
            userId: user?._id,
            firstName: user?.firstName,
            lastName: user?.lastName,
            email: user?.email,
          };
        })
      );
      return {
        success: true,
        status: 200,
        message: "users fetched successfully",
        payload: { users },
      };
    }
  }
  return {
    success: false,
    status: 403,
    message: "cannot get Team members",
  };
}
//jawha behi
export async function getTeamCodeService(userId: string, teamId: string) {
  if (!(await memberIsInTeamService(teamId, userId)))
    return {
      status: 403,
      message: "cannot get code for this team",
      success: false,
    };
  const existingTeamCode = await getTeamCode(teamId);
  if (!existingTeamCode)
    return {
      status: 200,
      message: "team does not have a code",
      success: false,
    };
  else
    return {
      success: true,
      status: 200,
      message: "code fetched successfully",
      payload: { existingTeamCode },
    };
}
export async function getTeamByIdService(teamId: string, userId: string) {
  if (!(await memberIsInTeamService(teamId, userId)))
    return {
      success: false,
      status: 403,
      message: "cannot get this team",
    };
  const team = await getTeamById(teamId);
  if (!team)
    return {
      success: false,
      status: 400,
      message: "invalid Team Id",
    };

  return {
    success: true,
    status: 201,
    message: "team fetched successfully",
    payload: { team },
  };
}
