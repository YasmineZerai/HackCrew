import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { getToken } from "../database/auth";
export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authorizationHeader = req.headers.authorization;
  if (!authorizationHeader)
    return next({
      status: 400,
      success: false,
      message: "authorization header required",
    });
  const [_, token] = authorizationHeader.split("Bearer ");
  if (!token)
    return next({
      status: 400,
      success: false,
      message: "authorization header required",
    });
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET as string);
    const existingToken = await getToken(token);
    if (existingToken)
      return next({
        status: 400,
        success: false,
        message: "invalid/expired token",
      });
    Object.assign(req.body, { loggedUser: { ...(payload as any), token } });
  } catch (error) {
    return next({
      status: 400,
      success: false,
      message: "invalid/expired token",
    });
  }
  return next();
};
