import { RessourceModel } from "../models/ressource";

type CreateRessourceArgs = {
  description?: string;
  link?: string;
  path?: string;
  userId: string;
  teamId: string;
};

export async function createRessource(args: CreateRessourceArgs) {
  return await RessourceModel.create(args);
}

export async function getRessourcesByTeamId(teamId: string) {
  return await RessourceModel.find({ teamId });
}

export async function updateRessource(
  id: string,
  updateData: Partial<CreateRessourceArgs>
) {
  return await RessourceModel.findByIdAndUpdate(id, updateData, { new: true });
}

export async function deleteRessource(id: string) {
  return await RessourceModel.findByIdAndDelete(id);
}
