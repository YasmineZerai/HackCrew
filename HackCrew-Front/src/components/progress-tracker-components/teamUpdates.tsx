import { Check, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useTeams } from "@/context/teams/useTeams";
import TodoItem from "./todoItem";

export default function TeamUpdates() {
  const teamContext = useTeams();

  return (
    <Card className={cn("w-1/3 h-max")}>
      <CardHeader>
        <CardTitle className="text-2xl">Team Updates</CardTitle>
        <CardDescription className="flex">
          <Check className="text-green-500" />
          finished tasks
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        {teamContext.teamTodos.length === 0
          ? "no todos yet"
          : [...teamContext.teamTodos]
              .reverse()
              .map((todo) => <TodoItem key={todo._id} todo={todo} />)}
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
}
