import { getLoggedUser } from "@/api/get-logged-user";
import { Team, User } from "@/lib/types";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { useAuth } from "../auth/context";
import { getTeamsApi } from "@/api/teams/get-teams";
import { createTeamApi } from "@/api/teams/create-team";
import { joinTeamApi } from "@/api/teams/join-team";
type UserContextType = {
  user: User | null;
  createTeam: (teamName: string) => Promise<any>;
  joinTeam: (code: string) => Promise<any>;
  setUser: (user: any) => void;
  logout: () => void;
  teams: Team[];
  setHasNewTeam: (hasNewTeam: boolean) => void; // Ajouté ici
};

const UserContext = createContext({} as UserContextType);

export function useUser() {
  return useContext(UserContext);
}

export default function UserProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<any>(null);
  const [teams, setTeams] = useState([] as Team[]);
  const [hasNewTeam, setHasNewTeam] = useState(false);
  const auth = useAuth();
  const createTeam = async (teamName: string) => {
    const response = await createTeamApi(teamName);
    const [data, error] = response;
    return response;
  };
  const joinTeam = async (code: string) => {
    const response = await joinTeamApi(code);
    return response;
  };

  useEffect(() => {
    getLoggedUser().then(([data, _]) => {
      if (data) setUser(data.payload.user);
    });
  }, []);
  useEffect(() => {
    getTeamsApi().then(([data, _]) => {
      if (data) setTeams(data.payload.teams);
    });
    setHasNewTeam(false);
  }, [hasNewTeam]);

  const logout = () => {
    auth.logout().then(() => {
      setUser(null);
    });
  };
  return (
    <UserContext.Provider
      value={{
        user,
        createTeam,
        setUser,
        logout,
        teams,
        setHasNewTeam,
        joinTeam,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
