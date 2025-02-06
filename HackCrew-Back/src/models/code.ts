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
  expiresAt: {
    type: Date,
    required: true,
    default: () => new Date(Date.now() + 3600 * 1000),
    index: { expires: 3600 },
  },
});

export const CodeModel = mongoose.model("codes", CodeSchema);
