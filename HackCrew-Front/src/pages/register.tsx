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
import { useNavigate } from "react-router";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerApi } from "@/api/register";
const registerSchema = z.object({
  firstName: z.string().nonempty({ message: "FirstName name is required" }),
  lastName: z.string().nonempty({ message: "LastName name is required" }),
  email: z.string().nonempty({ message: "Email is required" }).email(),
  password: z.string().nonempty({ message: "Password is required" }),
});
type Register = z.infer<typeof registerSchema>;
export default function RegisterPage() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState, setError, reset } =
    useForm<Register>({
      resolver: zodResolver(registerSchema),
    });
  const onSubmit: SubmitHandler<Register> = async (state) => {
    const [_, errors] = await registerApi(state);
    console.log(_);
    if (errors) {
      if (errors.payload) {
        Object.entries(errors.payload).forEach((entry) =>
          setError(entry[0] as any, { message: entry[1] as any })
        );
      } else
        toast("Error creating account", {
          description: errors.message,
        });

      return;
    }

    toast("Account created sccessfully", {
      description: `Welcome ${_.payload.newUser.firstName} ${_.payload.newUser.lastName} please log in to start your journey`,
      action: {
        label: "ok",
        onClick: () => console.log("ok"),
      },
    });
    reset();
    navigate("/login");
  };
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-gradient-to-t from-coll1-blue  to-coll2-teal-300  ">
      <div
        className="bg-contain bg-no-repeat rounded-none  w-80 h-20 scale-90 self-start absolute top-0 "
        style={{ backgroundImage: `url('/src/assets/logo-white.png')` }}
      ></div>
      <Card className="w-[500px]  flex flex-col justify-evenly bg-coll1-blue border-0 shadow-xl rounded-none scale-90 mt-0">
        <CardHeader>
          <CardTitle className="text-4xl text-center text-coll2-teal-100">
            Register
          </CardTitle>
          <br />
          <CardDescription className="text-center text-white">
            Welcome to HackCrew your n°1 hackathon team collaboration platform !
          </CardDescription>
          <CardDescription className=" text-center text-gray-300 text-sm">
            please fill the form below to create an account and start the
            adventure
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
                  htmlFor="firstName"
                  className="text-coll2-teal-100 font-bold"
                >
                  First Name
                </Label>
                <Input
                  id="firstName"
                  placeholder="First Name"
                  className="bg-white capitalize"
                  {...register("firstName")}
                />
                {formState.errors.firstName && (
                  <p className="text-red-700 text-xs">
                    {formState.errors.firstName.message}
                  </p>
                )}
              </div>
            </div>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label
                  htmlFor="lastName"
                  className="text-coll2-teal-100 font-bold"
                >
                  Last Name
                </Label>
                <Input
                  id="lastName"
                  placeholder="Last Name"
                  className="bg-white capitalize"
                  {...register("lastName")}
                />
                {formState.errors.lastName && (
                  <p className="text-red-700 text-xs">
                    {formState.errors.lastName.message}
                  </p>
                )}
              </div>
            </div>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label
                  htmlFor="email"
                  className="text-coll2-teal-100 font-bold"
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
                  className="text-coll2-teal-100 font-bold"
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

            <Button className="bg-coll2-blue self-end" type="submit">
              Register
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="flex flex-row items-center">
            <p className="text-gray-200 text-sm">already got an account ?</p>
            <Button
              variant="link"
              className="p-2 text-coll2-teal-100"
              onClick={() => navigate("/login")}
            >
              login
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
