import { Application } from "express";
import { authMiddleware } from "../middlewares/auth";
import { validation } from "../middlewares/validate";
import { z } from "zod";
import { joinTeamController } from "../controllers/members";
import { leaveTeamController } from "../controllers/members";
import mongoose from "mongoose";

export function configureMembersRoutes(app: Application) {
  //join a team
  app.post("/members", [
    authMiddleware,
    validation(
      z.object({
        body: z.object({
          code: z.string().refine((code) => code.length === 6, {
            message: "invalid team code",
          }),
        }),
      })
    ),
    joinTeamController,
  ]);
  //leave team
  app.delete("/teams/:teamId/members", [
    authMiddleware,
    validation(
      z.object({
        params: z.object({
          teamId: z
            .string()
            .refine((id) => mongoose.Types.ObjectId.isValid(id), {
              message: "invalid team Id",
            }),
        }),
      })
    ),
    leaveTeamController,
  ]);
}
