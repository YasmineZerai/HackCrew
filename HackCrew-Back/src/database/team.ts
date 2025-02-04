import { TeamModel } from "../models/team";

interface createTeamArgs {
  code: String;
  members: String[];
}
export async function createTeam(args: createTeamArgs) {
  return await TeamModel.create({ code: args.code, members: args.members });
}
