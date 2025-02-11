import { Application } from "express";
import { z } from "zod";
import { validation } from "../middlewares/validate";
import {
  createUserController,
  deleteUserController,
  getUserController,
  updateUserController,
} from "../controllers/users";
import mongoose from "mongoose";
import { authMiddleware } from "../middlewares/auth";

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
  app.get("/users", [authMiddleware, getUserController]);
  app.delete("/users", [authMiddleware, deleteUserController]);
  app.patch("/users", [
    validation(
      z.object({
        body: z
          .object({
            firstName: z.string(),
            password: z.string(),
            lastName: z.string(),
          })
          .partial()
          .strict(),
      })
    ),
    authMiddleware,
    updateUserController,
  ]);
  //   app.post("/users/:userId/verify", [
  //     validation(
  //       z.object({
  //         params: z.object({
  //           postId: z
  //             .string()
  //             .refine((id) => mongoose.Types.ObjectId.isValid(id), {
  //               message: "Invalid Id",
  //             }),
  //         }),
  //         body: z.object({
  //           verficationCode: z.string(),
  //         }),
  //       })
  //     ),
  //   ]);
}
