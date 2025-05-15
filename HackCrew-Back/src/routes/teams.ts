import { Application } from "express";
import { authMiddleware } from "../middlewares/auth";
import { validation } from "../middlewares/validate";
import { z } from "zod";
import {
  createTeamCodeController,
  createTeamController,
  getTeamByIdController,
  getTeamCodeController,
  getTeamsByUserIdController,
  inviteUserToTeamController,
} from "../controllers/teams";
import mongoose from "mongoose";
import { getTeamMembersController } from "../controllers/members";
import { memberVerificationMiddleware } from "../middlewares/team";

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
    memberVerificationMiddleware,
    createTeamCodeController,
  ]);
  //invite user to team
  app.post("/teams/:teamId/invitations", [
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
  app.get("/teams/:teamId/members", [
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
    getTeamMembersController,
  ]);
  //get team code
  app.get("/teams/:teamId/codes", [
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
    getTeamCodeController,
  ]);
  app.get("/teams/:teamId", [
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
    getTeamByIdController,
  ]);
}
