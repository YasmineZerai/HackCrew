import { getLoggedUser } from "@/api/get-logged-user";
import { User } from "@/lib/types";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { useAuth } from "../auth/context";
type UserContextType = {
  user: User | null; // Change 'any' to a proper type based on your user data
  setUser: (user: any) => void;
  logout: () => void;
};

const UserContext = createContext({} as UserContextType);

export function useUser() {
  return useContext(UserContext);
}

export default function UserProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<any>(null);
  const auth = useAuth();

  useEffect(() => {
    getLoggedUser().then(([data, _]) => {
      if (data) setUser(data.payload.user);
    });
  }, []);

  const logout = () => {
    auth.logout().then(() => {
      setUser(null);
    });
  };
  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
}
