import mongoose from "mongoose";
import { User } from "./user";
import { Team } from "./team";

export interface Member {
  _id: mongoose.Types.ObjectId;
  userId: string | User;
  teamId: string | Team;
}

const MemberSchema = new mongoose.Schema<Member>({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  teamId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "teams",
    required: true,
  },
});

export const MemberModel = mongoose.model("members", MemberSchema);
