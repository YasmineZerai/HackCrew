import { Application, Request, Response } from "express";
import { configureUserRoutes } from "./users";

export function configureRoutes(app: Application) {
  configureUserRoutes(app);
}
