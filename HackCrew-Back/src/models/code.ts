import mongoose from "mongoose";
import { Team } from "./team";

export interface Code {
  _id: mongoose.Types.ObjectId;
  team: Team | string;
  code: string;
  expiresAt: Date;
}

const CodeSchema = new mongoose.Schema<Code>({
  team: { type: mongoose.Types.ObjectId, ref: "teams", required: true },
  code: { type: String, required: true, unique: true },
  expiresAt: { type: Date, required: true, index: { expires: "7d" } },
});

export const CodeModel = mongoose.model("codes", CodeSchema);
