import { Team } from "@/lib/types";
import { createContext, PropsWithChildren, useState } from "react";
import { getTeamMembersApi } from "@/api/teams/get-team-members";
import { getTeamCodeApi } from "@/api/teams/get-team-code";
import { joinTeamApi } from "@/api/teams/join-team";
import { inviteUserApi } from "@/api/teams/invite-user";
interface TeamsContextType {
  activeTeam: Team;
  setActiveTeam: (team: Team) => void;
  getTeamMembers: (teamId: string) => Promise<any[]>;
  getTeamCode: (teamId: string) => Promise<any>;
  joinTeam: (code: string) => Promise<any>;
  inviteUser: (teamId: string, email: string) => Promise<any>;
}

export const TeamsContext = createContext({} as TeamsContextType);
export default function TeamsProvider({ children }: PropsWithChildren) {
  const [activeTeam, setActiveTeam] = useState({} as Team);

  const getTeamMembers = async (teamId: string): Promise<any[]> => {
    const response = await getTeamMembersApi(teamId);
    const [data, error] = response;
    return response;
  };

  const getTeamCode = async (teamId: string) => {
    const response = await getTeamCodeApi(teamId);
    const [data, error] = response;
    return response;
  };
  //TODO: handle adding another team
  const joinTeam = async (code: string) => {
    const response = await joinTeamApi(code);
    const [data, error] = response;
    return response;
  };
  const inviteUser = async (teamId: string, email: string) => {
    const response = await inviteUserApi(teamId, email);
    return response;
  };

  return (
    <TeamsContext.Provider
      value={{
        activeTeam,
        setActiveTeam,
        getTeamMembers,
        getTeamCode,
        joinTeam,
        inviteUser,
      }}
    >
      {children}
    </TeamsContext.Provider>
  );
}
