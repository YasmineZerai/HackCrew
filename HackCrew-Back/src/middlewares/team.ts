import { NextFunction, Request, Response } from "express";
import { memberIsInTeamService } from "../services/teams";

export const memberVerificationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.body.loggedUser.userId;
  const { teamId } = req.params;
  memberIsInTeamService(teamId, userId).then((isInTeam) => {
    if (isInTeam) return next();
    return next({ status: 403, message: "invalid team Id", success: "false" });
  });
};
