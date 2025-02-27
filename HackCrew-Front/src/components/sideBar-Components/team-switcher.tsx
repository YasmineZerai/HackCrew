"use client";
import { ChevronDown, Command } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useTeams } from "@/context/teams/useTeams";

import ManageTeamButton from "../drawer-Components/manage-team-button";

export function TeamSwitcher({
  teams,
}: {
  teams: {
    _id: string;
    teamName: string;
  }[];
}) {
  const teamContext = useTeams();
  const ChangeTeam = async (team: { _id: string; teamName: string }) => {
    teamContext.setActiveTeam(team);
    const [response, error] = await teamContext.getTeamCode(team._id);
    if (response.payload) {
      teamContext.setHasCode(true);
      teamContext.setTeamCode(response.payload.existingTeamCode.code);
    } else {
      teamContext.setHasCode(false);
      teamContext.setTeamCode("");
    }
    const teams = await teamContext.getTeamMembers(team._id);
    if (teams[0]) {
      teamContext.setMembers(teams[0].payload.users);
    }
  };
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton className="w-fit px-1.5 " size="xl">
              <div className="flex aspect-square size-5 items-center justify-center rounded-md bg-sidebar-primary ">
                <Command className="size-3" />
              </div>
              <span className="truncate font-semibold capitalize">
                {teamContext.activeTeam.teamName}
              </span>
              <ChevronDown className="opacity-50" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-64 rounded-lg bg-coll6-purple-100 border-coll6-purple-200"
            align="start"
            side="bottom"
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-xs text-coll5-purple-400">
              Teams
            </DropdownMenuLabel>
            {teams.map((team, index) => (
              <DropdownMenuItem
                key={team.teamName}
                onClick={() => ChangeTeam(team)}
                className="gap-2 p-2 capitalize focus:bg-coll6-purple-200"
              >
                <div className="flex size-6 items-center justify-center rounded-sm  text-coll6-purple-400">
                  <Command className="size-4 shrink-0 text-coll1-blue border-none" />
                </div>
                {team.teamName}
                <DropdownMenuShortcut className="text-coll5-purple-400">
                  ⌘{index + 1}
                </DropdownMenuShortcut>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator className="bg-coll6-purple-300" />
          </DropdownMenuContent>
        </DropdownMenu>
        <ManageTeamButton />
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
