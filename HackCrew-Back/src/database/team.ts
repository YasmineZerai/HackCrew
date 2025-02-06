import mongoose from "mongoose";
import { TeamModel } from "../models/team";
import { CodeModel } from "../models/code";

interface createTeamArgs {
  teamName: String;
  // code: String;
  members: String[];
}
export async function createTeam(args: createTeamArgs) {
  return await TeamModel.create({
    members: args.members,
    teamName: args.teamName,
  });
}
export async function getTeamById(teamId: string) {
  return await TeamModel.findById(teamId);
}
export async function getTeamCode(teamId: String) {
  return await CodeModel.findOne({ team: teamId });
}
export async function createTeamCode(teamId: string, teamCode: string) {
  return await CodeModel.create({
    team: teamId,
    code: teamCode,
  });
}
export async function joinTeam(userId: string, teamId: string) {
  return await TeamModel.findByIdAndUpdate(
    teamId,
    { $addToSet: { members: new mongoose.Types.ObjectId(userId) } }, // Convert to ObjectId
    { new: true }
  );
}
export async function getTeamByCode(code: string) {
  return await CodeModel.findOne({ code });
}
