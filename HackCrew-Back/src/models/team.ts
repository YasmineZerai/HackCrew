import mongoose from "mongoose";
import { User } from "./user";

export interface Team {
  _id: mongoose.Types.ObjectId;
  teamName: String;
  code: String;
  members: User[] | String[];
}

const TeamSchema = new mongoose.Schema<Team>({
  teamName: { type: String, required: true },
  code: { type: String, required: true, unique: true },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }],
});

export const TeamModel = mongoose.model("teams", TeamSchema);
