import { Application } from "express";
import { authMiddleware } from "../middlewares/auth";
import { validation } from "../middlewares/validate";
import { z } from "zod";
import mongoose from "mongoose";
import {
  createTodoController,
  getTodosController,
  getTodoByIdController,
  updateTodoController,
  deleteTodoController,
  getAllTodosController,
  getDoneTodosController,
  getDoingTodosController,
  getTeamTodosController,
} from "../controllers/todos";

export function configureTodosRoutes(app: Application) {
  const objectIdSchema = z
    .string()
    .refine((id) => mongoose.Types.ObjectId.isValid(id), {
      message: "Invalid ObjectId",
    });

  app.post("/teams/:teamId/todos/me", [
    authMiddleware,
    validation(
      z.object({
        params: z.object({
          teamId: objectIdSchema,
        }),
        body: z.object({
          task: z.string().min(1, "Task is required"),
          status: z.enum(["todo", "in-progress", "done"]),
          dueDate: z.string().datetime().optional(),
        }),
      })
    ),
    createTodoController,
  ]);

  app.get("/teams/:teamId/todos/me", [
    authMiddleware,
    validation(
      z.object({
        params: z.object({
          teamId: objectIdSchema,
        }),
      })
    ),
    getAllTodosController,
  ]);
  app.get("/teams/:teamId/todos/to-do/me", [
    authMiddleware,
    validation(
      z.object({
        params: z.object({
          teamId: objectIdSchema,
        }),
      })
    ),
    getTodosController,
  ]);
  app.get("/teams/:teamId/todos/doing/me", [
    authMiddleware,
    validation(
      z.object({
        params: z.object({
          teamId: objectIdSchema,
        }),
      })
    ),
    getDoingTodosController,
  ]);
  app.get("/teams/:teamId/todos/done/me", [
    authMiddleware,
    validation(
      z.object({
        params: z.object({
          teamId: objectIdSchema,
        }),
      })
    ),
    getDoneTodosController,
  ]);
  app.get("/todos/:todoId", [
    authMiddleware,
    validation(
      z.object({
        params: z.object({
          todoId: objectIdSchema,
        }),
      })
    ),
    getTodoByIdController,
  ]);
  app.put("/todos/:todoId", [
    authMiddleware,
    validation(
      z.object({
        params: z.object({
          todoId: objectIdSchema,
        }),
        body: z.object({
          task: z.string().optional(),
          status: z.enum(["todo", "in-progress", "done"]).optional(),
          dueDate: z.string().datetime().optional(),
        }),
      })
    ),
    updateTodoController,
  ]);
  app.delete("/todos/:todoId", [
    authMiddleware,
    validation(
      z.object({
        params: z.object({
          todoId: objectIdSchema,
        }),
      })
    ),
    deleteTodoController,
  ]);
  app.get("/teams/:teamId/todos", [
    authMiddleware,
    validation(
      z.object({
        params: z.object({
          teamId: objectIdSchema,
        }),
      })
    ),
    getTeamTodosController,
  ]);
}
