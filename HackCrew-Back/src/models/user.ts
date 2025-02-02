import mongoose from "mongoose";

export interface User {
  _id: mongoose.Types.ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: Date;
  password: string;
}
const userSchema = new mongoose.Schema<User>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  createdAt: Date,
  password: { type: String, required: true },
});
export const UserModel = mongoose.model("users", userSchema);
