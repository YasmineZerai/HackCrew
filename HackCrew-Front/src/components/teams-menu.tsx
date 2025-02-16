import { useTeams } from "@/context/teams/useTeams";
import { TeamSwitcher } from "./team-switcher";
import { Command } from "lucide-react";

export default function TeamsMenu() {
  const teamsContext = useTeams();
  const teams = teamsContext.Teams.map((team) => {
    return {
      name: `${team.teamName}`,
      logo: Command,
      plan: "Free",
    };
  });
  return <div>{teams[0].name}</div>;
}
