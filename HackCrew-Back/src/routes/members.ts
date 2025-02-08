import { Application } from "express";
import { authMiddleware } from "../middlewares/auth";
import { validation } from "../middlewares/validate";
import { z } from "zod";
import {
  createTeamCodeController,
  createTeamController,
  getTeamCodeController,
  getTeamMembersController,
  getTeamsByUserIdController,
  inviteUserToTeamController,
  joinTeamController,
} from "../controllers/teams";
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
}
