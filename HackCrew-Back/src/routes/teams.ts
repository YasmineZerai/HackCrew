import { Application } from "express";
import { authMiddleware } from "../middlewares/auth";
import { validation } from "../middlewares/validate";
import { z } from "zod";
import { createTeamController } from "../controllers/teams";
import mongoose from "mongoose";

export function configureTeamsRoutes(app: Application) {
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
  app.patch("/teams", [
    authMiddleware,
    validation(
      z.object({
        body: z.object({
          code: z.string().refine(
            (code) => {
              code.length == 6;
            },
            { message: "invalid team code" }
          ),
        }),
      })
    ),
  ]);
}
