import { Application } from "express";
import { authMiddleware } from "../middlewares/auth";
import { validation } from "../middlewares/validate";
import { z } from "zod";
import mongoose from "mongoose";
import { memberVerificationMiddleware } from "../middlewares/team";
import { getTeamMessagesController } from "../controllers/messages";

export function configureMessagesRoutes(app: Application) {
  const objectIdSchema = z
    .string()
    .refine((id) => mongoose.Types.ObjectId.isValid(id), {
      message: "Invalid ObjectId",
    });
  app.get("/teams/:teamId/messages", [
    authMiddleware,
    validation(
      z.object({
        params: z.object({
          teamId: objectIdSchema,
        }),
      })
    ),
    memberVerificationMiddleware,
    getTeamMessagesController,
  ]);
}
