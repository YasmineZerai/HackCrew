import { nanoid } from "nanoid";
import { createTeam } from "../database/team";
export async function createTeamService(teamCreator: String) {
  const customCode = nanoid(6).toUpperCase();
  const members = [teamCreator];
  return await createTeam({ code: customCode, members: members });
}
