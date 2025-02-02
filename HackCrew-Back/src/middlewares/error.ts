import { NextFunction, Request, Response } from "express";

const errorMiddleware = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status = !error.status ? 500 : error.status;
  const message = status == 500 ? "internal server error" : error.message;
  res.status(status).json({
    status,
    message,
    payload: error.payload,
  });
};
