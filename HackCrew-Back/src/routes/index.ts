import { Application, Request, Response } from "express";

export function configureRoutes(app: Application) {
  app.get("/", (req: Request, res: Response) => {
    res.json({ message: "hello there" });
  });
}
