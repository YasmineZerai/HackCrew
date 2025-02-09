import {
  createUser,
  deleteUser,
  getUserByEmail,
  getUserById,
  updateUser,
} from "../database/users";
import bcrypt from "bcrypt";
import { sendEmailService } from "./email";
import { getTeamsByUserIdService } from "./teams";
import { deleteTeam } from "../database/team";
import { leaveTeamService } from "./members";

type CreateUserArgs = {
  firstName: string;
  lastName: string;
  password: string;
  email: string;
};
type UpdateUserArgs = {
  firstName: string;
  lastName: string;
  password: string;
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
  //   await sendEmailService({
  //     to: args.email,
  //     subject: "Account Verification - Code",
  //     text: `Hello ${args.firstName}, welcome to HackCrew, please verify your account using the following code: 123456`,
  //   });
  return {
    success: true,
    status: 201,
    message: "user created successfully",
    payload: { newUser },
  };
}
export async function getUserService(userId: string) {
  const user = await getUserById(userId);
  return {
    success: true,
    status: 200,
    message: "user fetched successfully",
    payload: { user },
  };
}
export async function deleteUserService(userId: string) {
  const memberships = (await getTeamsByUserIdService(userId)).payload;
  if (memberships) {
    await Promise.all(
      memberships.teams.map(async (element) => {
        if (element?._id) {
          await leaveTeamService(userId, element._id.toString());
        }
      })
    );
  }
  const user = await deleteUser(userId);
  return {
    success: true,
    status: 200,
    message: "user deleted successfully",
    payload: { user },
  };
}
export async function updateUserService(args: UpdateUserArgs, userId: string) {
  if (args.password) {
    const newHashedPassword = await bcrypt.hash(args.password, 10);
    args["password"] = newHashedPassword;
  }
  const updatedUser = await updateUser(args, userId);
  return {
    success: true,
    status: 200,
    message: "user fetched successfully",
    payload: { updatedUser },
  };
}
