"use client";

import { useTeams } from "@/context/teams/useTeams";
import ExistingTeamCode from "./existing-team-code";
import CreateCode from "./create-code";

export function TeamCode() {
  const teamContext = useTeams();
  return teamContext.hasCode ? (
    <ExistingTeamCode code={teamContext.teamCode}></ExistingTeamCode>
  ) : (
    <CreateCode />
  );
}
