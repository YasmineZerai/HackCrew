import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useTeams } from "@/context/teams/useTeams";
import { toast } from "sonner";

export default function CreateCode() {
  const teamContext = useTeams();
  const handleClick = async () => {
    const [response, errors] = await teamContext.createTeamCode(
      teamContext.activeTeam._id
    );
    if (errors) {
      toast("Error creating team code", {
        description: errors.message,
      });
    }
  };
  return (
    <Card className="w-1/4 flex flex-col items-center bg-coll6-purple-300 border-none text-white">
      <CardHeader>
        <CardTitle>No team code ? Create one now !</CardTitle>
      </CardHeader>
      <CardContent>
        You can generate a code for your team to invite your friends easily to
        your team, this code will last only one hour.
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button onClick={handleClick} className="bg-coll6-purple-200">
          Generate Code
        </Button>
      </CardFooter>
    </Card>
  );
}
