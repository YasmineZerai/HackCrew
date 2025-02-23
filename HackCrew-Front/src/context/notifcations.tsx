import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import io, { Socket } from "socket.io-client";
import { useUser } from "./user/user";
import { useShouldFetch } from "./should-fetch";
import { toast } from "sonner";
import { getUserApi } from "@/api/get-user";
import { getTeamByIdApi } from "@/api/teams/get-team";

const NotificationsContext = createContext({});

export function useNotifications() {
  return useContext(NotificationsContext);
}

export default function NotificationsProvider({ children }: PropsWithChildren) {
  const userContext = useUser();
  const shouldFetch = useShouldFetch();
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const newSocket = io("http://localhost:3000", {
      extraHeaders: {
        Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
      },
    });
    setSocket(newSocket);
  }, []);
  useEffect(() => {
    if (!socket) return;

    if (shouldFetch.shouldFetch) {
      const userId = userContext.user?._id;
      if (userId) {
        socket.emit("join", { userId });
      }
    }
    socket.on("team-member-joined", (data) => {
      userContext.getUserById(data.memberId).then(([response, errors]) => {
        getTeamByIdApi(data.teamId).then(([payload, error]) => {
          toast("New Member Joined", {
            description: `${response.payload.user.firstName} ${response.payload.user.lastName} joined your team ${payload.payload.team.teamName} `,
          });
        });
      });
    });

    socket.on("team-member-alert", (data) => {
      console.log("Team alert received:", data);
    });

    return () => {
      socket.off("team-member-joined");
      socket.off("team-member-alert");
    };
  }, [socket, userContext.user]);

  return (
    <NotificationsContext.Provider value={{ socket }}>
      {children}
    </NotificationsContext.Provider>
  );
}
