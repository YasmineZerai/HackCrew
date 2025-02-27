import { Request, Response } from "express";
import {
  createTodoService,
  getTodosService,
  getTodoByIdService,
  updateTodoService,
  deleteTodoService,
  getTeamTodosService,
  getTodosByStatusService,
} from "../services/todos";

export const createTodoController = async (req: Request, res: Response) => {
  const userId = req.body.loggedUser.userId;
  const { teamId } = req.params;
  const { task, status, dueDate } = req.body;
  const response = await createTodoService(
    userId,
    teamId,
    task,
    status,
    dueDate
  );

  res.status(response.status).json({
    success: response.success,
    message: response.message,
    payload: response.payload,
  });
};
export const getAllTodosController = async (req: Request, res: Response) => {
  const userId = req.body.loggedUser.userId;
  const { teamId } = req.params;
  const response = await getTodosService(userId, teamId);

  res.status(response.status).json({
    success: response.success,
    message: response.message,
    payload: response.payload,
  });
};
export const getTodosController = async (req: Request, res: Response) => {
  const userId = req.body.loggedUser.userId;
  const { teamId } = req.params;
  const response = await getTodosByStatusService(userId, teamId, "todo");

  res.status(response.status).json({
    success: response.success,
    message: response.message,
    payload: response.payload,
  });
};
export const getDoingTodosController = async (req: Request, res: Response) => {
  const userId = req.body.loggedUser.userId;
  const { teamId } = req.params;
  const response = await getTodosByStatusService(userId, teamId, "doing");

  res.status(response.status).json({
    success: response.success,
    message: response.message,
    payload: response.payload,
  });
};
export const getDoneTodosController = async (req: Request, res: Response) => {
  const userId = req.body.loggedUser.userId;
  const { teamId } = req.params;
  const response = await getTodosByStatusService(userId, teamId, "done");

  res.status(response.status).json({
    success: response.success,
    message: response.message,
    payload: response.payload,
  });
};
export const getTodoByIdController = async (req: Request, res: Response) => {
  const userId = req.body.loggedUser.userId;
  const { todoId } = req.params;
  const response = await getTodoByIdService(userId, todoId);

  res.status(response.status).json({
    success: response.success,
    message: response.message,
    payload: response.payload,
  });
};
export const updateTodoController = async (req: Request, res: Response) => {
  const userId = req.body.loggedUser.userId;
  const { todoId } = req.params;
  const { task, status, dueDate } = req.body;
  const response = await updateTodoService(
    userId,
    todoId,
    task,
    status,
    dueDate
  );

  res.status(response.status).json({
    success: response.success,
    message: response.message,
    payload: response.payload,
  });
};
export const deleteTodoController = async (req: Request, res: Response) => {
  const userId = req.body.loggedUser.userId;
  const { todoId } = req.params;
  const response = await deleteTodoService(userId, todoId);

  res.status(response.status).json({
    success: response.success,
    message: response.message,
    // payload: response.payload,
  });
};
export const getTeamTodosController = async (req: Request, res: Response) => {
  const userId = req.body.loggedUser.userId;
  const { teamId } = req.params;
  const response = await getTeamTodosService(userId, teamId);

  res.status(response.status).json({
    success: response.success,
    message: response.message,
    payload: response.payload,
  });
};
