import { Request, Response } from "express";
import { joinTeamService, leaveTeamService } from "../services/members";
import { getTeamMembersService } from "../services/teams";

export const getTeamMembersController = async (req: Request, res: Response) => {
  const userId = req.body.loggedUser.userId;
  const { teamId } = req.params;
  const response = await getTeamMembersService(userId, teamId);
  res.status(response.status).json({
    success: response.success,
    message: response.message,
    payload: response.payload,
  });
};
export const joinTeamController = async (req: Request, res: Response) => {
  const user = req.body.loggedUser.userId;
  const code = req.body.code;
  const response = await joinTeamService(user, code);
  res.status(response.status).json({
    success: response.success,
    message: response.message,
    payload: response.payload,
  });
};
export const leaveTeamController = async (req: Request, res: Response) => {
  const userId = req.body.loggedUser.userId;
  const { teamId } = req.params;
  const response = await leaveTeamService(userId, teamId);
  res.status(response.status).json({
    success: response.success,
    message: response.message,
    payload: response.payload,
  });
};
