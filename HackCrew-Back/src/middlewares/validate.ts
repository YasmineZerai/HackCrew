import { NextFunction, query, Request, Response } from "express";
import { z } from "zod";

export const validation = (schema: z.AnyZodObject) => {
  const validationMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const validationResult = schema.safeParse({
      body: req.body,
      params: req.params,
      query: req.query,
    });
    if (!validationResult.success) {
      const payload: Record<string, string> = {};
      for (const error of validationResult.error.errors) {
        payload[error.path[error.path.length - 1]] = error.message;
      }
      next({
        status: 400,
        message: "this error happened while validating your request",
      });
    }
  };
  return validationMiddleware;
};
