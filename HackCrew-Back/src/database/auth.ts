import mongoose from "mongoose";
import { BlacklistModel } from "../models/blacklist";
type addTokenArgs = {
  owner: string;
  token: string;
};
export async function addToken(args: addTokenArgs) {
  return await BlacklistModel.create(args);
}
export async function getToken(token: string) {
  return await BlacklistModel.findOne({ token });
}
