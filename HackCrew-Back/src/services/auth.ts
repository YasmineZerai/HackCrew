import { getUserByEmail } from "../database/users";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { addToken, getToken } from "../database/auth";

type LoginArgs = {
  email: string;
  password: string;
};
type LogoutArgs = {
  token: string;
  userId: string;
};
export const loginService = async (args: LoginArgs) => {
  const existingUser = await getUserByEmail(args.email);
  if (!existingUser) {
    return {
      success: false,
      message: "invalid credentials",
      status: 400,
    };
  }

  const comparisonResult = await bcrypt.compare(
    args.password,
    existingUser.password
  );

  if (!comparisonResult) {
    return {
      success: false,
      message: "invalid credentials",
      status: 400,
    };
  }

  const token = await jwt.sign(
    { userId: existingUser._id, email: args.email },
    process.env.JWT_SECRET as string,
    { expiresIn: 24 * 60 * 60 * 1000 }
  );

  return {
    success: true,
    status: 200,
    message: "logged in successfully",
    payload: { token },
  };
};
export const logoutService = async (args: LogoutArgs) => {};
