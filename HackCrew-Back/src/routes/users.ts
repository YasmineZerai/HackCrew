import { Application } from "express";
import { z } from "zod";
import { validation } from "../middlewares/validate";
import { createUserController } from "../controllers/users";

export function configureUserRoutes(app: Application) {
  app.post("/users", [
    validation(
      z.object({
        body: z.object({
          firstName: z.string(),
          lastName: z.string(),
          email: z.string().email(),
          password: z.string(),
        }),
      })
    ),
    createUserController,
  ]);
}
