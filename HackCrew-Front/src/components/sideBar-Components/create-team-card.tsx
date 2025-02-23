import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUser } from "@/context/user/user";
import { toast } from "sonner";
import { z } from "zod";
import { useTeams } from "@/context/teams/useTeams";
const createTeamSchema = z.object({
  teamName: z.string().nonempty({ message: "Team Name is required" }),
});
type CreateTeam = z.infer<typeof createTeamSchema>;

export default function CreateTeamCard() {
  const userContext = useUser();
  const teamContext = useTeams();
  const navigate = useNavigate();
  const { register, handleSubmit, formState, setError, reset } =
    useForm<CreateTeam>({
      resolver: zodResolver(createTeamSchema),
    });
  const onSubmit: SubmitHandler<CreateTeam> = async (state) => {
    const [_, errors] = await userContext.createTeam(state.teamName);

    if (errors) {
      if (errors.payload) {
        Object.entries(errors.payload).forEach((entry) =>
          setError(entry[0] as any, { message: entry[1] as any })
        );
      } else
        toast("Error Creating Team", {
          description: errors.message,
        });

      return;
    }

    toast("Team Created Successfully", {
      description: `Invite your teammates and start the adventure`,
    });
    reset();
    userContext.setHasNewTeam(true);
    teamContext.setActiveTeam(_.payload.newTeam);
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Create A New Team</CardTitle>
        <CardDescription>
          please choose your team name to create team
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-2">
          <div className="space-y-1">
            <Label htmlFor="teamName">Team Name</Label>
            <Input id="teamName" {...register("teamName")} />
            {formState.errors.teamName && (
              <p className="text-red-700 text-xs">
                {formState.errors.teamName.message}
              </p>
            )}
          </div>
          <Button type="submit">create Team</Button>
        </CardContent>
      </form>
    </Card>
  );
}
