import mongoose from "mongoose";
import { MemberModel } from "../models/member";

export async function joinTeam(userId: string, teamId: string) {
  return await MemberModel.create({
    userId,
    teamId,
  });
}
export async function getMembershipsByTeamId(teamId: string) {
  return await MemberModel.find({
    teamId: new mongoose.Types.ObjectId(teamId),
  });
}
export async function getMembershipsByUserId(userId: string) {
  return await MemberModel.find({
    userId,
  });
}
export async function getMember(userId: string, teamId: string) {
  return await MemberModel.findOne({ userId, teamId });
}
