import { Application } from "express";
import { authMiddleware } from "../middlewares/auth";
import { validation } from "../middlewares/validate";
import { z } from "zod";
import { createTeamController } from "../controllers/teams";

export function configureTeamsRoutes(app: Application) {
  app.post("/teams", [authMiddleware, createTeamController]);
}
