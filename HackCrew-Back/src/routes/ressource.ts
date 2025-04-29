import { Application } from "express";
import { upload, userIdUploadMiddleware } from "../middlewares/upload";
import {
  createRessourceController,
  getRessourcesController,
  updateRessourceController,
  deleteRessourceController,
  getFileController,
} from "../controllers/ressource";
import { authMiddleware } from "../middlewares/auth";
import { validation } from "../middlewares/validate";
import { z } from "zod";
import mongoose from "mongoose";

export function configureRessourceRoutes(app: Application) {
  const objectIdSchema = z
    .string()
    .refine((id) => mongoose.Types.ObjectId.isValid(id), {
      message: "Invalid ObjectId",
    });
  //jawha behi
  app.post(
    "/teams/:teamId/ressources",
    authMiddleware,
    userIdUploadMiddleware,
    upload.single("file"),
    validation(
      z.object({
        params: z.object({ teamId: objectIdSchema }),
        body: z.object({
          description: z.string().optional(),
          link: z.string().url().optional(),
        }),
      })
    ),
    createRessourceController
  );
  //jawha behi
  app.get(
    "/teams/:teamId/ressources",
    authMiddleware,
    validation(
      z.object({
        params: z.object({ teamId: objectIdSchema }),
      })
    ),
    getRessourcesController
  );
  app.get("/files/uploads/:filename", authMiddleware, getFileController);
  //jawha behi
  app.put(
    "/ressources/:ressourceId",
    authMiddleware,
    userIdUploadMiddleware,
    upload.single("file"),
    validation(
      z.object({
        params: z.object({ ressourceId: objectIdSchema }),
        body: z.object({
          description: z.string().optional(),
          link: z.string().url().optional(),
        }),
      })
    ),
    updateRessourceController
  );
  //jawha behi
  app.delete(
    "/ressources/:ressourceId",
    authMiddleware,
    validation(
      z.object({
        params: z.object({ ressourceId: objectIdSchema }),
      })
    ),
    deleteRessourceController
  );
}
