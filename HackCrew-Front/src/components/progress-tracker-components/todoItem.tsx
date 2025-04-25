import { useUser } from "@/context/user/user";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useEffect, useState } from "react";

export default function TodoItem({ todo }: { todo: any }) {
  const userContext = useUser();
  const [userInitials, setUserInitials] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      const [response] = await userContext.getUserById(todo.userId);
      if (response?.payload?.user) {
        const { firstName, lastName } = response.payload.user;
        setUserInitials(`${firstName[0]}${lastName[0]}`);
      }
    };

    fetchUser();
  }, [todo.userId, userContext]);

  return (
    <div className="flex items-center space-x-4 rounded-md border p-4">
      <div className="flex-1 space-y-1">
        <p className="text-sm font-medium leading-none capitalize">
          {todo.task}
        </p>
        <p className="text-sm text-muted-foreground ">{todo.description}</p>
      </div>
      <Avatar>
        <AvatarFallback className="bg-coll6-purple-100 uppercase">
          {userInitials || "US"}
        </AvatarFallback>
      </Avatar>
    </div>
  );
}
