import { Team } from "@/lib/types";
import { createContext, PropsWithChildren, useEffect, useState } from "react";
import { getTeamMembersApi } from "@/api/teams/get-team-members";
import { getTeamCodeApi } from "@/api/teams/get-team-code";
import { joinTeamApi } from "@/api/teams/join-team";
import { inviteUserApi } from "@/api/teams/invite-user";
import { createTeamCodeApi } from "@/api/teams/create-team-code";
interface TeamsContextType {
  activeTeam: Team;
  setActiveTeam: (team: Team) => void;
  getTeamMembers: (teamId: string) => Promise<any[]>;
  getTeamCode: (teamId: string) => Promise<any>;
  createTeamCode: (teamId: string) => Promise<any>;
  joinTeam: (code: string) => Promise<any>;
  inviteUser: (teamId: string, email: string) => Promise<any>;
  setTeamCode: (code: string) => void;
  teamCode: string;
  hasCode: boolean;
  setHasCode: (state: boolean) => void;
}

export const TeamsContext = createContext({} as TeamsContextType);
export default function TeamsProvider({ children }: PropsWithChildren) {
  const [activeTeam, setActiveTeam] = useState({} as Team);
  const [teamCode, setTeamCode] = useState("");
  const [hasCode, setHasCode] = useState(false);
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
  const joinTeam = async (code: string) => {
    const response = await joinTeamApi(code);
    const [data, error] = response;
    return response;
  };
  const inviteUser = async (teamId: string, email: string) => {
    const response = await inviteUserApi(teamId, email);
    return response;
  };
  const createTeamCode = async (teamId: string) => {
    const response = await createTeamCodeApi(teamId);
    const [data, error] = response;
    if (data) {
      setTeamCode(data.payload.payload.code);
      setHasCode(true);
    }
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
        hasCode,
        setHasCode,
        createTeamCode,
        teamCode,
        setTeamCode,
      }}
    >
      {children}
    </TeamsContext.Provider>
  );
}
