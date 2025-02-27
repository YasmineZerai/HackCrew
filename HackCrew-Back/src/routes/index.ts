import { Application, Request, Response } from "express";
import { configureUserRoutes } from "./users";
import { configureAuthRoutes } from "./auth";
import { configureTeamsRoutes } from "./teams";
import { configureMembersRoutes } from "./members";
import { configureTodosRoutes } from "./todos";

export function configureRoutes(app: Application) {
  configureUserRoutes(app);
  configureAuthRoutes(app);
  configureTeamsRoutes(app);
  configureMembersRoutes(app);
  configureTodosRoutes(app);
}
