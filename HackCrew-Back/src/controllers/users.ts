import { Request, Response } from "express";
import {
  createUserService,
  deleteUserService,
  getUserService,
  updateUserService,
} from "../services/users";

export const createUserController = async (req: Request, res: Response) => {
  const createdUser = await createUserService(req.body);
  res.status(createdUser.status).json({
    success: createdUser.success,
    message: createdUser.message,
    payload: createdUser.payload,
  });
};
export const getUserController = async (req: Request, res: Response) => {
  const loggedUser = req.body.loggedUser.userId;
  const result = await getUserService(loggedUser);
  res.status(result.status).json({
    success: result.success,
    message: result.message,
    payload: result.payload,
  });
};
export const getUserByIdController = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const result = await getUserService(userId);
  res.status(result.status).json({
    success: result.success,
    message: result.message,
    payload: result.payload,
  });
};
export const deleteUserController = async (req: Request, res: Response) => {
  const userId = req.body.loggedUser.userId;
  const result = await deleteUserService(userId);
  res.status(200).json({ suceess: true, message: "user deleted succesfully" });
};
export const updateUserController = async (req: Request, res: Response) => {
  const userId = req.body.loggedUser.userId;
  const body = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: req.body.password,
  };
  const updatedUser = await updateUserService(body, userId);
  if (updatedUser)
    res.status(200).json({
      sucess: true,
      message: "user updated sucessfully",
      payload: { updatedUser },
    });
  else {
    res.status(404).json({
      sucess: false,
      message: "user not found",
    });
  }
};
