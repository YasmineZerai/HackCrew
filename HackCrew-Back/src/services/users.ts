import { createUser, getUserByEmail } from "../database/users";
import bcrypt from "bcrypt";

type CreateUserArgs = {
  firstName: string;
  lastName: string;
  password: string;
  email: string;
};
export async function createUserService(args: CreateUserArgs) {
  const existingUser = await getUserByEmail(args.email);

  if (existingUser)
    return {
      status: 400,
      success: false,
      message: "user already exists",
    };
  const hashedPassword = await bcrypt.hash(args.password, 10);
  const newUser = await createUser({
    firstName: args.firstName,
    lastName: args.lastName,
    email: args.email,
    password: hashedPassword,
  });
  return {
    success: true,
    status: 201,
    message: "user created successfully",
    payload: { newUser },
  };
}
