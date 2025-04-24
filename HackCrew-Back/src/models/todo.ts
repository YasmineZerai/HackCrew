import mongoose, { Schema, Document } from "mongoose";
import { User } from "./user";
import { Team } from "./team";

export interface Todo extends Document {
  _id: mongoose.Types.ObjectId;
  task: string;
  description?: string;
  status: "todo" | "doing" | "done";
  userId: mongoose.Types.ObjectId | User;
  teamId: mongoose.Types.ObjectId | Team;
  dueDate?: Date;
  createdAt: Date;
}

const TodoSchema = new Schema<Todo>(
  {
    task: { type: String, required: true },
    status: {
      type: String,
      enum: ["todo", "doing", "done"],
      default: "todo",
    },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    teamId: { type: Schema.Types.ObjectId, ref: "Team", required: true },
    dueDate: { type: Date },
  },
  { timestamps: true }
);

export const TodoModel = mongoose.model<Todo>("Todo", TodoSchema);
