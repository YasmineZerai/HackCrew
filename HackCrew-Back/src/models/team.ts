import mongoose from "mongoose";
import { User } from "./user";

export interface Team {
  _id: mongoose.Types.ObjectId;
  teamName: String;
}

const TeamSchema = new mongoose.Schema<Team>({
  teamName: { type: String, required: true },
});

export const TeamModel = mongoose.model("teams", TeamSchema);
