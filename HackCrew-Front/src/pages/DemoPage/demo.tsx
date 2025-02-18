import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { z } from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUser } from "@/context/user/user";
const createTeamSchema = z.object({
  teamName: z.string().nonempty({ message: "Team Name is required" }),
});
type CreateTeam = z.infer<typeof createTeamSchema>;

export default function DemoPage() {
  const userContext = useUser();
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
    navigate("/home");
  };
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-gradient-to-t  from-coll1-blue  to-coll2-teal-200  ">
      <div
        className="bg-contain bg-no-repeat rounded-none  w-80 h-20 scale-75 self-start absolute top-0 "
        style={{ backgroundImage: `url('/src/assets/logo-white-blue.png')` }}
      ></div>
      <Card className="w-[500px]  flex flex-col justify-evenly  bg-coll1-blue border-0 shadow-xl rounded-none scale-90 mt-0">
        <CardHeader>
          <CardTitle className="text-5xl text-center text-coll2-teal-100 ">
            Create Team
          </CardTitle>
          <br />
          <CardDescription className="text-center text-md text-white">
            create your first team and start the adventure
          </CardDescription>
        </CardHeader>
        <br />
        <CardContent>
          <form
            className=" flex flex-col gap-6 text-black "
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label
                  htmlFor="teamName"
                  className="text-coll4-green-200 font-bold"
                >
                  Team Name
                </Label>
                <Input
                  id="teamName"
                  placeholder="teamName"
                  className="bg-white"
                  {...register("teamName")}
                />
                {formState.errors.teamName && (
                  <p className="text-red-700 text-xs">
                    {formState.errors.teamName.message}
                  </p>
                )}
              </div>
            </div>

            <Button className="bg-coll2-blue self-end text-white" type="submit">
              Create Team
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
