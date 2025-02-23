import { Request, Response } from "express";
import {
  createTeamCodeService,
  createTeamService,
  getTeamByIdService,
  getTeamCodeService,
  getTeamMembersService,
  getTeamsByUserIdService,
  inviteUserToTeamService,
} from "../services/teams";

export const createTeamController = async (req: Request, res: Response) => {
  const teamCreator = req.body.loggedUser.userId;
  const teamName = req.body.teamName;
  const response = await createTeamService(teamCreator, teamName);
  res.status(response.status).json({
    success: response.success,
    message: response.message,
    payload: response.payload,
  });
};
export const createTeamCodeController = async (req: Request, res: Response) => {
  const userId = req.body.loggedUser.userId;
  const teamId = req.params.teamId;
  const response = await createTeamCodeService(teamId, userId);
  res.status(response.status).json({
    success: response.success,
    message: response.message,
    payload: response.payload,
  });
};
export const inviteUserToTeamController = async (
  req: Request,
  res: Response
) => {
  const user = req.body.loggedUser;
  const ivitedUserEmail = req.body.email;
  const { teamId } = req.params;
  const response = await inviteUserToTeamService(
    user.userId,
    ivitedUserEmail,
    teamId
  );
  res.status(response.status).json({
    success: response.success,
    message: response.message,
  });
};
export const getTeamsByUserIdController = async (
  req: Request,
  res: Response
) => {
  const user = req.body.loggedUser;
  const response = await getTeamsByUserIdService(user.userId);
  res.status(response.status).json({
    success: response.success,
    message: response.message,
    payload: response.payload,
  });
};
export const getTeamCodeController = async (req: Request, res: Response) => {
  const userId = req.body.loggedUser.userId;
  const { teamId } = req.params;
  const response = await getTeamCodeService(userId, teamId);
  res.status(response.status).json({
    success: response.success,
    message: response.message,
    payload: response.payload,
  });
};
export const getTeamByIdController = async (req: Request, res: Response) => {
  const userId = req.body.loggedUser.userId;
  const { teamId } = req.params;
  const response = await getTeamByIdService(teamId, userId);
  res.status(response.status).json({
    success: response.success,
    message: response.message,
    payload: response.payload,
  });
};
