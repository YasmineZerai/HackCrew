import { Ressource, Team, Todo, User } from "@/lib/types";
import { createContext, PropsWithChildren, useEffect, useState } from "react";
import { getTeamMembersApi } from "@/api/teams/get-team-members";
import { getTeamCodeApi } from "@/api/teams/get-team-code";
import { joinTeamApi } from "@/api/teams/join-team";
import { inviteUserApi } from "@/api/teams/invite-user";
import { createTeamCodeApi } from "@/api/teams/create-team-code";
import { getTeamTodosApi } from "@/api/todos/get-todos-team";
import { getTeamRessourcesApi } from "@/api/ressources/get-team-resources";
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
  members: User[];
  setMembers: (tab: User[]) => void;
  getTeamTodos: (teamId: string) => any;
  teamTodos: Todo[];
  setTodos: any;
  getTeamRessources: (teamId: string) => any;
  teamRessources: Ressource[];
  setRessources: any;
}

export const TeamsContext = createContext({} as TeamsContextType);
export default function TeamsProvider({ children }: PropsWithChildren) {
  const [activeTeam, setActiveTeam] = useState({} as Team);
  const [teamCode, setTeamCode] = useState("");
  const [hasCode, setHasCode] = useState(false);
  const [members, setMembers] = useState([] as User[]);
  const [teamTodos, setTodos] = useState([] as Todo[]);
  const [teamRessources, setRessources] = useState([] as Ressource[]);
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
  const getTeamTodos = async (teamId: string) => {
    const response = await getTeamTodosApi({ teamId });
    const [data, error] = response;
    if (data) {
      setTodos(data.payload.todos);
    }
  };
  const getTeamRessources = async (teamId: string) => {
    const response = await getTeamRessourcesApi({ teamId });
    const [data, error] = response;
    if (data) {
      setRessources(data.payload.ressources);
    }
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
        members,
        setMembers,
        getTeamTodos,
        teamTodos,
        setTodos,
        getTeamRessources,
        teamRessources,
        setRessources,
      }}
    >
      {children}
    </TeamsContext.Provider>
  );
}
