import { Application } from "express";

export function configureAuthRoutes(app: Application) {
  app.post("/login");
}
