import { Request, Response } from "express";
import {
  createRessourceService,
  getRessourcesService,
  updateRessourceService,
  deleteRessourceService,
} from "../services/ressource";
import path from "node:path";

export const createRessourceController = async (
  req: Request,
  res: Response
) => {
  const userId = res.locals.loggedUser.userId;
  const { teamId } = req.params;
  const { description, link } = req.body;
  const path = req.file ? req.file.path : undefined;
  const response = await createRessourceService({
    userId,
    teamId,
    description,
    link,
    path,
  });

  res.status(response.status).json({
    success: response.success,
    message: response.message,
    payload: response.payload,
  });
};
export const getFileController = async (req: Request, res: Response) => {
  try {
    const filePath = path.join(__dirname, "../../uploads", req.params.filename);

    res.sendFile(filePath, {
      headers: {
        "Content-Type": getContentType(req.params.filename),
        "Content-Disposition": `inline; filename="${req.params.filename}"`,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error retrieving file" });
  }
};

function getContentType(filename: string) {
  const ext = path.extname(filename).toLowerCase();
  const types: Record<string, string> = {
    ".pdf": "application/pdf",
    ".jpg": "image/jpeg",
    ".png": "image/png",
  };
  return types[ext] || "application/octet-stream";
}
export const getRessourcesController = async (req: Request, res: Response) => {
  const userId = req.body.loggedUser.userId;
  const { teamId } = req.params;

  const response = await getRessourcesService(userId, teamId);

  res.status(response.status).json({
    success: response.success,
    message: response.message,
    payload: response.payload,
  });
};

export const updateRessourceController = async (
  req: Request,
  res: Response
) => {
  const userId = res.locals.loggedUser.userId;
  const { ressourceId } = req.params;
  const { description, link } = req.body;
  const path = req.file ? req.file.path : undefined;

  const response = await updateRessourceService({
    userId,
    ressourceId,
    description,
    link,
    path,
  });

  res.status(response.status).json({
    success: response.success,
    message: response.message,
    payload: response.payload,
  });
};

export const deleteRessourceController = async (
  req: Request,
  res: Response
) => {
  const userId = res.locals.loggedUser.userId;
  const { ressourceId } = req.params;

  const response = await deleteRessourceService(userId, ressourceId);

  res.status(response.status).json({
    success: response.success,
    message: response.message,
  });
};
