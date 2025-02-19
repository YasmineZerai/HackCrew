"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CardTitle } from "../ui/card";
import { useTeams } from "@/context/teams/useTeams";
import { useState } from "react";
import { LoaderCircle } from "lucide-react";

const FormSchema = z.object({
  email: z.string().nonempty({ message: "Email is required" }).email(),
});

export default function AddMember() {
  const [loading, setLoading] = useState(false);
  const teamContext = useTeams();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setLoading(true);
    const [_, errors] = await teamContext.inviteUser(
      teamContext.activeTeam._id,
      data.email
    );
    setLoading(false);
    if (errors) {
      if (errors.payload) {
        Object.entries(errors.payload).forEach((entry) =>
          form.setError(entry[0] as any, { message: entry[1] as any })
        );
      } else
        toast("Error Inviting member", {
          description: errors.message,
        });

      return;
    }
    toast("You sent an invitation to this email :", {
      description: `${data.email}`,
    });
    form.reset();
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-1/4 space-y-6 flex flex-col justify-center items-center"
      >
        <CardTitle className="capitalize text-white">
          Invite Your friends to join your team !
        </CardTitle>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="HackCrew@mail.com"
                  {...field}
                  className="bg-white text-coll5-purple-400"
                />
              </FormControl>
              <FormDescription className="text-gray-800">
                your teammate will be sent an invitation through email
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-4 items-center justify-center">
          <Button type="submit">invite</Button>
          {loading ? (
            <LoaderCircle className="animate-spin text-gray-800" />
          ) : (
            ""
          )}
        </div>
      </form>
    </Form>
  );
}
