import mongoose from "mongoose";
import { TeamModel } from "../models/team";

interface createTeamArgs {
  teamName: String;
  code: String;
  members: String[];
}
export async function createTeam(args: createTeamArgs) {
  return await TeamModel.create({
    code: args.code,
    members: args.members,
    teamName: args.teamName,
  });
}
export async function getTeamByCode(code: String) {
  return await TeamModel.findOne({ code });
}
export async function joinTeam(userId: string, teamId: string) {
  return await TeamModel.findByIdAndUpdate(
    teamId,
    { $addToSet: { members: new mongoose.Types.ObjectId(userId) } }, // Convert to ObjectId
    { new: true }
  );
}
