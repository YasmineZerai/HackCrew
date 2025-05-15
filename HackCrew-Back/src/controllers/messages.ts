import { Request, Response } from "express";

export const getTeamMessagesController = (req: Request, res: Response) => {
  const userId = req.body.loggedUser.userId;
  const { teamId } = req.params;
};
