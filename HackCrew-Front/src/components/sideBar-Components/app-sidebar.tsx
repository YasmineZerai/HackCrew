"use client";
import * as React from "react";
import { LoaderCircle } from "lucide-react";
import { NavUser } from "@/components/sideBar-Components/nav-user";
import { TeamSwitcher } from "@/components/sideBar-Components/team-switcher";
import {
  Sidebar,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { useUser } from "@/context/user/user";
import SidebarGroups from "./app-sidebar-content";
import { Button } from "../ui/button";
import AddTeamDialog from "./add-team-dialog";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Plus } from "lucide-react";
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const userContext = useUser();
  const user = {
    name: `${userContext.user?.firstName} ${userContext.user?.lastName}`,
    email: `${userContext.user?.email}`,
    avatar: "/avatars/shadcn.jpg",
    initials: `${userContext.user?.firstName.charAt(
      0
    )}${userContext.user?.lastName.charAt(0)}`,
  };
  const teams = userContext.teams;
  return (
    <Sidebar collapsible="icon" {...props} className="dark">
      <SidebarHeader className="text-white">
        {teams.length > 0 ? (
          <div className="w-full flex justify-around items-baseline">
            <TeamSwitcher teams={teams} />
            <Dialog>
              <DialogTrigger asChild>
                <Button className=" w-1/7 bg-coll6-purple-200 translate-y-2 ">
                  <div className="flex size-6 items-center justify-center rounded-md ">
                    <Plus className="size-5 text-coll5-purple-400" />
                  </div>
                </Button>
              </DialogTrigger>
              <AddTeamDialog />
            </Dialog>
          </div>
        ) : (
          <div className="flex justify-items-center text-gray-500">
            <LoaderCircle className="animate-spin flex items-center" />
            <p>Loading..</p>
          </div>
        )}
      </SidebarHeader>
      <SidebarGroups />
      <SidebarFooter className="text-white capitalize">
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
