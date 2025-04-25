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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { getTeamByIdApi } from "@/api/teams/get-team";
import { Siren } from "lucide-react";
import { Label } from "@radix-ui/react-label";
import { useTeams } from "./teams/useTeams";
import { Todo } from "@/lib/types";

type NotificationsContextStore = {
  socket: Socket | null;
};

type AlertMessage = {
  message: string;
  senderName: string;
  teamName: string;
};
const NotificationsContext = createContext<NotificationsContextStore>(
  {} as NotificationsContextStore
);
export function useNotifications() {
  return useContext(NotificationsContext);
}

export default function NotificationsProvider({ children }: PropsWithChildren) {
  const userContext = useUser();
  const teamContext = useTeams();
  const shouldFetch = useShouldFetch();
  const [socket, setSocket] = useState<Socket | null>(null);
  const [alertMessage, setAlertMessage] = useState<AlertMessage | null>(null);

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

    const handleTeamMemberJoined = (data: any) => {
      userContext.getUserById(data.memberId).then(([response, errors]) => {
        getTeamByIdApi(data.teamId).then(([payload, error]) => {
          toast("New Member Joined", {
            description: `${response.payload.user.firstName} ${response.payload.user.lastName} joined your team ${payload.payload.team.teamName}`,
          });
        });
      });
    };

    const handleTeamMemberAlert = (data: any) => {
      userContext.getUserById(data.memberId).then(([response, errors]) => {
        getTeamByIdApi(data.teamId).then(([payload, error]) => {
          const message = {
            message: data.message,
            senderName: `${response.payload.user.firstName} ${response.payload.user.lastName}`,
            teamName: `${payload.payload.team.teamName}`,
          };
          setAlertMessage(message);
        });
      });
    };

    const handleDoneTodo = (data: any) => {
      const newTodo = data.payload;
      teamContext.setTodos([
        ...teamContext.teamTodos,
        {
          userId: newTodo.userId,
          _id: newTodo._id,
          teamId: newTodo.teamId,
          task: newTodo.task,
          status: newTodo.status,
          description: newTodo.description,
        },
      ]);

      userContext.getUserById(data.memberId).then(([response, errors]) => {
        toast("Finished Task !", {
          description: `${response.payload.user.firstName} ${response.payload.user.lastName} finished a task`,
        });
      });
    };

    socket.on("team-member-joined", handleTeamMemberJoined);
    socket.on("team-member-alert", handleTeamMemberAlert);

    return () => {
      socket.off("team-member-joined", handleTeamMemberJoined);
      socket.off("team-member-alert", handleTeamMemberAlert);
    };
  }, [socket, userContext.user, shouldFetch.shouldFetch]);
  return (
    <NotificationsContext.Provider value={{ socket }}>
      {children}

      <Dialog
        open={alertMessage !== null}
        onOpenChange={() => setAlertMessage(null)}
      >
        <DialogContent className="dark">
          <DialogHeader>
            <DialogTitle className="text-red-800 flex items-center">
              <Siren className="text-red-800" />
              Team Alert - {alertMessage?.teamName}
            </DialogTitle>
          </DialogHeader>
          <Label className="text-white capitalize">
            {alertMessage?.senderName}:
          </Label>
          <div className="px-2 text-md text-coll6-purple-400 bg-coll6-purple-200 rounded-sm min-h-14">
            {alertMessage?.message}
          </div>
        </DialogContent>
      </Dialog>
    </NotificationsContext.Provider>
  );
}
