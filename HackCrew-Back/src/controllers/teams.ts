import { Request, Response } from "express";
import { createTeamService } from "../services/teams";

export const createTeamController = async (req: Request, res: Response) => {
  const teamCreator = req.body.loggedUser.userId;
  const newTeam = await createTeamService(teamCreator);
  res.json({
    payload: { newTeam },
  });
};
