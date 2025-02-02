import { Request, Response } from "express";
import { createUserService } from "../services/users";

export const createUserController = async (req: Request, res: Response) => {
  const createdUser = await createUserService(req.body);
  res.status(createdUser.status).json({
    success: createdUser.success,
    message: createdUser.message,
    payload: createdUser.payload,
  });
};
