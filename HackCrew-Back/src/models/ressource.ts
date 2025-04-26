import mongoose, { Schema, Document } from "mongoose";
import { User } from "./user";
import { Team } from "./team";

export interface Ressource extends Document {
  _id: mongoose.Types.ObjectId;
  description?: string;
  link: string;
  path: string;
  userId: mongoose.Types.ObjectId | User;
  teamId: mongoose.Types.ObjectId | Team;
  createdAt: Date;
}

const RessourceSchema = new Schema<Ressource>(
  {
    description: { type: String },
    path: { type: String },
    link: { type: String },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    teamId: { type: Schema.Types.ObjectId, ref: "Team", required: true },
  },
  { timestamps: true }
);

export const RessourceModel = mongoose.model<Ressource>(
  "Ressource",
  RessourceSchema
);
