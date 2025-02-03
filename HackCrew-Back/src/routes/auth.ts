import { Application } from "express";
import { validation } from "../middlewares/validate";
import { z } from "zod";
import { loginController, logoutController } from "../controllers/auth";
import { authMiddleware } from "../middlewares/auth";

export function configureAuthRoutes(app: Application) {
  app.post("/login", [
    validation(
      z.object({
        body: z.object({
          email: z.string().email(),
          password: z.string(),
        }),
      })
    ),
    loginController,
  ]);
  app.post("/logout", [authMiddleware, logoutController]);
}
