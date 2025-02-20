import { useShouldFetch } from "@/context/should-fetch";
import { useTeams } from "@/context/teams/useTeams";
import { useUser } from "@/context/user/user";
import { useEffect } from "react";

export default function Home() {
  const teamContext = useTeams();
  const userContext = useUser();
  const shouldFetch = useShouldFetch();
  useEffect(() => {
    if (userContext.teams.length > 0) {
      teamContext.setActiveTeam(
        userContext.teams[userContext.teams.length - 1]
      );
    }
  }, [userContext.teams]);
  useEffect(() => {
    if (shouldFetch.shouldFetch && teamContext.activeTeam._id) {
      teamContext
        .getTeamMembers(teamContext.activeTeam._id)
        .then(([response, errors]) => {
          teamContext.setMembers(response.payload.users);
        });
    }
  }, [shouldFetch.shouldFetch, teamContext.activeTeam]);
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0 bg-white ">
      <div className="min-h-[100vh] flex-1 rounded-xl md:min-h-min bg-muted/50" />
    </div>
  );
}
