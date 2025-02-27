import { Megaphone } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useNotifications } from "@/context/notifcations";
import { useUser } from "@/context/user/user";
import { useTeams } from "@/context/teams/useTeams";

const schema = z.object({
  message: z
    .string()
    .min(1, "Message is required")
    .max(500, "Message is too long"),
});

type FormData = z.infer<typeof schema>;

export default function AlertTeam() {
  const notificationContext = useNotifications();
  const userContext = useUser();
  const teamContext = useTeams();
  const socket = notificationContext.socket;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    if (socket && data.message.trim()) {
      socket.emit("alert-team", {
        message: data.message,
        teamId: teamContext.activeTeam._id,
        userId: userContext.user?._id,
      });
      reset();
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="dark bg-coll6-purple-200 ">
          <Megaphone />
          Alert Team
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md dark bg-coll6-purple-400">
        <DialogHeader>
          <DialogTitle className="text-white">
            Alert Your Team Members
          </DialogTitle>
          <DialogDescription>
            Your team members will receive an instant alert describing your
            need.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex items-center space-x-2">
            <div className="grid flex-1 gap-2">
              <div className="grid w-full gap-1.5">
                <Textarea
                  id="message"
                  className="text-white"
                  placeholder="Type your alert message here."
                  {...register("message")}
                />
                {errors.message && (
                  <span className="text-red-500 text-sm">
                    {errors.message.message}
                  </span>
                )}
              </div>
            </div>
          </div>

          <DialogFooter className="sm:justify-start mt-4">
            <Button
              type="submit"
              variant="secondary"
              className="bg-coll6-purple-200"
            >
              Alert
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
