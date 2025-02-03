import { Application, Request, Response } from "express";
import { configureUserRoutes } from "./users";
import { configureAuthRoutes } from "./auth";

export function configureRoutes(app: Application) {
  configureUserRoutes(app);
  configureAuthRoutes(app);
}
