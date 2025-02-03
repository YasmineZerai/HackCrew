import mongoose from "mongoose";
import { User } from "./user";

export interface Blacklist {
  _id: mongoose.Types.ObjectId;
  owner: User | string;
  token: string;
  expiresAt: Date;
}

const blacklistSchema = new mongoose.Schema<Blacklist>({
  owner: { type: mongoose.Types.ObjectId, ref: "users", required: true },
  token: { type: String, required: true },
  expiresAt: { type: Date, required: true, index: { expires: "7d" } },
});

export const BlacklistModel = mongoose.model("blacklist", blacklistSchema);
