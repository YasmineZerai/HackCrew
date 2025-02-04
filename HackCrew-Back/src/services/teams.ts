import { nanoid } from "nanoid";
import { createTeam } from "../database/team";
export async function createTeamService(teamCreator: String) {
  const customCode = nanoid(6).toUpperCase();
  const members = [teamCreator];
  const newTeam = await createTeam({ code: customCode, members: members });

  return {
    status: 201,
    success: true,
    message: "Team created successfully",
    payload: { newTeam },
  };
}
