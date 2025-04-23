import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { z } from "zod";
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
import { Navigate, useNavigate } from "react-router";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginApi } from "@/api/auth/login";
import { useAuth } from "@/context/auth/context";
import { getTeamsApi } from "@/api/teams/get-teams";
const loginSchema = z.object({
  email: z.string().nonempty({ message: "Email is required" }).email(),
  password: z.string().nonempty({ message: "Password is required" }),
});
type Login = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const auth = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit, formState, setError, reset } = useForm<Login>(
    {
      resolver: zodResolver(loginSchema),
    }
  );
  const handleLogin = async () => {
    const data = await getTeamsApi();
    const teams = data[0].payload.teams;

    if (teams.length == 0) navigate("/home/demo");
    else navigate("/home");
  };
  const onSubmit: SubmitHandler<Login> = async (state) => {
    const [_, errors] = await auth.login(state);

    if (errors) {
      if (errors.payload) {
        Object.entries(errors.payload).forEach((entry) =>
          setError(entry[0] as any, { message: entry[1] as any })
        );
      } else
        toast("Error logging in", {
          description: errors.message,
        });

      return;
    }

    toast("Logged in succesfully", {
      description: `Welcome Back !`,
    });
    reset();
    await handleLogin();
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
            Login
          </CardTitle>
          <br />
          <CardDescription className="text-center text-md text-white">
            Welcome Back ! Ready to Collab'n Conquer ?
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
                  htmlFor="email"
                  className="text-coll4-green-200 font-bold"
                >
                  Email
                </Label>
                <Input
                  id="email"
                  placeholder="Email"
                  className="bg-white"
                  {...register("email")}
                />
                {formState.errors.email && (
                  <p className="text-red-700 text-xs">
                    {formState.errors.email.message}
                  </p>
                )}
              </div>
            </div>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label
                  htmlFor="password"
                  className="text-coll4-green-200 font-bold"
                >
                  Password
                </Label>
                <Input
                  id="password"
                  placeholder="Password"
                  className="bg-white"
                  type="password"
                  {...register("password")}
                />
                {formState.errors.password && (
                  <p className="text-red-700 text-xs">
                    {formState.errors.password.message}
                  </p>
                )}
              </div>
            </div>

            <Button className="bg-coll2-blue self-end text-white" type="submit">
              login
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="flex flex-row items-center">
            <p className="text-gray-200 text-sm">Don't have an account ?</p>
            <Button
              variant="link"
              className="p-2 text-coll2-teal-100"
              onClick={() => navigate("/register")}
            >
              register
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
