import mongoose from "mongoose";
import { TeamModel } from "../models/team";
import { CodeModel } from "../models/code";

interface createTeamArgs {
  teamName: String;
}

export async function createTeam(args: createTeamArgs) {
  return await TeamModel.create({
    teamName: args.teamName,
  });
}

export async function getTeamById(teamId: string) {
  return await TeamModel.findById(new mongoose.Types.ObjectId(teamId));
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

export async function getTeamByCode(code: string) {
  return await CodeModel.findOne({ code });
}
export async function deleteTeam(teamId: string) {
  await TeamModel.findByIdAndDelete(teamId);
}
