import { Application } from "express";
import { authMiddleware } from "../middlewares/auth";
import { validation } from "../middlewares/validate";
import { z } from "zod";
import {
  createTeamCodeController,
  createTeamController,
  getTeamMembersController,
  getTeamsByUserIdController,
  inviteUserToTeamController,
  joinTeamController,
} from "../controllers/teams";
import mongoose from "mongoose";

export function configureTeamsRoutes(app: Application) {
  //create team
  app.post("/teams", [
    authMiddleware,
    validation(
      z.object({
        body: z.object({
          teamName: z.string(),
        }),
      })
    ),
    createTeamController,
  ]);
  //join a team
  app.patch("/teams", [
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
  //generate a code for a team
  app.post("/teams/:teamId/codes", [
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
    createTeamCodeController,
  ]);
  //invite user to team
  app.post("/teams/:teamId/users", [
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
        body: z.object({
          email: z.string().email(),
        }),
      })
    ),
    inviteUserToTeamController,
  ]);
  //get all teams for the logged user
  app.get("/teams", [authMiddleware, getTeamsByUserIdController]);
  //get team members
  app.get("/teams/:teamId/users", [authMiddleware, getTeamMembersController]);
  //get team code
  app.get("/teams/:teamId/codes", [authMiddleware]);
}
