"use client";

import * as React from "react";
import { ChevronDown, Plus } from "lucide-react";

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

export function TeamSwitcher({
  teams,
}: {
  teams: {
    name: string;
    logo: React.ElementType;
    plan: string;
  }[];
}) {
  const [activeTeam, setActiveTeam] = React.useState(teams[0]);

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton className="w-fit px-1.5 " size="xl">
              <div className="flex aspect-square size-5 items-center justify-center rounded-md bg-sidebar-primary ">
                <activeTeam.logo className="size-3" />
              </div>
              <span className="truncate font-semibold capitalize">
                {activeTeam.name}
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
                key={team.name}
                onClick={() => setActiveTeam(team)}
                className="gap-2 p-2 capitalize focus:bg-coll6-purple-200"
              >
                <div className="flex size-6 items-center justify-center rounded-sm  text-coll6-purple-400">
                  <team.logo className="size-4 shrink-0 text-coll1-blue border-none" />
                </div>
                {team.name}
                <DropdownMenuShortcut className="text-coll5-purple-400">
                  ⌘{index + 1}
                </DropdownMenuShortcut>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator className="bg-coll6-purple-300" />
            <DropdownMenuItem className="gap-2 p-2  focus:bg-coll6-purple-200">
              <div className="flex size-6 items-center justify-center rounded-md  bg-coll6-purple-200">
                <Plus className="size-4 text-coll5-purple-400" />
              </div>
              <div className="font-medium text-coll5-purple-400">Add team</div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
