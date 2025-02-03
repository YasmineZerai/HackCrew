import mongoose from "mongoose";
import { User } from "./user";

export interface blacklist {
  _id: mongoose.Types.ObjectId;
  owner: User | string;
  token: string;
}

const blacklistSchema = new mongoose.Schema<blacklist>({
  owner: { type: mongoose.Types.ObjectId, ref: "users", required: true },
  token: { type: String, required: true },
});

export const blacklistModel = mongoose.model("blacklist", blacklistSchema);
