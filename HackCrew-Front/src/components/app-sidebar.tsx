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
import { TeamsContext } from "@/context/teams/teams";
import SidebarGroups from "./app-sidebar-content";

import { useTeams } from "@/context/teams/useTeams";
import TeamsMenu from "./teams-menu";
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
  const teamsContext = useTeams();
  const fetchedTeams = teamsContext.Teams;
  const teams = fetchedTeams.map((team) => {
    return { name: team.teamName, logo: Command, plan: "Free" };
  });
  const userContext = useUser();
  const user = {
    name: `${userContext.user?.firstName} ${userContext.user?.lastName}`,
    email: `${userContext.user?.email}`,
    avatar: "/avatars/shadcn.jpg",
  };

  const dummyTeams = [{ name: "yasmine", logo: Command, plan: "Free" }];
  return (
    <Sidebar collapsible="icon" {...props} className="dark">
      <SidebarHeader className="text-white">
        <TeamSwitcher teams={teams} />
      </SidebarHeader>
      <SidebarGroups />
      <SidebarFooter className="text-white capitalize">
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
