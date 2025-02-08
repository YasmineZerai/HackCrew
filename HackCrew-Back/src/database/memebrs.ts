import mongoose from "mongoose";
import { MemberModel } from "../models/member";

export async function joinTeam(userId: string, teamId: string) {
  return await MemberModel.create({
    userId,
    teamId,
  });
}
export async function getTeamMembers(teamId: string) {
  return await MemberModel.find({
    teamId: new mongoose.Types.ObjectId(teamId),
  });
}
export async function getUserTeams(userId: string) {
  return await MemberModel.find({
    userId: new mongoose.Types.ObjectId(userId),
  });
}
