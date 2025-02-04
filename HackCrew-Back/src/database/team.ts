import { TeamModel } from "../models/team";

interface createTeamArgs {
  teamName: String;
  code: String;
  members: String[];
}
export async function createTeam(args: createTeamArgs) {
  return await TeamModel.create({
    code: args.code,
    members: args.members,
    teamName: args.teamName,
  });
}
