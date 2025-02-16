"use client";

import * as React from "react";
import {
  AudioWaveform,
  Bot,
  Command,
  GalleryVerticalEnd,
  LoaderCircle,
  MessageSquare,
  Presentation,
  User,
  Users,
} from "lucide-react";

import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { useUser } from "@/context/user/user";

import SidebarGroups from "./app-sidebar-content";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const userContext = useUser();
  const user = {
    name: `${userContext.user?.firstName} ${userContext.user?.lastName}`,
    email: `${userContext.user?.email}`,
    avatar: "/avatars/shadcn.jpg",
  };
  console.log(user);
  const teams = userContext.teams.map((team) => {
    return { name: team.teamName, logo: Command, plan: "Free" };
  });

  return (
    <Sidebar collapsible="icon" {...props} className="dark">
      <SidebarHeader className="text-white">
        {teams.length > 0 && <TeamSwitcher teams={teams} />}
      </SidebarHeader>
      <SidebarGroups />
      <SidebarFooter className="text-white capitalize">
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
