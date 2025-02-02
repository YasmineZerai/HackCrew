import { User, UserModel } from "../models/user";

type CreateUserArgs = {
  firstName: string;
  lastName: string;
  password: string;
  email: string;
};

export async function createUser(args: CreateUserArgs) {
  return await UserModel.create({
    firstName: args.firstName,
    lastName: args.lastName,
    password: args.password,
    email: args.password,
  });
}
export async function getUserByEmail(email: string): Promise<User | null> {
  return await UserModel.findOne({ email });
}
