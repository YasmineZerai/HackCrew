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
  expiresAt: {
    type: Date,
    required: true,
    default: () => new Date(Date.now() + 3600 * 1000 * 24 * 7),
  },
});
blacklistSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export const BlacklistModel = mongoose.model("blacklist", blacklistSchema);
