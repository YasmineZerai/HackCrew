import { Request, Response } from "express";
import { createTeamService } from "../services/teams";

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
