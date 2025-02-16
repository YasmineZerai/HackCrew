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
type UserContextType = {
  user: User | null; // Change 'any' to a proper type based on your user data
  setUser: (user: any) => void;
  logout: () => void;
  teams: Team[];
};

const UserContext = createContext({} as UserContextType);

export function useUser() {
  return useContext(UserContext);
}

export default function UserProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<any>(null);
  const [teams, setTeams] = useState([] as Team[]);
  const auth = useAuth();

  useEffect(() => {
    getLoggedUser().then(([data, _]) => {
      if (data) setUser(data.payload.user);
    });
    getTeamsApi().then(([data, _]) => {
      if (data) setTeams(data.payload.teams);
    });
  }, []);

  const logout = () => {
    auth.logout().then(() => {
      setUser(null);
    });
  };
  return (
    <UserContext.Provider value={{ user, setUser, logout, teams }}>
      {children}
    </UserContext.Provider>
  );
}
