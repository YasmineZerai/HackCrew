import { RessourceModel } from "../models/ressource";
import { getTeamById } from "../database/team";
import { memberIsInTeamService } from "./teams";

type CreateRessourceArgs = {
  userId: string;
  teamId: string;
  description?: string;
  link?: string;
  path?: string;
};
type UpdateRessourceArgs = {
  userId: string;
  ressourceId: string;
  description?: string;
  link?: string;
  path?: string;
};
export async function createRessourceService({
  userId,
  teamId,
  description,
  link,
  path,
}: CreateRessourceArgs) {
  if (!link && !path) {
    return {
      status: 400,
      success: false,
      message: "must provide at least link or file",
    };
  }
  const team = await getTeamById(teamId);

  if (!team || !(await memberIsInTeamService(teamId, userId))) {
    return {
      status: 400,
      success: false,
      message: "Invalid team Id",
    };
  }

  const ressource = await RessourceModel.create({
    description,
    link,
    path,
    userId,
    teamId,
  });

  return {
    status: 201,
    success: true,
    message: "Ressource created successfully",
    payload: { ressource },
  };
}

export async function getRessourcesService(userId: string, teamId: string) {
  const team = await getTeamById(teamId);

  if (!team || !(await memberIsInTeamService(teamId, userId))) {
    return {
      status: 400,
      success: false,
      message: "Invalid team Id or you are not a member",
    };
  }

  const ressources = await RessourceModel.find({ teamId });

  return {
    status: 200,
    success: true,
    message: "Ressources fetched successfully",
    payload: { ressources },
  };
}

export async function updateRessourceService({
  userId,
  ressourceId,
  description,
  link,
  path,
}: UpdateRessourceArgs) {
  const ressource = await RessourceModel.findById(ressourceId);

  if (!ressource || ressource.userId.toString() !== userId) {
    return {
      status: 403,
      success: false,
      message: "Cannot update this ressource",
    };
  }

  if (description !== undefined) ressource.description = description;
  if (link !== undefined) ressource.link = link;
  if (path !== undefined) ressource.path = path;

  await ressource.save();

  return {
    status: 200,
    success: true,
    message: "Ressource updated successfully",
    payload: { ressource },
  };
}

export async function deleteRessourceService(
  userId: string,
  ressourceId: string
) {
  const ressource = await RessourceModel.findById(ressourceId);

  if (!ressource || ressource.userId.toString() !== userId) {
    return {
      status: 403,
      success: false,
      message: "Cannot delete this ressource",
    };
  }

  await RessourceModel.findByIdAndDelete(ressourceId);

  return {
    status: 200,
    success: true,
    message: "Ressource deleted successfully",
  };
}
