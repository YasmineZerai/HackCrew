import { Application, Request, Response } from "express";
import { configureUserRoutes } from "./users";
import { configureAuthRoutes } from "./auth";
import { configureTeamsRoutes } from "./teams";

export function configureRoutes(app: Application) {
  configureUserRoutes(app);
  configureAuthRoutes(app);
  configureTeamsRoutes(app);
}
