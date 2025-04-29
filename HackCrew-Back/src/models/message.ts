import mongoose from "mongoose";
import { User } from "./user";
import { Team } from "./team";

export interface Message {
  _id: mongoose.Types.ObjectId;
  sender: string | User;
  teamId: string | Team;
  content: string;
  createdAt: Date;
}

const MessageSchema = new mongoose.Schema<Message>({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  teamId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "teams",
    required: true,
  },
  createdAt: {
    type: Date,
  },

  content: {
    type: String,
    required: true,
  },
});

export const MessageModel = mongoose.model("Messages", MessageSchema);
