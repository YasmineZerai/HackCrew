import { getTeamsApi } from "@/api/teams/get-teams";
import { Team } from "@/lib/types";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { createTeamApi } from "@/api/teams/create-team.ts";
import { getTeamMembersApi } from "@/api/teams/get-team-members";
import { getTeamCodeApi } from "@/api/teams/get-team-code";
import { joinTeamApi } from "@/api/teams/join-team";
interface TeamsContextType {
  activeTeam: Team;
  setActiveTeam: any;
  createTeam: (teamName: string) => Promise<any>;
  getTeamMembers: (teamId: string) => Promise<any[]>;
  getTeamCode: (teamId: string) => Promise<any>;
  joinTeam: (code: string) => Promise<any>;
}

export const TeamsContext = createContext({} as TeamsContextType);
export default function TeamsProvider({ children }: PropsWithChildren) {
  const [activeTeam, setActiveTeam] = useState({} as Team);
  const [isInitialRender, setIsInitialRender] = useState(true);

  const createTeam = async (teamName: string) => {
    const response = await createTeamApi(teamName);
    const [data, error] = response;

    return response;
  };

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
    // if (data) setTeams([...Teams]);

    return response;
  };
  return (
    <TeamsContext.Provider
      value={{
        activeTeam,
        setActiveTeam,
        createTeam,
        getTeamMembers,
        getTeamCode,
        joinTeam,
      }}
    >
      {children}
    </TeamsContext.Provider>
  );
}
