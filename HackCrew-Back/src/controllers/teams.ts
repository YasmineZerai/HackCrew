import { Request, Response } from "express";
import {
  createTeamCodeService,
  createTeamService,
  joinTeamService,
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
export const joinTeamController = async (req: Request, res: Response) => {
  // const teamCreator = req.body.loggedUser.userId;
  // const code = req.body.code;
  // const response = await joinTeamService(teamCreator, code);
  // res.status(response.status).json({
  //   success: response.success,
  //   message: response.message,
  //   payload: response.payload,
  // });
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
