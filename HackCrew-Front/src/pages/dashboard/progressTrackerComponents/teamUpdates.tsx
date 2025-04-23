import { BellRing, Check } from "lucide-react";
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

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { TeamsContext } from "@/context/teams/teams";
import { useTeams } from "@/context/teams/useTeams";
export default function TeamUpdates() {
  const teamContext = useTeams();
  const teamId = teamContext.activeTeam._id;
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
        <div className=" flex items-center space-x-4 rounded-md border p-4">
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">
              Push Notifications
            </p>
            <p className="text-sm text-muted-foreground">
              Send notifications to device.
            </p>
          </div>
          <Avatar>
            <AvatarFallback className="bg-coll6-purple-100">YZ</AvatarFallback>
          </Avatar>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">
          <Check /> Mark all as read
        </Button>
      </CardFooter>
    </Card>
  );
}
